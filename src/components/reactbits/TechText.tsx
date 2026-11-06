import React, { useEffect, useState } from 'react';

interface TechTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  maxIterations?: number;
}

const GLYPHS = '01#@<>[]/\\=+$*~';

export const TechText: React.FC<TechTextProps> = ({
  text,
  className = '',
  scrambleSpeed = 45,
  maxIterations = 14
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / (maxIterations / text.length)) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        setDisplayText(text);
        setIsDone(true);
        clearInterval(interval);
      }

      iteration += 1;
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [text, scrambleSpeed, maxIterations]);

  return (
    <span
      className={`inline-block font-bold tracking-tight transition-all duration-300 ${className} ${
        isDone ? 'opacity-100' : 'opacity-90'
      }`}
    >
      {displayText}
    </span>
  );
};
