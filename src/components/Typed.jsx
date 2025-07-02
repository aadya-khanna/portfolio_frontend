import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function TypedText() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["mathematically musical"],
      typeSpeed: 50,
      backSpeed: 25,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return <span ref={el} />;
}
