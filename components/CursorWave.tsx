"use client";

import React, { useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export type CursorWaveShape = "circle" | "triangle" | "square";
export type CursorWaveColor = string | { stops: [string, string] };
export interface CursorWaveProps {
  width?: string | number; height?: string | number; className?: string; children?: React.ReactNode;
  cellSize?: number; influenceRadiusVmin?: number; attackTime?: number; releaseTime?: number;
  idleScale?: number; minPeakScale?: number; maxPeakScale?: number; burstSpeed?: number;
  burstThickness?: number; backgroundColor?: string; shapes?: CursorWaveShape[];
  colors?: CursorWaveColor[]; dpr?: number; opacity?: number;
}
export interface CursorWaveHandle { burst: (x?: number, y?: number) => void }

const TAU = Math.PI * 2;
const defaults: CursorWaveColor[] = ["#FF4F2A", "#C4FF41", "#ff7b42", { stops: ["#FF4F2A", "#401006"] }, { stops: ["#C4FF41", "#263b00"] }];
const shapeDefaults: CursorWaveShape[] = ["circle", "triangle", "square"];
const pick = <T,>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)];
const settle = (seconds: number) => seconds <= 0 ? 1 : 1 - Math.pow(0.05, 1 / (60 * seconds));

interface Cell { x: number; y: number; shape: CursorWaveShape; color: CursorWaveColor; angle: number; size: number; scale: number; peak: number }
interface Ripple { x: number; y: number; start: number }

const CursorWave = React.forwardRef<CursorWaveHandle, CursorWaveProps>(({
  width = "100%", height = "100%", className, children, cellSize = 38,
  influenceRadiusVmin = 24, attackTime = 0.28, releaseTime = 0.9, idleScale = 0.045,
  minPeakScale = 0.8, maxPeakScale = 2.4, burstSpeed = 900, burstThickness = 170,
  backgroundColor = "#000000", shapes = shapeDefaults, colors = defaults, dpr = 1.5, opacity = 0.72,
}, handle) => {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const cells = useRef<Cell[]>([]);
  const ripples = useRef<Ripple[]>([]);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const size = useRef({ width: 1, height: 1, ratio: 1 });

  const build = useCallback(() => {
    const { width: w, height: h } = size.current;
    const cols = Math.max(1, Math.floor(w / cellSize));
    const rows = Math.max(1, Math.floor(h / cellSize));
    const ox = (w - (cols - 1) * cellSize) / 2;
    const oy = (h - (rows - 1) * cellSize) / 2;
    cells.current = Array.from({ length: cols * rows }, (_, index) => ({
      x: ox + (index % cols) * cellSize,
      y: oy + Math.floor(index / cols) * cellSize,
      shape: pick(shapes.length ? shapes : shapeDefaults),
      color: pick(colors.length ? colors : defaults),
      angle: Math.random() * TAU,
      size: cellSize * 0.38,
      scale: idleScale,
      peak: minPeakScale + Math.random() * (maxPeakScale - minPeakScale),
    }));
  }, [cellSize, colors, idleScale, maxPeakScale, minPeakScale, shapes]);

  const burst = useCallback((clientX?: number, clientY?: number) => {
    const rect = root.current?.getBoundingClientRect();
    if (!rect) return;
    ripples.current.push({ x: clientX === undefined ? rect.width / 2 : clientX - rect.left, y: clientY === undefined ? rect.height / 2 : clientY - rect.top, start: performance.now() });
  }, []);
  useImperativeHandle(handle, () => ({ burst }), [burst]);

  useEffect(() => {
    const container = root.current;
    const node = canvas.current;
    if (!container || !node) return;
    let raf = 0;
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, dpr);
      node.width = Math.max(1, Math.floor(rect.width * ratio));
      node.height = Math.max(1, Math.floor(rect.height * ratio));
      node.style.width = `${rect.width}px`;
      node.style.height = `${rect.height}px`;
      size.current = { width: rect.width, height: rect.height, ratio };
      build();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    const trace = (ctx: CanvasRenderingContext2D, cell: Cell) => {
      const r = cell.size * 0.6;
      ctx.beginPath();
      if (cell.shape === "circle") ctx.arc(0, 0, r, 0, TAU);
      else if (cell.shape === "square") ctx.roundRect(-r, -r, r * 2, r * 2, r * 0.18);
      else { for (let i = 0; i < 3; i++) { const a = -Math.PI / 2 + i * TAU / 3; const x = Math.cos(a) * r * 1.25; const y = Math.sin(a) * r * 1.25; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.closePath(); }
    };
    const render = () => {
      const ctx = node.getContext("2d");
      if (!ctx) return;
      const { width: w, height: h, ratio } = size.current;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);
      const now = performance.now();
      const radius = Math.min(w, h) * influenceRadiusVmin / 100;
      ripples.current = ripples.current.filter(r => (now - r.start) / 1000 * burstSpeed < Math.hypot(w, h) + burstThickness);
      ctx.globalAlpha = opacity;
      cells.current.forEach(cell => {
        let influence = 0;
        if (pointer.current) influence = Math.max(0, 1 - Math.hypot(cell.x - pointer.current.x, cell.y - pointer.current.y) / radius);
        ripples.current.forEach(ripple => { const ring = (now - ripple.start) / 1000 * burstSpeed; influence = Math.max(influence, 1 - Math.min(1, Math.abs(Math.hypot(cell.x - ripple.x, cell.y - ripple.y) - ring) / burstThickness)); });
        const target = idleScale + influence * cell.peak;
        cell.scale += (target - cell.scale) * (target > cell.scale ? settle(attackTime) : settle(releaseTime));
        ctx.save();
        ctx.translate(cell.x, cell.y);
        ctx.rotate(cell.angle);
        ctx.scale(cell.scale, cell.scale);
        trace(ctx, cell);
        if (typeof cell.color === "string") ctx.fillStyle = cell.color;
        else {
          const gradient = ctx.createRadialGradient(0, -cell.size * .3, 0, 0, cell.size * .3, cell.size * 1.5);
          gradient.addColorStop(0, cell.color.stops[0]);
          gradient.addColorStop(1, cell.color.stops[1]);
          ctx.fillStyle = gradient;
        }
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    const move = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const leave = () => { pointer.current = null; };
    const down = (event: PointerEvent) => burst(event.clientX, event.clientY);
    container.addEventListener("pointermove", move);
    container.addEventListener("pointerleave", leave);
    container.addEventListener("pointerdown", down);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      container.removeEventListener("pointermove", move);
      container.removeEventListener("pointerleave", leave);
      container.removeEventListener("pointerdown", down);
    };
  }, [attackTime, backgroundColor, build, burst, burstSpeed, burstThickness, dpr, idleScale, influenceRadiusVmin, opacity, releaseTime]);

  return (
    <div ref={root} className={cn("relative overflow-hidden", className)} style={{ width, height }}>
      <canvas ref={canvas} className="absolute inset-0 block h-full w-full" />
      {children && <div className="pointer-events-none relative z-10 h-full w-full">{children}</div>}
    </div>
  );
});

CursorWave.displayName = "CursorWave";
export default CursorWave;
