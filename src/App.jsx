import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Experience from './pages/Experience.jsx';
import Misc from './pages/Miscellaneous.jsx'
import StickyPage from './pages/StickyPage.jsx'
import Gallery from './pages/Gallery.jsx'
import TrackSelectionScreen from './components/LoadingScreen'; // Re-introduce original component
import MusicGate from './components/MusicGate'; // The required entry view
import { AudioProvider, useAudio } from './components/AudioContext'; // Import useAudio hook

function MainContent() {
  const { isGateDismissed } = useAudio();
  
  // Conditionally render main content only if the gate is dismissed
  if (!isGateDismissed) {
    return null;
  }
  
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/misc" element={<Misc />} />
        <Route path="/stickies" element={<StickyPage />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  );
}

// Controller component to render stages 1 and 2 if necessary
function AppGateController() {
  const { isGateDismissed } = useAudio();
  
  // If the gate is dismissed, we don't render any overlay stages (1 or 2).
  if (isGateDismissed) {
    return null;
  }
  
  return (
    <>
      {/* Stage 1: Initial track selection (LoadingScreen) */}
      <TrackSelectionScreen />
      {/* Stage 2: Required permanent entry gate (MusicGate) */}
      <MusicGate />
    </>
  );
}

// App wrapper handles the audio context and the gate logic
export default function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}

function AppContent() {
  const { isGateDismissed } = useAudio();
  
  // Conditionally force dark background if the gate is not dismissed yet
  const wrapperClasses = `min-h-screen transition-colors duration-500 ${
    isGateDismissed
      ? 'bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark'
      : 'bg-background-dark text-foreground-dark' // Force dark mode colors
  }`;
  
  return (
      <div className={wrapperClasses}>
        {/* Controls rendering of loading/waiting overlays */}
        <AppGateController />
        
        {/* Main site content (renders only if isGateDismissed is true, checked internally by MainContent) */}
        <MainContent />
      </div>
  );
}
