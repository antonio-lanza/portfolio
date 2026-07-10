import { useEffect, useRef } from 'react';
import { useEntrance } from '@/hooks/use-entrance';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
};

const CONNECTION_DISTANCE = 130;
const PARTICLE_DENSITY = 11000;

function createParticle(width: number, height: number): Particle {
  const speed = Math.random() * 0.22 + 0.06;
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: Math.random() * 1.3 + 0.5,
    opacity: Math.random() * 0.4 + 0.12,
  };
}

function getContactIntensity() {
  const el = document.getElementById('contact');
  if (!el) return 0;

  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
  if (visible <= 0) return 0;

  const ratio = visible / vh;
  return Math.min(1, Math.max(0, (ratio - 0.12) / 0.45));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function ParticleBackground() {
  const ready = useEntrance();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationId = 0;
    let particles: Particle[] = [];
    let intensity = 0;
    let targetIntensity = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((window.innerWidth * window.innerHeight) / PARTICLE_DENSITY);
      particles = Array.from({ length: Math.min(Math.max(count, 45), 100) }, () =>
        createParticle(window.innerWidth, window.innerHeight),
      );
    };

    const updateTarget = () => {
      targetIntensity = getContactIntensity();
      if (prefersReducedMotion) {
        intensity = targetIntensity;
        draw();
      }
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (!prefersReducedMotion) {
        intensity += (targetIntensity - intensity) * 0.08;
        if (Math.abs(targetIntensity - intensity) < 0.002) intensity = targetIntensity;
      } else {
        intensity = targetIntensity;
      }

      const t = intensity;
      const connectionDistance = lerp(CONNECTION_DISTANCE, 148, t);
      const lineAlphaMax = lerp(0.1, 0.2, t);
      const lineWidth = lerp(0.5, 0.7, t);
      const sizeBoost = lerp(1, 1.2, t);
      const opacityBoost = lerp(1, 1.65, t);
      const glowStrength = t * 0.14;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
        }

        const size = p.size * sizeBoost;
        const alpha = Math.min(1, p.opacity * opacityBoost);

        if (glowStrength > 0.01) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha * glowStrength})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle =
          t > 0.05
            ? `rgba(186, 230, 253, ${alpha})`
            : `rgba(125, 211, 252, ${alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * lineAlphaMax;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(draw);
      }
    };

    resize();
    updateTarget();
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateTarget, { passive: true });
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateTarget);
      cancelAnimationFrame(animationId);
    };
  }, [ready]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
