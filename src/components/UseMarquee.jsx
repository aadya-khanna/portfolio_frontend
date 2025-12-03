import { useEffect, useRef, useState } from 'react';

export default function useMarquee(text) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [shouldMarquee, setShouldMarquee] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current || !textRef.current) {
        setShouldMarquee(false); 
        return;
      }

      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;
      const overflow = textWidth > containerWidth;
     // console.log('useMarquee:', { text, containerWidth, textWidth, overflow });
      setShouldMarquee(overflow);
    };

    // Check overflow initially and when text changes (with a small delay)
    const textChangeHandler = setTimeout(checkOverflow, 50);

    // Re-check overflow on window resize
    window.addEventListener('resize', checkOverflow);

    return () => {
      clearTimeout(textChangeHandler);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [text]); 


  return { containerRef, textRef, shouldMarquee };

}