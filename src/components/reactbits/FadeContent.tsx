import React from 'react';
import { motion } from 'framer-motion';

interface FadeContentProps {
  children: React.ReactNode;
  blur?: boolean;
  duration?: number;
  delay?: number;
  easing?: [number, number, number, number] | string;
  initialOpacity?: number;
  className?: string;
}

export const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = true,
  duration = 0.6,
  delay = 0,
  initialOpacity = 0,
  className = ''
}) => {
  return (
    <motion.div
      initial={{
        opacity: initialOpacity,
        filter: blur ? 'blur(8px)' : 'none',
        y: 16
      }}
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
        y: 0
      }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // Apple ease out curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
