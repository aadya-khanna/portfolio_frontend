import React, { useState, useEffect } from 'react';

const DesignImageCard = ({ src, alt, description, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  const handleOverlayClick = () => {
    handleClose();
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isExpanded]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}
        onClick={handleClick}
      />
      
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-stone-100 dark:bg-black bg-opacity-90 dark:bg-opacity-90 flex flex-col items-center justify-center z-50 p-4 cursor-pointer"
          onClick={handleOverlayClick}
        >
          {/* Enlarged image */}
          <div className="flex items-center justify-center max-w-4xl w-full">
            <img
              src={src}
              alt={alt}
              className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
          </div>
          
          {/* Description text below image with 10% gap */}
          <div className="max-w-4xl w-full mt-[5vh]">
            <p className="text-gray-800 dark:text-white text-center text-lg font-plein leading-relaxed px-4">
              {description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default DesignImageCard;
