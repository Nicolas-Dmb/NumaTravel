import { useEffect, useRef, useState } from "react";
import useActiveSectionByCenter from "../hooks/useActiveSection";
import useIsScrolling from "../hooks/useIsScrolling";

type Section = { id: string; label: string };

export default function SectionNavigator({ sections }: { sections: Section[] }) {
  const isScrolling = useIsScrolling(200);
  const activeId = useActiveSectionByCenter(sections, 0);

  const visible = isScrolling;
  const activeIndex = Math.max(0, sections.findIndex((s) => s.id === activeId));

  const ITEM_HEIGHT = 32;
  const VISIBLE_ITEMS = 7;
  const middleIndex = Math.floor(VISIBLE_ITEMS / 2);
  const translateY = (middleIndex - activeIndex) * ITEM_HEIGHT;

  const [scrubIndex, setScrubIndex] = useState(activeIndex);
  const [dragging, setDragging] = useState(false);

  const scrubIndexRef = useRef(scrubIndex);
  const lastStepY = useRef<number | null>(null);

  useEffect(() => {
    scrubIndexRef.current = scrubIndex;
  }, [scrubIndex]);

  useEffect(() => {
    setScrubIndex(activeIndex);
  }, [activeIndex]);

  const STEP_PX = 22;

  const goToIndex = (next: number) => {
    const clamped = Math.min(sections.length - 1, Math.max(0, next));
    setScrubIndex(clamped);

    const target = sections[clamped];
    document.getElementById(target.id)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    lastStepY.current = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;

    const y = e.clientY;
    const last = lastStepY.current ?? y;
    const dy = y - last;

    if (Math.abs(dy) < STEP_PX) return;

    const direction = dy > 0 ? 1 : -1;
    lastStepY.current = y;

    goToIndex(scrubIndexRef.current + direction);
  };

  const onPointerUp = () => {
    setDragging(false);
    lastStepY.current = null;
  };

  const focusIndex = dragging ? scrubIndex : activeIndex;

  const containerOpacity = visible || dragging ? "opacity-100" : "opacity-0";
  const containerScale = visible || dragging ? "scale-110" : "scale-110";

  const widthClass = dragging ? "w-[30vw] md:w-[20vw]" : "w-[30vw]  md:w-[20vw]";

  return (
    <div
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-200 ${containerOpacity} ${containerScale}`}
    >
      <div
        className={`
          relative
          ${widthClass}
          overflow-hidden touch-none
          backdrop-blur-sm
          ring-1 ring-black/10
          rounded-l-[100%]
        `}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          height: ITEM_HEIGHT * VISIBLE_ITEMS,
          backgroundColor: dragging ? "#ebe6e277" : "#ebe6e244",
        }}
      >
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-numa-black/10" />

        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-40">
          <span className="h-1 w-1 rounded-full bg-numa-black" />
          <span className="h-1 w-1 rounded-full bg-numa-black" />
          <span className="h-1 w-1 rounded-full bg-numa-black" />
        </div>

        <div className="h-full w-full pl-5 pr-6 flex items-center">
          <div className="overflow-hidden w-full" style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS }}>
            <div
              className="transition-transform duration-300 ease-out"
              style={{ transform: `translateY(${translateY}px)` }}
            >
              {sections.map((section, index) => {
                const distance = Math.abs(index - focusIndex);
                const d = Math.min(distance, 3);

                const scale = 1.25 - d * 0.15;
                const opacity = 1 - d * 0.2;

                const labelOpacity = d === 0 ? 1 : d === 1 ? 0.7 : 0.35;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="w-full flex items-center gap-2 transition-transform duration-150"
                    style={{
                      height: ITEM_HEIGHT,
                      transform: `scale(${scale})`,
                      opacity,
                      transformOrigin: "right center",
                    }}
                    onClick={(e) => {
                      if (dragging) e.preventDefault();
                    }}
                  >
                    <span
                      className="ml-auto block max-w-[100%] truncate text-right text-numa-black transition-opacity duration-150 text-[8px] md:text-[14px]"
                      style={{ opacity: labelOpacity }}
                    >
                      {section.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
