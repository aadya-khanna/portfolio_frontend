import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AudioContext = createContext(null);

export const useAudio = () => useContext(AudioContext);

const TRACKS = [
    { id: 1, name: 'Early Summer by Ryo Fukui', src: 'music/ryofukui.mp3' },
    { id: 2, name: 'Kiss of Life by Sade', src: 'music/sade.mp3' },
    { id: 3, name: 'Desafinado by Getz, Gilberto', src: 'music/stangetz.mp3' },
];

export const AudioProvider = ({ children }) => {
    // Function to initialize selectedTrack from localStorage
    const initialTrack = () => {
        if (typeof window !== 'undefined') {
            const savedTrackId = localStorage.getItem('selectedTrackId');
            if (savedTrackId) {
                return TRACKS.find(t => String(t.id) === savedTrackId) || null;
            }
        }
        return null;
    };

    const initialIsPlaying = () => {
        if (typeof window !== 'undefined') {
            const savedIsPlaying = localStorage.getItem('isPlaying');
            return savedIsPlaying === 'true'; // localStorage stores strings
        }
        return false;
    };

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


    // Persist isPlaying state to localStorage
    useEffect(() => {
        if (selectedTrack) {
            localStorage.setItem('isPlaying', isPlaying);
        } else {
            // Ensure we don't try to play if no track is selected
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

    const contextValue = {
        TRACKS,
        selectedTrack,
        isPlaying,
        selectTrack,
        togglePlay,
    };

    return (
        <AudioContext.Provider value={contextValue}>
            {children}
        </AudioContext.Provider>
    );
};