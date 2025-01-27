'use client';

import { gsap } from '@/gsap';
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { useLayoutEffect, useRef, ReactNode } from 'react';

interface SmoothLenisProps {
  children: ReactNode;
}

const SmoothLenis: React.FC<SmoothLenisProps> = ({ children }) => {
  const lenisRef = useRef<LenisRef>(null);

  useLayoutEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root options={{ smoothWheel: true, autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
};

export default SmoothLenis;