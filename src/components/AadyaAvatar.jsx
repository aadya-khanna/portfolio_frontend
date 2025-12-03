import React from 'react';
import AadyaDarkSvg from '../assets/aadya.svg';
import AadyaLightSvg from '../assets/aadya_light.svg';

const AadyaAvatar = ({ style }) => {
  // Simple logic to select the correct SVG based on 'dark' class presence on HTML element
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches || document.documentElement.classList.contains('dark');
  const src = isDarkMode ? AadyaLightSvg : AadyaDarkSvg;
  
  // NOTE: This logic assumes the SVGs are named appropriately for dark/light mode
  // and that the image content/style handles the background/foreground inversion.
  // We use both light and dark version as per file structure.

  return (
    <img 
      src={src} 
      alt="Aadya Avatar Illustration" 
      style={style}
      // Assuming the SVG assets are styled/sized correctly or respond to parent container size
    />
  );
};

export default AadyaAvatar;