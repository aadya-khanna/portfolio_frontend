import React, { useState, useEffect } from 'react';
import AadyaAvatar from './AadyaAvatar';

// Status messages that rotate every second
const STATUS_MESSAGES = [
  'Tuning your headphones',
  'Warming up Aadya (the backend)',
  'Getting ready',
  'Almost there',
  'Really testing your patience here'
];

const FADE_OUT_DURATION = 600; // ms

// Inline CSS for the component, using CSS variables and keyframes
const styles = {
  loader: (isFadingOut) => ({
    // Overlay styles
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999, // Sit above all content
    // NOTE: Background color is applied via Tailwind classes on the component's className
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
  statusText: {
    color: 'var(--text)', // Respect dark/light mode text color
    fontFamily: 'Plein, sans-serif',
    fontSize: '1.25rem',
    textAlign: 'center',
    minHeight: '1.5rem', // Prevent layout shift during rotation
    transition: 'opacity 300ms ease-in-out',
  },
  // Keyframes for the glowing pulse animation around the headphones (avatar placeholder)
  keyframes: `
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 var(--accent);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
      }
    }
  `,
  // Using a separate element for the glow effect
  headphoneGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    // Subtle glowing pulse animation using var(--accent)
    animation: 'pulse 2s infinite cubic-bezier(0.66, 0.0, 0.34, 1.0)',
    boxShadow: '0 0 0 0 var(--accent)',
  }
};

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [statusMessageIndex, setStatusMessageIndex] = useState(0);

  // Status Message Rotator
  useEffect(() => {
    if (!isLoading || isFadingOut) return;

    const messageInterval = setInterval(() => {
      setStatusMessageIndex(prevIndex => (prevIndex + 1) % STATUS_MESSAGES.length);
    }, 2500); // Rotate every ~1 second

    return () => clearInterval(messageInterval);
  }, [isLoading, isFadingOut]);

  // Fixed Timeout Logic (7.5 seconds, matching 7-8 seconds requested)
  useEffect(() => {
    if (!isLoading || isFadingOut) return;

    const timeout = setTimeout(() => {
        // Start fade out after 7.5 seconds
        setIsFadingOut(true);
    }, 7500);

    // Cleanup function
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading, isFadingOut]);
  
  // Logic to remove from DOM after fade completes
  useEffect(() => {
      if (isFadingOut) {
          const removalTimer = setTimeout(() => {
              // Set isLoading to false to trigger final removal via conditional rendering below
              setIsLoading(false); 
              setIsFadingOut(false);
          }, FADE_OUT_DURATION);
          
          return () => clearTimeout(removalTimer);
      }
  }, [isFadingOut]);


  // Do not render if the loading process is complete and fade out finished
  if (!isLoading && !isFadingOut) {
    return null;
  }
  
  // Insert the keyframes into the head once
  useEffect(() => {
      const styleTag = document.createElement('style');
      styleTag.innerHTML = styles.keyframes;
      document.head.appendChild(styleTag);

      return () => {
        if (document.head.contains(styleTag)) {
            document.head.removeChild(styleTag);
        }
      }
  }, []);


  return (
    <div className="bg-background dark:bg-background-dark" style={styles.loader(isFadingOut)}>
      <div style={styles.avatarContainer}>
        {/* Headphone Glow Effect */}
        <div style={styles.headphoneGlow} /> 
        {/* Circular Avatar (Increased Size) */}
        {/* Responsive sizing: 32 (8rem/128px) on small, 40 on md, 64 on lg screens. */}
        <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-64 lg:h-64 max-w-[40vh] max-h-[40vh]" style={styles.avatar}>
            <AadyaAvatar style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      <p style={styles.statusText}>
        {STATUS_MESSAGES[statusMessageIndex]}
      </p>
    </div>
  );
};

export default LoadingScreen;