import { useEffect, useRef, useState } from "react";

export default function useAutoScrollPingPong(speedPxPerSec = 40) {
  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);
  const last = useRef<number | null>(null);
  const dir = useRef<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const stop = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
    last.current = null;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (paused) {
      stop();
      return;
    }

    const tick = (ts: number) => {
      if (last.current == null) last.current = ts;
      const dt = (ts - last.current) / 1000;
      last.current = ts;

      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;

      el.scrollLeft += dir.current * speedPxPerSec * dt;

      if (el.scrollLeft >= max) {
        el.scrollLeft = max;
        dir.current = -1;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft = 0;
        dir.current = 1;
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return stop;
  }, [paused, speedPxPerSec]);

  const interactionHandlers = {
    onTouchStart: () => setPaused(true),
    onPointerDown: () => setPaused(true),
    onMouseDown: () => setPaused(true),
    onWheel: () => setPaused(true),
  };

  return { scrollerRef: ref, paused, setPaused, interactionHandlers };
}
