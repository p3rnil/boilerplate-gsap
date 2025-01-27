'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

interface TransitionProviderProps {
  children: ReactNode;
}

type TransitionContextType = {
  startTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

const TransitionProvider: React.FC<TransitionProviderProps> = ({ children }) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = (href: string) => {

    if (isTransitioning) return;

    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
      }
    });

    tl.set('.box', { top: '100%' });
    tl.to('.box', {
      top: '0%', duration: 0.3, ease: 'power.2',
      stagger: {
        from: 'start',
        each: 0.2
      }
    });
    tl.to('.box', {
      onStart: () => router.push(href),
      top: '-100%', duration: 0.3, ease: 'power.2',
      stagger: {
        from: 'start',
        each: 0.2
      }
    });
  };

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = (): TransitionContextType => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};

export default TransitionProvider;