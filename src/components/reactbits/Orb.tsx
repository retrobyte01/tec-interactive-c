import React, { useEffect, useRef } from 'react';

interface OrbProps {
  className?: string;
  hue?: number; // base hue (e.g. 210 for electric blue/cyan)
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
}

export const Orb: React.FC<OrbProps> = ({
  className = '',
  hue = 215, // Apple-inspired blue/cyan/indigo hue
  hoverIntensity = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const onMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Orbiting light trails
    const orbitalLights = [
      { angle: 0, speed: 0.02, radius: 110, size: 28, hueOffset: 0 },
      { angle: Math.PI * 0.6, speed: -0.015, radius: 140, size: 36, hueOffset: 35 },
      { angle: Math.PI * 1.3, speed: 0.025, radius: 90, size: 24, hueOffset: -25 },
      { angle: Math.PI * 1.8, speed: -0.018, radius: 160, size: 32, hueOffset: 50 },
    ];

    let t = 0;

    const render = () => {
      t += 0.02;

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const baseCx = width * 0.5;
      const baseCy = height * 0.45;

      // The orb reaches toward the user's cursor
      const pullX = (mouseX - baseCx) * hoverIntensity * 0.35;
      const pullY = (mouseY - baseCy) * hoverIntensity * 0.35;
      const cx = baseCx + pullX;
      const cy = baseCy + pullY;

      // Breathing radius modulation
      const breathe = Math.sin(t * 1.5) * 12;
      const orbRadius = Math.min(width, height) * 0.28 + breathe;

      // 1. Ambient outer aura
      const outerGlow = ctx.createRadialGradient(cx, cy, orbRadius * 0.2, cx, cy, orbRadius * 2.5);
      outerGlow.addColorStop(0, `hsla(${hue}, 95%, 60%, 0.22)`);
      outerGlow.addColorStop(0.4, `hsla(${hue + 40}, 90%, 55%, 0.12)`);
      outerGlow.addColorStop(0.75, `hsla(${hue - 30}, 85%, 50%, 0.04)`);
      outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, orbRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // 2. Swirling Chromatic Rings (Breathing & Reaching)
      for (let i = 0; i < 4; i++) {
        const ringPhase = t * (0.8 + i * 0.3);
        const ringRadius = orbRadius * (0.6 + i * 0.18) + Math.cos(ringPhase) * 10;
        const ringHue = (hue + i * 25 + Math.sin(t) * 15) % 360;

        ctx.save();
        ctx.beginPath();
        // Dynamic ellipse distortion based on cursor pull
        ctx.ellipse(
          cx + Math.sin(ringPhase) * 15,
          cy + Math.cos(ringPhase) * 12,
          ringRadius,
          ringRadius * (0.85 + Math.sin(t * 0.5 + i) * 0.15),
          ringPhase * 0.4,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `hsla(${ringHue}, 90%, 65%, ${0.28 - i * 0.05})`;
        ctx.lineWidth = 14 + i * 6;
        ctx.filter = 'blur(16px)';
        ctx.stroke();
        ctx.restore();
      }

      // 3. Trailing Orbiting Lights
      orbitalLights.forEach((light) => {
        light.angle += light.speed;
        const lx = cx + Math.cos(light.angle) * (light.radius + breathe);
        const ly = cy + Math.sin(light.angle) * (light.radius * 0.65 + breathe * 0.5);

        const lGlow = ctx.createRadialGradient(lx, ly, 1, lx, ly, light.size);
        const lHue = (hue + light.hueOffset) % 360;
        lGlow.addColorStop(0, `hsla(${lHue}, 100%, 75%, 0.75)`);
        lGlow.addColorStop(0.5, `hsla(${lHue}, 90%, 60%, 0.35)`);
        lGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = lGlow;
        ctx.beginPath();
        ctx.arc(lx, ly, light.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Central Soft High-Luminance Core
      const coreGrad = ctx.createRadialGradient(
        cx - orbRadius * 0.15,
        cy - orbRadius * 0.15,
        0,
        cx,
        cy,
        orbRadius * 0.8
      );
      coreGrad.addColorStop(0, `hsla(${hue}, 100%, 85%, 0.45)`);
      coreGrad.addColorStop(0.4, `hsla(${hue + 20}, 95%, 65%, 0.22)`);
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, orbRadius * 0.8, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [hue, hoverIntensity]);

  return (
    <div className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block filter blur-sm opacity-70 dark:opacity-50 transition-opacity duration-1000" />
    </div>
  );
};
