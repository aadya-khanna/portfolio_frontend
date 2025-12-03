import React, { useState } from 'react';
import { useAudio } from './AudioContext';

const TrackSelectDropdown = () => {
    const { TRACKS, selectedTrack, selectTrack } = useAudio();
    const [isOpen, setIsOpen] = useState(false);
    
    // Toggle dropdown visibility for touch devices
    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    // Handle selection and close dropdown
    const handleSelect = (track) => {
        selectTrack(track);
        setIsOpen(false);
    };
    
    // Determine the name to display in the header (Only song name or 'Music')
    const currentTrackName = selectedTrack ? selectedTrack.name : 'Music';

    // Tailwind classes for dropdown menu positioning and styling
    const menuClasses = `
        absolute left-2 mt-2 w-60 rounded-md shadow-lg
        bg-background dark:bg-background-dark ring-1 ring-black ring-opacity-5
        z-50 py-1 origin-top-left transition-transform duration-300 ease-out
        ${isOpen ? 'scale-y-100' : 'scale-y-0 pointer-events-none'}
    `;
    
    // Styling for individual track items
    const itemBaseClasses = `
        px-4 py-2 text-sm cursor-pointer whitespace-nowrap 
        font-regular font-gambetta
        text-foreground dark:text-foreground-dark 
        hover:text-accent hover:dark:text-accent
        transition-colors duration-200
    `;

    // Responsive Interaction: 
    // We use onMouseEnter/onMouseLeave for hover state on non-touch devices (desktop), 
    // and rely on onClick (toggleDropdown) for touch devices. 
    
    return (
        <div 
            className="relative inline-block text-left group"
        >
            <div>
                <button
                    type="button"
                    className="flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium focus:outline-none"
                    onClick={toggleDropdown}
                >
                    <span className="font-regular font-gambetta text-sm md:text-base">{currentTrackName}</span>
                    {/* Down chevron icon */}
                    <svg className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.99l3.71-3.76a.75.75 0 111.06 1.06l-4.25 4.31a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div 
                className={menuClasses}
                style={{ transformOrigin: 'top left' }}
            >
                {TRACKS.map((track) => (
                    <div
                        key={track.id}
                        onClick={() => handleSelect(track)}
                        className={itemBaseClasses}
                        style={{
                            
                            backgroundColor: selectedTrack && selectedTrack.id === track.id ? 'var(--accent)' : undefined,
                            color: selectedTrack && selectedTrack.id === track.id ? 'var(--bg)' : undefined,
                        }}
                    >
                        {track.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrackSelectDropdown;