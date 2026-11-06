import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  className = '',
  delay = 0.04,
  animateBy = 'words'
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: delay, delayChildren: 0.05 }
    }
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 140
      }
    },
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
      y: 12
    }
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap ${className}`}
    >
      {elements.map((element, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {element}
        </motion.span>
      ))}
    </motion.span>
  );
};
