import { useEffect, useRef } from "react";

export default function NebulaCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    };

    resize();
    window.addEventListener("resize", resize);

    // Build stars
    const count = Math.floor((window.innerWidth * window.innerHeight) / 8000);
    const stars = Array.from({ length: count }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random(),
      v: Math.random() * 0.025 + 0.008,
    }));

    const getColor = (cssVar: string, alpha = 1) => {
      const style = getComputedStyle(document.documentElement);
      const hsl = style.getPropertyValue(cssVar).trim();
      if (!hsl) return `rgba(100, 100, 255, ${alpha})`;
      
      const parts = hsl.split(/\s+/);
      let h = parts[0];
      let s = parts[1] || "100%";
      let l = parts[2] || "50%";
      
      // Ensure percentages
      if (!s.includes("%")) s = s + "%";
      if (!l.includes("%")) l = l + "%";
      
      return `hsla(${h}, ${s}, ${l}, ${alpha})`;
    };

    const drawNebula = () => {
      const w = window.innerWidth, h = window.innerHeight;
      
      // Main nebula - brand color (purple)
      const g1 = ctx.createRadialGradient(w * 0.2, h * 0.2, 0, w * 0.2, h * 0.2, Math.max(w, h) * 0.7);
      g1.addColorStop(0, getColor("--brand", 0.45));
      g1.addColorStop(0.6, getColor("--brand", 0.15));
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Secondary nebula - cyan (brand-2)
      const g2 = ctx.createRadialGradient(w * 0.85, h * 0.35, 0, w * 0.85, h * 0.35, Math.max(w, h) * 0.6);
      g2.addColorStop(0, getColor("--brand-2", 0.38));
      g2.addColorStop(0.6, getColor("--brand-2", 0.1));
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);
      
      // Additional accent nebula for depth
      const g3 = ctx.createRadialGradient(w * 0.5, h * 0.8, 0, w * 0.5, h * 0.8, Math.max(w, h) * 0.5);
      g3.addColorStop(0, "rgba(100, 200, 255, 0.2)");
      g3.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, w, h);
    };

    const loop = () => {
      const w = window.innerWidth, h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      drawNebula();

      ctx.save();
      ctx.fillStyle = getColor("--foreground", 0.9);
      stars.forEach((s) => {
        s.a += s.v;
        const twinkle = (Math.sin(s.a) + 1) * 0.5;
        ctx.globalAlpha = 0.2 + twinkle * 0.8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 -z-10 opacity-90"
      aria-hidden
    />
  );
}
