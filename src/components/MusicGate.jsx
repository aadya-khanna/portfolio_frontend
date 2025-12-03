import React, { useState, useEffect, useCallback } from 'react';
import { useAudio } from './AudioContext';
import '../index.css';

// Component for the rotating vinyl disk display
const VinylDisplay = ({ track, isPlaying }) => {
    const [rotation, setRotation] = useState(0);

    // Rotate vinyl when playing
    useEffect(() => {
        let interval;
        if (isPlaying) {
            // Adjust rotation speed here. 1 degree every 30ms is 20 RPM (fast for visual effect)
            interval = setInterval(() => {
                setRotation(prev => (prev + 1) % 360);
            }, 30);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-80 lg:h-80 mx-auto aspect-square">
            {/* Vinyl effect border - Outer Black Ring (ENSURE FULL CIRCLE) */}
            <div className="absolute inset-0 rounded-full bg-gray-900 border-[6px] border-gray-800 shadow-xl"
                 style={{ transform: `rotate(${rotation}deg)` }}>
                
                {/* Album Cover Area (simulating groove/label) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                w-[95%] h-[95%] rounded-full overflow-hidden">
                    <img 
                        src={track.albumCover} 
                        alt={track.songName} 
                        className="w-full h-full object-cover" 
                    />
                </div>

                {/* Vinyl Hole */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                w-4 h-4 bg-gray-300 rounded-full border-2 border-gray-600">
                    <div className="w-full h-full bg-white rounded-full"></div>
                </div>
            </div>
        </div>
    );
};


const MusicGate = () => {
    const [isFadingOut, setIsFadingOut] = useState(false);
    const { selectedTrack, isPlaying, dismissGate, isGateDismissed } = useAudio();
    
    const MARQUEE_TEXT = "enjoy some music while we take you to your destination";


    useEffect(() => {
        if (!selectedTrack || isGateDismissed) {
            return; // Only proceed if track is selected and gate is not yet dismissed
        }

        let initialGateTimer;
        
        // Wait for 600ms (TrackSelectionScreen fade-out duration) before starting 12s timer
        const entryDelay = 600;
        
        initialGateTimer = setTimeout(() => {
            // Start the 12-second countdown
            const dismissalTimer = setTimeout(() => {
                // Only initiate fade out if we haven't already started fading
                setIsFadingOut(true);
            }, 12000);

            return () => clearTimeout(dismissalTimer);
        }, entryDelay);

        return () => clearTimeout(initialGateTimer);
    }, [selectedTrack, isGateDismissed]); // Run whenever selection/dismissal changes

    // Effect to handle fade out completion and dismissal
    useEffect(() => {
        let fadeTimer;

        // Timer to dismiss gate after fade out completes
        if (isFadingOut) {
            fadeTimer = setTimeout(() => {
                dismissGate();
            }, 600); // FADE_OUT_DURATION = 600ms
        }

        return () => {
            clearTimeout(fadeTimer);
        };
    }, [isFadingOut, dismissGate]);


    // This component renders only if a track is selected AND the gate has not been dismissed.
    if (!selectedTrack || isGateDismissed) {
        return null;
    }

    // Main Display UI
    return (
        <div
            // Force dark background regardless of app theme state
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
                bg-background-dark text-foreground-dark
                transition-opacity duration-600 ease-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
            style={{
                pointerEvents: isFadingOut ? 'none' : 'auto'
            }}
        >
            
            <h1 className="text-4xl lg:text-5xl font-gambetta text-foreground dark:text-foreground-dark mb-10 text-center">
                welcome aboard
            </h1>

            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-4xl w-full p-4">
                {/* 1/3 - Album Cover/Vinyl */}
                <div className="w-full lg:w-1/3 flex justify-center">
                    {/* The VinylDisplay component ensures the circular shape (rounded-full) */}
                    <VinylDisplay track={selectedTrack} isPlaying={isPlaying} />
                </div>
                
                {/* 2/3 - Song Details */}
                <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-gambetta font-bold mb-1">
                        {selectedTrack.songName}
                    </p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-gambetta opacity-80">
                        {selectedTrack.artist}
                    </p>
                </div>
            </div>
            
            <div className="mt-10 w-full px-4 sm:px-8 md:px-12 text-center max-w-xl mx-auto">
                <p className="text-xl font-gambetta py-1">
                    {MARQUEE_TEXT}
                </p>
            </div>
            
            
            
        </div>
    );
};

export default MusicGate;