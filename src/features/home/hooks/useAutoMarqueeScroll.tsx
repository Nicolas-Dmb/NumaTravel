import { useEffect, useLayoutEffect, useRef, useState } from "react";

type AutoMarqueeOptions = {
  speedPxPerSec?: number;
  thresholdPx?: number;
};

export default function useAutoMarqueeScroll(options: AutoMarqueeOptions = {}) {
  const { speedPxPerSec = 40, thresholdPx = 80 } = options;

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cycleRef = useRef<HTMLDivElement | null>(null);

  const [userInteracted, setUserInteracted] = useState(false);
  const pendingManualScrollLeftRef = useRef<number | null>(null);

  const rafIdRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (!userInteracted) el.scrollLeft = el.scrollWidth / 4;
  }, [userInteracted]);

  useEffect(() => {
    const el = scrollerRef.current;
    const cycle = cycleRef.current;
    if (!el || !cycle) return;

    const stop = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      lastTsRef.current = null;
    };

    if (userInteracted) {
      stop();
      return;
    }

    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      el.scrollLeft += speedPxPerSec * dt;

      const max = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft > max - thresholdPx) el.scrollLeft = el.scrollWidth / 4;
      if (el.scrollLeft < thresholdPx) el.scrollLeft = el.scrollWidth / 4;

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return stop;
  }, [userInteracted, speedPxPerSec, thresholdPx]);

  const disableAutoPremium = () => {
    if (userInteracted) return;

    const el = scrollerRef.current;
    const cycle = cycleRef.current;

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = null;
    lastTsRef.current = null;

    if (!el || !cycle) {
      setUserInteracted(true);
      return;
    }

    const cycleWidth = cycle.scrollWidth;
    const normalized = cycleWidth > 0 ? el.scrollLeft % cycleWidth : el.scrollLeft;

    pendingManualScrollLeftRef.current = normalized;
    setUserInteracted(true);
  };

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    const target = pendingManualScrollLeftRef.current;
    if (!el || target == null) return;

    requestAnimationFrame(() => {
      el.scrollLeft = target;
      pendingManualScrollLeftRef.current = null;
    });
  }, [userInteracted]);

  const interactionHandlers = {
    onTouchStart: disableAutoPremium,
    onPointerDown: disableAutoPremium,
    onMouseDown: disableAutoPremium,
    onWheel: disableAutoPremium,
  };

  return {
    scrollerRef,
    cycleRef,
    userInteracted,
    interactionHandlers,
  };
}
