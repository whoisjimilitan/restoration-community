'use client';

import { useRef, useEffect } from 'react';
import { useAnimation, useInView } from 'framer-motion';

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94], // ease-out-cubic
        },
      });
    }
  }, [isInView, controls]);

  return { ref, controls, initial: { opacity: 0, y: 20 } };
}
