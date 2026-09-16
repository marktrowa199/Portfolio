"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface SignalPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

export default function SignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Node count based on canvas width
    const nodeCount = Math.min(28, Math.max(14, Math.floor(width / 24)));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: 2 + Math.random() * 2,
        baseRadius: 2 + Math.random() * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const packets: SignalPacket[] = [];
    const maxPackets = 7;

    // Mouse tracking for subtle interactive pull
    const mouse = { x: -1000, y: -1000, radius: 100 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains("light");
      const nodeColor = isLight ? "#0F766E" : "#64FFDA";
      const lineColor = isLight ? "rgba(15, 118, 110," : "rgba(100, 255, 218,";
      const packetColor = isLight ? "#0284C7" : "#57CBFF";

      // Draw connections between close nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isLight ? 0.22 : 0.18);
            ctx.strokeStyle = `${lineColor}${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Randomly spawn data packet between linked nodes
            if (!prefersReducedMotion && packets.length < maxPackets && Math.random() < 0.003) {
              packets.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: 0.01 + Math.random() * 0.015,
              });
            }
          }
        }
      }

      // Draw and update packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const packet = packets[p];
        packet.progress += packet.speed;

        if (packet.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const n1 = nodes[packet.fromNode];
        const n2 = nodes[packet.toNode];
        if (!n1 || !n2) {
          packets.splice(p, 1);
          continue;
        }

        const px = n1.x + (n2.x - n1.x) * packet.progress;
        const py = n1.y + (n2.y - n1.y) * packet.progress;

        ctx.fillStyle = packetColor;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          // Mouse proximity interaction
          const mdx = mouse.x - node.x;
          const mdy = mouse.y - node.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < mouse.radius) {
            const force = (mouse.radius - mdist) / mouse.radius;
            node.x -= (mdx / mdist) * force * 1.5;
            node.y -= (mdy / mdist) * force * 1.5;
          }

          node.pulsePhase += node.pulseSpeed;
          node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 0.8;
        }

        // Outer glow circle
        ctx.fillStyle = `${lineColor}${isLight ? 0.07 : 0.06})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Core node
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[360px] lg:min-h-[440px] flex items-center justify-center rounded-2xl overflow-hidden border border-navy-700/60 dark:border-navy-700/60 light:border-[#E2E6EC] bg-navy-800/40 dark:bg-navy-800/40 light:bg-white light:shadow-sm backdrop-blur-sm transition-colors">
      {/* Visual background header tag */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none text-[11px] font-mono text-slate-muted light:text-[#7B879C]">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-900/80 dark:bg-navy-900/80 light:bg-[#EEF1F6] border border-navy-700/50 light:border-[#E2E6EC]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan light:bg-[#0F766E] animate-pulse" />
          <span className="light:text-[#1E2530]">SYS_SIGNAL_GRAPH // 60FPS</span>
        </div>
        <div className="hidden sm:block text-[10px] opacity-75">
          LATENCY: 12ms // BUFFER: OK
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
      />

      {/* Subtle overlay corners */}
      <div className="absolute bottom-3 left-3 pointer-events-none font-mono text-[10px] text-slate-dim light:text-[#7B879C]">
        [POINTER_AWARE_MESH]
      </div>
      <div className="absolute bottom-3 right-3 pointer-events-none font-mono text-[10px] text-cyan dark:text-cyan light:text-[#0F766E] font-medium">
        NODE_COUNT: 24 ACTIVE
      </div>
    </div>
  );
}
