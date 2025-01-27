'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactNode;
}

const Magnetic: React.FC<MagneticProps> = ({ children }) => {
  const magnetic = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.matchMedia().add('(min-width: 800px)', () => {

      const xTo = gsap.quickTo(magnetic.current, 'x', { duration: 1, ease: 'elastic.out(0.5, 0.2)' });
      const yTo = gsap.quickTo(magnetic.current, 'y', { duration: 1, ease: 'elastic.out(0.5, 0.2)' });

      const mouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        if (magnetic.current) {
          const { height, width, left, top } = magnetic.current.getBoundingClientRect();
          const x = clientX - (left + width / 2);
          const y = clientY - (top + height / 2);
          xTo(x);
          yTo(y);
        }
      };

      const mouseLeave = () => {
        if (magnetic.current) {
          xTo(0);
          yTo(0);
        }
      };

      const currentMagnetic = magnetic.current;
      currentMagnetic?.addEventListener('mousemove', mouseMove);
      currentMagnetic?.addEventListener('mouseleave', mouseLeave);

      return () => {
        currentMagnetic?.removeEventListener('mousemove', mouseMove);
        currentMagnetic?.removeEventListener('mouseleave', mouseLeave);
      };
    });
  }, []);

  return React.cloneElement(children as React.JSX.Element, { ref: magnetic });
};

export default Magnetic;
