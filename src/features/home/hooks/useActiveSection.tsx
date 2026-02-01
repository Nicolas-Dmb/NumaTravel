import { useEffect, useState } from "react";

type Section = { id: string; label: string };

export default function useActiveSectionByCenter(
  sections: Section[],
  offsetPx = 0 
) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const getActive = () => {
      const centerY = window.innerHeight / 2 + offsetPx;

      let current = activeId;

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        // rect.top / rect.bottom sont relatifs à la fenêtre
        if (rect.top <= centerY && rect.bottom >= centerY) {
          current = s.id;
          break;
        }
      }

      if (current !== activeId) setActiveId(current);
    };

    getActive();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        getActive();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections, offsetPx, activeId]);

  return activeId;
}
