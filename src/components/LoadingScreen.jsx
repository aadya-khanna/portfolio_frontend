import React, { useState, useEffect } from 'react';
import AadyaAvatar from './AadyaAvatar';
import { useAudio } from './AudioContext'; // Import audio context

const FADE_OUT_DURATION = 600; // ms

// Inline CSS for the component, using CSS variables
const styles = {
  loader: (isFadingOut) => ({
    // Overlay styles
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999, // Sit above all content
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: `opacity ${FADE_OUT_DURATION}ms ease-out`,
    opacity: isFadingOut ? 0 : 1,
  }),
  avatarContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  avatar: {
    borderRadius: '50%',
    backgroundColor: 'var(--bg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // Smooth rounded visuals
    border: '4px solid var(--text)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden', // Crucial to maintain circular shape of the avatar image
  },
  // No status text or keyframes/glow needed
  headphoneGlow: {
    // Static style, removing pulse animation
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    boxShadow: '0 0 0 0 var(--accent)', // No visible shadow/pulse
  }
};

const TrackSelectionScreen = () => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { TRACKS, selectedTrack, selectTrack } = useAudio();

  // Screen is visible only if no track has been selected yet.
  const isVisible = selectedTrack === null;

  // Logic to handle track selection and initiation of fade out
  const handleSelectTrack = (track) => {
    selectTrack(track); // Sets selectedTrack and isPlaying=true in context
    setIsFadingOut(true); // Triggers local fade out animation
  };
  
  // Logic to remove from DOM after fade completes
  useEffect(() => {
      if (isFadingOut) {
          const removalTimer = setTimeout(() => {
              // After fade out, stop local state tracking. 
              // The main render check handles the component removal based on selectedTrack.
              setIsFadingOut(false); 
          }, FADE_OUT_DURATION);
          
          return () => clearTimeout(removalTimer);
      }
  }, [isFadingOut]);


  // Do not render if track is selected AND fade out finished
  if (!isVisible && !isFadingOut) {
    return null;
  }
  
  // UI Styles
  const headerStyle = {
    color: 'var(--text)',
    fontFamily: 'Gambetta, serif',
    fontSize: '2.5rem',
    marginBottom: '2rem',
    textAlign: 'center',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '2rem',
    fontSize: '1.25rem',
  };
  
  const buttonStyle = (track) => ({
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem', 
    border: '2px solid var(--text)',
    backgroundColor: 'var(--bg)',
    color: 'var(--text)',
    cursor: 'pointer',
    fontFamily: 'Gambetta, serif',
    transition: 'background-color 300ms, border-color 300ms, color 300ms',
    // Highlighting selected track
    ...(selectedTrack && selectedTrack.id === track.id ? { 
        backgroundColor: 'var(--accent)',
        borderColor: 'var(--accent)',
        color: 'var(--bg)',
    } : {})
  });
  
  return (
    <div className="bg-background dark:bg-background-dark" style={styles.loader(isFadingOut)}>
      <h1 style={headerStyle}>pick your jam</h1>
      
      <div style={styles.avatarContainer}>
        {/* Circular Avatar (Increased Size) */}
        <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-64 lg:h-64 max-w-[40vh] max-h-[40vh]" style={styles.avatar}>
            <AadyaAvatar style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      
      <div style={buttonContainerStyle}>
        {TRACKS.map(track => (
          <button 
            key={track.id}
            style={buttonStyle(track)}
            onClick={() => handleSelectTrack(track)}
          >
            {track.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrackSelectionScreen;