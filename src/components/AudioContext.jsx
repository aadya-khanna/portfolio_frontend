import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AudioContext = createContext(null);

export const useAudio = () => useContext(AudioContext);

const TRACKS = [
    { id: 1, songName: 'Early Summer', artist: 'Ryo Fukui', albumCover: '/albums/ryofukui.jpeg', src: 'music/ryofukui.mp3' },
    { id: 2, songName: 'Kiss of Life', artist: 'Sade', albumCover: '/albums/sade.jpeg', src: 'music/sade.mp3' },
    { id: 3, songName: 'Desafinado', artist: 'Getz & Gilberto', albumCover: '/albums/getzgilberto.jpg', src: 'music/stangetz.mp3' },
];

export const AudioProvider = ({ children }) => {
    const initialIsGateDismissed = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('isGateDismissed') === 'true';
        }
        return false;
    };

    // Function to initialize selectedTrack
    const initialTrack = () => {
        if (typeof window !== 'undefined') {
            const gateDismissed = initialIsGateDismissed();
            
            if (gateDismissed) {
                // If the gate was already dismissed, restore the track from history to avoid re-selection
                const savedTrackId = localStorage.getItem('selectedTrackId');
                if (savedTrackId) {
                    return TRACKS.find(t => String(t.id) === savedTrackId) || null;
                }
            } else {
                // If the gate was NOT dismissed (first load), force selection
                localStorage.removeItem('selectedTrackId');
            }
        }
        return null;
    };

    const initialIsPlaying = () => {
        if (typeof window !== 'undefined') {
            // Since we force track selection/gate access based on persistence, only restore isPlaying if gate was dismissed AND a track was loaded
            const gateDismissed = initialIsGateDismissed();
            const trackExists = !!localStorage.getItem('selectedTrackId'); // Check if selectedTrackId exists before restoration
            
            if (gateDismissed && trackExists) {
                const savedIsPlaying = localStorage.getItem('isPlaying');
                return savedIsPlaying === 'true';
            }
            
            localStorage.setItem('isPlaying', 'false');
        }
        return false;
    };
    
    const [isGateDismissed, setIsGateDismissed] = useState(initialIsGateDismissed);
    const [isPlaying, setIsPlaying] = useState(initialIsPlaying);
    const [selectedTrack, setSelectedTrack] = useState(initialTrack);
    const audioRef = useRef(new Audio());

    const initialTimeRef = useRef(
        typeof window !== 'undefined' ? parseFloat(localStorage.getItem('currentTime')) || 0 : 0
    );

    // Load track source on initial mount or when selection changes
    useEffect(() => {
        if (selectedTrack) {
            audioRef.current.src = selectedTrack.src;
            audioRef.current.loop = true;
            
            // Restore playback time on hard reload
            if (initialTimeRef.current !== 0) {
                audioRef.current.currentTime = initialTimeRef.current;
                initialTimeRef.current = 0; // Clear restoration value after use
            }
            // No auto-play here due to browser restrictions, handled by selectTrack/togglePlay
        }
    }, [selectedTrack]);
    
    // Heartbeat check to prevent audio stopping on route change
    useEffect(() => {
        if (selectedTrack && isPlaying) {
            const checkInterval = setInterval(() => {
                if (audioRef.current.paused) {
                    audioRef.current.play().catch(e => console.error("Heartbeat error playing audio:", e));
                }
            }, 500); // Check twice per second

            return () => clearInterval(checkInterval);
        }
    }, [selectedTrack, isPlaying]);

    // Save currentTime periodically while playing
    useEffect(() => {
        let saveInterval;
        if (isPlaying && selectedTrack) {
            saveInterval = setInterval(() => {
                localStorage.setItem('currentTime', audioRef.current.currentTime.toString());
            }, 5000); // Save time every 5 seconds

        } else if (!isPlaying && selectedTrack) {
            // Ensure time is saved on pause or toggle off
            localStorage.setItem('currentTime', audioRef.current.currentTime.toString());
        } else if (!selectedTrack) {
            localStorage.removeItem('currentTime');
        }

        return () => clearInterval(saveInterval);
    }, [isPlaying, selectedTrack]);
    
    // Persist selected track ID to localStorage
    useEffect(() => {
        if (selectedTrack) {
            localStorage.setItem('selectedTrackId', selectedTrack.id);
        } else {
            localStorage.removeItem('selectedTrackId');
        }
    }, [selectedTrack]);


    // Persist isGateDismissed state to localStorage
    useEffect(() => {
        localStorage.setItem('isGateDismissed', isGateDismissed);
        
        // If the gate is dismissed, we should probably check if there is a selected track.
        // If the user reloads and isGateDismissed is true, but selectedTrack is null (due to initialTrack logic),
        // they will see the TrackSelectionScreen. This is the desired 'force select' behavior.
    }, [isGateDismissed]);


    // Persist isPlaying state to localStorage
    useEffect(() => {
        // We keep isPlaying persistence for runtime state management, but ensure it's false on initial load
        // via initialIsPlaying logic (modified above)
        if (selectedTrack) {
            localStorage.setItem('isPlaying', isPlaying);
        } else {
            localStorage.setItem('isPlaying', 'false');
        }
    }, [isPlaying, selectedTrack]);


    // Effect to handle play/pause toggling
    useEffect(() => {
        if (selectedTrack) {
            if (isPlaying) {
                // Must be called as a result of a direct user action (selectTrack or togglePlay)
                audioRef.current.play().catch(e => console.error("Error playing audio:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, selectedTrack]);
    
    // Initial cleanup on unmount
    useEffect(() => {
        return () => {
            audioRef.current.pause();
            audioRef.current.src = '';
        };
    }, []);
    
    // Function to set and play a track
    const selectTrack = (track) => {
        setSelectedTrack(track);
        // Important: Set isPlaying to true on selection, as requested
        setIsPlaying(true);
    };

    // Function to toggle play/pause
    const togglePlay = () => {
        // Only allow toggle if a track has been selected
        if (selectedTrack) {
            setIsPlaying(prev => !prev);
        }
    };

    const dismissGate = () => {
        setIsGateDismissed(true);
    };

    const contextValue = {
        TRACKS,
        selectedTrack,
        isPlaying,
        selectTrack,
        togglePlay,
        isGateDismissed, // Expose new state
        dismissGate,    // Expose new function
    };

    return (
        <AudioContext.Provider value={contextValue}>
            {children}
        </AudioContext.Provider>
    );
};