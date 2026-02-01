import { useEffect, useRef, useState } from "react";

export default function useIsScrolling(delay = 200) {
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(true);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, delay);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  return isScrolling;
}
