import React from 'react';
import { useAudio } from './AudioContext';

export default function AudioToggle() {
    const { isPlaying, togglePlay, selectedTrack } = useAudio();
    
    // Only show the toggle if a track has been selected (i.e., TrackSelectionScreen has disappeared)
    if (!selectedTrack) {
        return null;
    }

    return (
        <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            className="p-1"
        >
            {isPlaying ? (
                // Pause icon (Similar style to Toggle.jsx icons)
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 sm:size-9 md:size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
            ) : (
                // Play icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 sm:size-9 md:size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653v12.7a.75.75 0 0 0 1.25.568l8.93-6.307a.784.784 0 0 0 0-1.136L6.5 5.085a.75.75 0 0 0-1.25.568Z" />
                </svg>
            )}
        </button>
    );
}