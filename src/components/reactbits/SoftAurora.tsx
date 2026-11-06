import React, { useEffect, useRef } from 'react';

interface SoftAuroraProps {
  className?: string;
  speed?: number;
  opacity?: number;
  blendMode?: 'screen' | 'lighten' | 'soft-light' | 'normal';
}

export const SoftAurora: React.FC<SoftAuroraProps> = ({
  className = '',
  speed = 0.6,
  opacity = 0.65,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Aurora blob particle definitions with pastel shades of blue, violet, and cyan
    const blobs = [
      { x: width * 0.25, y: height * 0.35, r: width * 0.38, vx: 0.18 * speed, vy: 0.12 * speed, color: 'rgba(0, 122, 255, ' }, // Apple Blue
      { x: width * 0.72, y: height * 0.40, r: width * 0.42, vx: -0.15 * speed, vy: 0.2 * speed, color: 'rgba(175, 82, 222, ' }, // Soft Violet
      { x: width * 0.50, y: height * 0.70, r: width * 0.45, vx: 0.12 * speed, vy: -0.16 * speed, color: 'rgba(50, 173, 230, ' }, // Cyan
      { x: width * 0.85, y: height * 0.25, r: width * 0.32, vx: -0.18 * speed, vy: 0.14 * speed, color: 'rgba(88, 86, 214, ' }   // Indigo
    ];

    let t = 0;

    const render = () => {
      t += 0.004 * speed;
      ctx.clearRect(0, 0, width, height);

      blobs.forEach((blob, i) => {
        // Natural Lissajous smooth orbital motion
        const currentX = blob.x + Math.sin(t + i * 1.5) * (width * 0.08);
        const currentY = blob.y + Math.cos(t * 0.9 + i) * (height * 0.08);

        const gradient = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          blob.r
        );

        // Gentle falloff for soft ambient aurora glow
        gradient.addColorStop(0, `${blob.color}${0.38 * opacity})`);
        gradient.addColorStop(0.4, `${blob.color}${0.22 * opacity})`);
        gradient.addColorStop(0.75, `${blob.color}${0.07 * opacity})`);
        gradient.addColorStop(1, `${blob.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, blob.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [speed, opacity]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}>
      {/* Dynamic Canvas Aurora */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full filter blur-3xl opacity-80 dark:opacity-60 transition-opacity duration-1000"
      />
      
      {/* Static gradient fallback & ambient noise overlay */}
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#FAFAFC]/40 dark:via-[#0D0D11]/40 to-[#FAFAFC] dark:to-[#0D0D11] pointer-events-none" />
    </div>
  );
};
