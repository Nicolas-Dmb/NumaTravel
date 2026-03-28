import { useState } from "react";
import world_map from "/world_map.svg";
import useMaps from "../features/explorer/hooks/useMaps.tsx";
import SEO from "../components/SEO.tsx";
import { destinations, type Destination } from "../features/explorer/destination.tsx";



export default function Explorer() {
  const [open, setOpen] = useState<Destination | null>(null);

  return (
    <>
      <SEO
        title="Explorer – Numa Travel | Travel planner"
        description="Découvrez les destinations déjà explorées par Numa Travel et inspirez-vous pour votre prochain voyage sur mesure."
        canonicalPath="/explorer"
      />

      <main>
        <div className="min-h-[calc(100vh-4rem)] bg-numa-white px-4 pt-20 pb-10 md:px-16">
          <h1 className="font-cormorant text-[40px] md:text-[70px] font-bold text-numa-black">
            Explorer
          </h1>

          <div className="mx-auto w-full bg-numa-red rounded-3xl">
            <WorldMap destinations={destinations} onSelect={setOpen} />
          </div>

          {open && (
            <AlbumModal destination={open} onClose={() => setOpen(null)} />
          )}
        </div>
      </main>
    </>
  );
}

function WorldMap({
  destinations,
  onSelect,
}: {
  destinations: Destination[];
  onSelect: (d: Destination) => void;
}) {
  const {
    blockPanRef,
    movedRef,
    viewportRef,
    tx,
    ty,
    scale,
    viewBox,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = useMaps();

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
          cursor-grab active:cursor-grabbing
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
                <circle cx={d.x} cy={d.y} r="5" fill="#111111" opacity="0.12" />
                <circle cx={d.x} cy={d.y} r="2" fill="#111111" />
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
      className="fixed inset-0 z-50 bg-numa-black/40 p-4 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-full h-[80vh] max-w-4xl rounded-3xl bg-numa-white p-6 shadow-xl"
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

        {destination.photos.length > 0 ? (
          <div className="mt-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [-webkit-overflow-scrolling:touch]">
            {destination.photos.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`${destination.name} ${index + 1}`}
                className="h-[60vh] w-auto flex-none snap-center rounded-2xl object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-numa-black/70">
            Aucune photo pour cette destination.
          </p>
        )}
      </div>
    </div>
  );
}
