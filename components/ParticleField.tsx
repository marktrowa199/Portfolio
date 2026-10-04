"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; radius: number };

/** A decorative, low contrast canvas that stays out of the page's hit testing. */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallScreen = window.matchMedia("(max-width: 700px)");
    const pointerFine = window.matchMedia("(pointer: fine)");
    const root = document.documentElement;
    const pointer = { x: -10_000, y: -10_000, active: false };
    let particles: Particle[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let lastTime = 0;
    let themeBlend = root.classList.contains("light") ? 1 : 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const count = reducedMotion.matches ? 0 : Math.min(
        smallScreen.matches ? 24 : 58,
        Math.round((width * height) / (smallScreen.matches ? 25_000 : 19_000)),
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.5 + 1.5,
      }));
    };

    const draw = (time: number) => {
      frame = 0;
      if (document.hidden) return;
      const elapsed = lastTime ? Math.min((time - lastTime) / 16.67, 2) : 1;
      lastTime = time;
      context.clearRect(0, 0, width, height);
      const light = root.classList.contains("light");
      const targetThemeBlend = light ? 1 : 0;
      themeBlend += (targetThemeBlend - themeBlend) * 0.055;
      const darkInk = [94, 234, 212];
      const lightInk = [15, 118, 110];
      const ink = darkInk.map((channel, index) => Math.round(channel + (lightInk[index] - channel) * themeBlend)).join(", ");
      const dotOpacity = 0.55 + 0.12 * themeBlend;
      const lineOpacity = 0.16 + 0.06 * themeBlend;
      const reach = smallScreen.matches ? 90 : 125;
      const reachSquared = reach * reach;

      particles.forEach((particle, index) => {
        if (pointer.active && pointerFine.matches) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared < reachSquared && distanceSquared > 1) {
            const force = (1 - distanceSquared / reachSquared) * 0.006;
            particle.vx -= dx * force * elapsed;
            particle.vy -= dy * force * elapsed;
          }
        }

        particle.vx = Math.max(-0.42, Math.min(0.42, particle.vx * 0.995));
        particle.vy = Math.max(-0.42, Math.min(0.42, particle.vy * 0.995));
        particle.x += particle.vx * elapsed;
        particle.y += particle.vy * elapsed;
        if (particle.x < -4) particle.x = width + 4;
        if (particle.x > width + 4) particle.x = -4;
        if (particle.y < -4) particle.y = height + 4;
        if (particle.y > height + 4) particle.y = -4;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${ink}, ${dotOpacity})`;
        context.fill();

        for (let next = index + 1; next < particles.length; next += 1) {
          const neighbor = particles[next];
          const dx = particle.x - neighbor.x;
          const dy = particle.y - neighbor.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared >= 78 * 78) continue;
          const alpha = (1 - Math.sqrt(distanceSquared) / 78) * lineOpacity;
          context.strokeStyle = `rgba(${ink}, ${alpha})`;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(neighbor.x, neighbor.y);
          context.stroke();
        }
      });

      if (!reducedMotion.matches) frame = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (reducedMotion.matches || document.hidden || frame) return;
      lastTime = 0;
      frame = window.requestAnimationFrame(draw);
    };
    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      context.clearRect(0, 0, width, height);
    };
    const updateMotion = () => {
      resize();
      if (reducedMotion.matches) stop();
      else start();
    };
    const updatePointer = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = event.pointerType !== "touch";
    };
    const clearPointer = () => { pointer.active = false; };

    resize();
    start();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerout", clearPointer, { passive: true });
    document.addEventListener("visibilitychange", start);
    reducedMotion.addEventListener("change", updateMotion);
    smallScreen.addEventListener("change", updateMotion);
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerout", clearPointer);
      document.removeEventListener("visibilitychange", start);
      reducedMotion.removeEventListener("change", updateMotion);
      smallScreen.removeEventListener("change", updateMotion);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
