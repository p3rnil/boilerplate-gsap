'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.defaults({ duration: 2 });

export * from 'gsap';
export * from '@gsap/react';