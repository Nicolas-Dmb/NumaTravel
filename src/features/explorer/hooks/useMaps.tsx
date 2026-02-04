import { useEffect, useMemo, useState, useRef } from "react";


function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function useMaps() {
  const blockPanRef = useRef(false);

  
  const viewBox = useMemo(() => "0 0 1000 500", []);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const DRAG_THRESHOLD = 6; 
  const movedRef = useRef(false);

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;
  const PINCH_THRESHOLD = 6; 

  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  const tRef = useRef({ scale: 1, tx: 0, ty: 0 });
  useEffect(() => {
    tRef.current = { scale, tx, ty };
  }, [scale, tx, ty]);

  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const panRef = useRef<{ lastX: number; lastY: number; active: boolean }>({
    lastX: 0,
    lastY: 0,
    active: false,
  });

  const pinchRef = useRef<{
    startDist: number;
    startScale: number;
    started: boolean;
  } | null>(null);

  const getDist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.hypot(a.x - b.x, a.y - b.y);

  const zoomAt = (mx: number, my: number, nextScale: number) => {
    const { scale: s, tx: x, ty: y } = tRef.current;

    const ns = clamp(nextScale, MIN_SCALE, MAX_SCALE);

    const worldX = (mx - x) / s;
    const worldY = (my - y) / s;

    const nextTx = mx - worldX * ns;
    const nextTy = my - worldY * ns;

    setScale(ns);
    setTx(nextTx);
    setTy(nextTy);
  };

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const delta = e.deltaY;
      const factor = delta < 0 ? 1.12 : 1 / 1.12;

      const { scale: s } = tRef.current;
      zoomAt(mx, my, s * factor);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (blockPanRef.current) return;
    movedRef.current = false;
    const el = viewportRef.current;
    if (!el) return;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 1) {
      panRef.current = { lastX: e.clientX, lastY: e.clientY, active: true };
      pinchRef.current = null;
    }

    if (pointersRef.current.size === 2) {
      const pts = Array.from(pointersRef.current.values());
      pinchRef.current = {
        startDist: getDist(pts[0], pts[1]),
        startScale: tRef.current.scale,
        started: false,
      };
      panRef.current.active = false;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = viewportRef.current;
    if (!el) return;

    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2 && pinchRef.current) {
      const rect = el.getBoundingClientRect();
      const pts = Array.from(pointersRef.current.values());

      const dist = getDist(pts[0], pts[1]);
      const pinch = pinchRef.current;

      if (!pinch.started && Math.abs(dist - pinch.startDist) < PINCH_THRESHOLD) {
        return;
      }
      pinch.started = true;

      const centerX = (pts[0].x + pts[1].x) / 2 - rect.left;
      const centerY = (pts[0].y + pts[1].y) / 2 - rect.top;

      const nextScale = pinch.startScale * (dist / pinch.startDist);
      zoomAt(centerX, centerY, nextScale);
      return;
    }

    if (pointersRef.current.size === 1 && panRef.current.active) {
      const dx = e.clientX - panRef.current.lastX;
      const dy = e.clientY - panRef.current.lastY;

      if (Math.hypot(dx, dy) > DRAG_THRESHOLD) movedRef.current = true;

      panRef.current.lastX = e.clientX;
      panRef.current.lastY = e.clientY;

      setTx((v) => v + dx);
      setTy((v) => v + dy);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    blockPanRef.current = false;
    pointersRef.current.delete(e.pointerId);

    if (pointersRef.current.size === 0) {
      panRef.current.active = false;
      pinchRef.current = null;
    }

    if (pointersRef.current.size === 1) {
      // Revenir en pan si on repasse à 1 doigt
      const remaining = Array.from(pointersRef.current.values())[0];
      panRef.current = { lastX: remaining.x, lastY: remaining.y, active: true };
      pinchRef.current = null;
    }
  };

    return {blockPanRef,movedRef, viewportRef, viewBox, onPointerDown, onPointerMove, onPointerUp, scale, tx, ty };
}
