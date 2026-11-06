import React, { useEffect, useRef } from 'react';

interface CrystalizedBallProps {
  className?: string;
  size?: number; // base sphere radius in px
  particleCount?: number;
  electricIntensity?: number;
  interactive?: boolean;
}

export const CrystalizedBall: React.FC<CrystalizedBallProps> = ({
  className = '',
  size = 180,
  particleCount = 70,
  electricIntensity = 1,
  interactive = true,
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

    // Mouse coordinates relative to sphere center
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let isHovering = false;
    let clickPulse = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = width / 2;
      const cy = height / 2;
      targetMouseX = e.clientX - rect.left - cx;
      targetMouseY = e.clientY - rect.top - cy;
      isHovering = true;
    };

    const onMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
      isHovering = false;
    };

    const onClick = () => {
      clickPulse = 1.0;
    };

    if (interactive) {
      window.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseleave', onMouseLeave);
      window.addEventListener('click', onClick);
    }

    // Generate internal glowing dust particles
    const particles = Array.from({ length: particleCount }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = Math.cbrt(Math.random()) * (size * 0.88);
      return {
        x: rad * Math.sin(phi) * Math.cos(theta),
        y: rad * Math.sin(phi) * Math.sin(theta),
        z: rad * Math.cos(phi),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
        radius: 1.2 + Math.random() * 2,
        hue: 195 + Math.random() * 70, // cyan to violet (195 - 265)
        alpha: 0.3 + Math.random() * 0.6,
      };
    });

    let time = 0;

    const render = () => {
      time += 0.016;

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;
      if (clickPulse > 0.01) clickPulse *= 0.92;
      else clickPulse = 0;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const effectiveRadius = size + clickPulse * 16;

      // 1. Ambient Background Glow Behind the Ball
      const bgGlow = ctx.createRadialGradient(
        cx + mouseX * 0.15,
        cy + mouseY * 0.15,
        effectiveRadius * 0.2,
        cx,
        cy,
        effectiveRadius * 2.2
      );
      bgGlow.addColorStop(0, 'rgba(0, 122, 255, 0.18)');
      bgGlow.addColorStop(0.5, 'rgba(175, 82, 222, 0.09)');
      bgGlow.addColorStop(0.8, 'rgba(50, 173, 230, 0.04)');
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, effectiveRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // 2. Translucent Glass Ball Core with Gradient
      const glassGradient = ctx.createRadialGradient(
        cx - effectiveRadius * 0.3 + mouseX * 0.1,
        cy - effectiveRadius * 0.3 + mouseY * 0.1,
        effectiveRadius * 0.1,
        cx,
        cy,
        effectiveRadius
      );
      glassGradient.addColorStop(0, 'rgba(255, 255, 255, 0.16)');
      glassGradient.addColorStop(0.6, 'rgba(0, 122, 255, 0.08)');
      glassGradient.addColorStop(0.88, 'rgba(175, 82, 222, 0.14)');
      glassGradient.addColorStop(1, 'rgba(50, 173, 230, 0.28)');

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, effectiveRadius, 0, Math.PI * 2);
      ctx.fillStyle = glassGradient;
      ctx.fill();
      ctx.clip(); // Clip internal dust particles to inside the ball

      // 3. Swirling Internal Dust Particles (with 3D sphere rotation)
      const rotAngleX = time * 0.3 + mouseY * 0.002;
      const rotAngleY = time * 0.4 + mouseX * 0.002;
      const cosY = Math.cos(rotAngleY);
      const sinY = Math.sin(rotAngleY);
      const cosX = Math.cos(rotAngleX);
      const sinX = Math.sin(rotAngleX);

      particles.forEach((p) => {
        // Internal motion + wake
        p.x += p.vx + (mouseX / (effectiveRadius * 2)) * 0.3;
        p.y += p.vy + (mouseY / (effectiveRadius * 2)) * 0.3;
        p.z += p.vz;

        // Bounce inside radius
        const distSq = p.x * p.x + p.y * p.y + p.z * p.z;
        const maxDist = effectiveRadius * 0.88;
        if (distSq > maxDist * maxDist) {
          const dist = Math.sqrt(distSq);
          p.x = (p.x / dist) * maxDist * 0.98;
          p.y = (p.y / dist) * maxDist * 0.98;
          p.z = (p.z / dist) * maxDist * 0.98;
          p.vx = -p.vx;
          p.vy = -p.vy;
          p.vz = -p.vz;
        }

        // 3D rotation projection
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const projScale = (z2 + effectiveRadius * 2) / (effectiveRadius * 2);
        const px = cx + x1 * projScale;
        const py = cy + y2 * projScale;

        const alpha = Math.max(0.1, Math.min(0.9, (p.alpha * (z2 + effectiveRadius)) / (effectiveRadius * 2)));

        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.8, p.radius * projScale), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // 4. Electric Crackling Rim Strands
      const strandCount = 3;
      const segments = 120;
      const angleStep = (Math.PI * 2) / segments;

      for (let s = 0; s < strandCount; s++) {
        const strandPhase = s * 1.8 + time * 2.2;
        ctx.beginPath();

        for (let i = 0; i <= segments; i++) {
          const theta = i * angleStep;

          // Electric jitter noise
          const jitter =
            (Math.sin(theta * 14 + strandPhase) * 2.5 +
              Math.cos(theta * 28 - strandPhase * 1.5) * 1.8) *
            electricIntensity;

          // Pull/flare towards cursor
          const cosTheta = Math.cos(theta);
          const sinTheta = Math.sin(theta);
          const dotToMouse = (cosTheta * mouseX + sinTheta * mouseY) / Math.max(1, Math.sqrt(mouseX * mouseX + mouseY * mouseY));
          const flare = isHovering ? Math.max(0, dotToMouse) * 12 : 0;

          const r = effectiveRadius + jitter + flare;
          const px = cx + cosTheta * r;
          const py = cy + sinTheta * r;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        ctx.closePath();
        ctx.lineWidth = s === 0 ? 2 : 1.2;
        ctx.strokeStyle =
          s === 0
            ? 'rgba(50, 173, 230, 0.75)'
            : s === 1
            ? 'rgba(0, 122, 255, 0.65)'
            : 'rgba(175, 82, 222, 0.55)';
        ctx.shadowColor = s === 0 ? '#32ADE6' : '#007AFF';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 5. Specular Glass Highlight Glint
      const specX = cx - effectiveRadius * 0.35 + mouseX * 0.05;
      const specY = cy - effectiveRadius * 0.35 + mouseY * 0.05;
      const specGrad = ctx.createRadialGradient(
        specX,
        specY,
        2,
        specX,
        specY,
        effectiveRadius * 0.45
      );
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      specGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.2)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.arc(specX, specY, effectiveRadius * 0.45, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseleave', onMouseLeave);
        window.removeEventListener('click', onClick);
      }
    };
  }, [size, particleCount, electricIntensity, interactive]);

  return (
    <div className={`pointer-events-none select-none relative ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
