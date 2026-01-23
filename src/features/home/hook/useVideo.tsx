import { useEffect, useMemo, useRef, useState } from "react";


export default function useVideo() {
    const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(true);

  const base = import.meta.env.BASE_URL;

  const src = useMemo(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    return isMobile ? `${base}video-mobile.mp4` : `${base}video-desktop.mp4`;
  }, [base]);

  useEffect(() => {
    const el = sectionRef.current;
    const v = videoRef.current;
    if (!el || !v) return;

    const start = () => {
      setEnabled(true);
      v.src = src;
      v.load();
      v.play().catch(() => {});
    };

    const stopAndFree = () => {
      v.pause();
      v.removeAttribute("src");
      v.load();
      setEnabled(false);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stopAndFree();
      },
      { threshold: 0.0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return { sectionRef, videoRef, enabled };
}