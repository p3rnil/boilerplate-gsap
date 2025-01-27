'use client';

import Link, { LinkProps } from 'next/link';
import { useTransition } from '@/context/transitionContext';
import React, { ReactNode } from 'react';

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
};

const TransitionLink: React.FC<TransitionLinkProps> = ({ href, children, ...props }) => {
  const { startTransition } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(href);
  };

  return (
    <Link prefetch href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default TransitionLink;