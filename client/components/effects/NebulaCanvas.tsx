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
    const count = Math.floor((window.innerWidth * window.innerHeight) / 9000);
    const stars = Array.from({ length: count }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      v: Math.random() * 0.02 + 0.005,
    }));

    const drawNebula = () => {
      const w = window.innerWidth, h = window.innerHeight;
      // soft radial glows (brand + brand-2)
      const g1 = ctx.createRadialGradient(w * 0.2, h * 0.2, 0, w * 0.2, h * 0.2, Math.max(w, h) * 0.6);
      g1.addColorStop(0, getColor("--brand", 0.28));
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.85, h * 0.35, 0, w * 0.85, h * 0.35, Math.max(w, h) * 0.5);
      g2.addColorStop(0, getColor("--brand-2", 0.22));
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);
    };

    const getColor = (cssVar: string, alpha = 1) => {
      const style = getComputedStyle(document.documentElement);
      const hsl = style.getPropertyValue(cssVar).trim(); // e.g. "260 100% 70%"
      const [h, s, l] = hsl.split(/\s+/);
      const hNum = parseFloat(h);
      const sStr = s?.includes("%") ? s : `${s}%`;
      const lStr = l?.includes("%") ? l : `${l}%`;
      return `hsla(${isNaN(hNum) ? h : hNum}, ${sStr}, ${lStr}, ${alpha})`;
    };

    const loop = () => {
      const w = window.innerWidth, h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      drawNebula();

      // draw stars
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
      className="pointer-events-none absolute inset-0 -z-10 opacity-70"
      aria-hidden
    />
  );
}
