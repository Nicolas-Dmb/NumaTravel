import { useEffect, useMemo, useRef, useState } from "react";
import world_map from "/public/world_map.svg";

type Destination = {
  id: string;
  name: string;
  x: number;
  y: number;
  photos: string[];
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const destinations: Destination[] = [
  { id: "paris", name: "Paris", x: 470, y: 130, photos: [] },
  { id: "quebec", name: "Quebec", x: 300, y: 130, photos: ["/public/album/quebec/1.jpg","/public/album/quebec/2.jpg","/public/album/quebec/3.jpg","/public/album/quebec/4.jpg","/public/album/quebec/5.jpg"] },
  { id: "chiang_mai", name: "Chiang Mai", x: 700, y: 200, photos: ["/public/album/chiang_mai/1.jpg","/public/album/chiang_mai/2.jpg","/public/album/chiang_mai/3.jpg","/public/album/chiang_mai/4.jpg"] },
];

export default function Explorer() {
  const [open, setOpen] = useState<Destination | null>(null);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-numa-white px-4 pt-20 pb-10 md:px-16">
      <h1 className="font-cormorant text-[40px] md:text-[70px] font-bold text-numa-black">
        Explorer
      </h1>

      <div className="mx-auto w-full bg-numa-red rounded-3xl">
        <WorldMap destinations={destinations} onSelect={setOpen} />
      </div>

      {open && <AlbumModal destination={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function WorldMap({
    destinations,
    onSelect,
  }: {
    destinations: Destination[];
    onSelect: (d: Destination) => void;
  }) {

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


  return (
    <div className="relative">
      <div
        ref={viewportRef}
        className="
          relative w-full
          h-[70vh] md:h-[75vh]
          overflow-hidden
          rounded-3xl
          bg-numa-white
          touch-none
          select-none
          shadow-lg
        "
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          <svg viewBox={viewBox} className="w-[1200px] md:w-[1600px] h-auto">
            <image
              href={world_map}
              width="1000"
              height="500"
              style={{ pointerEvents: "none" }}
            />

            {destinations.map((d) => (
              <g
                key={d.id}
                className="cursor-pointer"
                onPointerUp={(e) => {
                  e.stopPropagation();
                  onSelect(d);
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  blockPanRef.current = true;   
                  movedRef.current = false; 
                }}
              >
                <circle cx={d.x} cy={d.y} r="12" fill="black" opacity="0.12" />
                <circle cx={d.x} cy={d.y} r="5" fill="black" />
                <text
                  x={d.x}
                  y={d.y - 14}
                  textAnchor="middle"
                  fontSize="12"
                  fill="black"
                  opacity="0.85"
                >
                  {d.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}


function AlbumModal({
  destination,
  onClose,
}: {
  destination: Destination;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-numa-black/40 p-4 flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-3xl bg-numa-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-poppins text-lg font-semibold text-numa-black">
            {destination.name}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm font-semibold text-numa-black hover:bg-black/5"
          >
            Fermer
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
          {destination.photos.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="aspect-square w-full rounded-2xl object-cover transition-transform duration-300 hover:scale-[1.02]"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
