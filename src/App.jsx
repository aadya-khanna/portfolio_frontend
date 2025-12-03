import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Experience from './pages/Experience.jsx';
import Misc from './pages/Miscellaneous.jsx'
import StickyPage from './pages/StickyPage.jsx'
import Gallery from './pages/Gallery.jsx'
import CustomCursor from './components/CustomCursor';
import TrackSelectionScreen from './components/LoadingScreen';
import { AudioProvider } from './components/AudioContext';

export default function App() {
  return (
    <AudioProvider>
      <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark transition-colors duration-500 cursor-none">
        <TrackSelectionScreen />
        <CustomCursor />
        
        <Routes>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route path="/about" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/misc" element={<Misc />} />
          <Route path="/stickies" element={<StickyPage />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </AudioProvider>
  );
}
