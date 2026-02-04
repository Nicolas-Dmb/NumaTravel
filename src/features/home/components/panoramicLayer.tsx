import useDevice from '../../../hook/useDevice';
import cinqo_terra from '../assets/5terra.webp';
import greece from '../assets/greece.webp';
import indonesia_beach from '../assets/indonesia_beach.webp';
import indonesia_kayak from '../assets/indonesia_kayak.webp';
import paris from '../assets/paris.webp';

export default function PanoramicLayer() {
    const { islaptop } = useDevice();
    
    return (
        <section className="xl:min-h-screen bg-numa-black text-numa-white py-10">
            {
                islaptop ? <LaptopGrid /> : <MobileGrid />
            }
        </section>
    );
}

function LaptopGrid(){
    return (
    <div className="mx-auto px-10">
        <div className="collage-grid gap-6">
        <img className="tile tile-a" src={cinqo_terra} alt="photo d'un ville des cinque terre en Italie" />
        <img className="tile tile-b" src={paris} alt="photo de la tour Eiffel à Paris" />
        <img className="tile tile-c" src={indonesia_kayak} alt="photo du bord de mer en Indonésie" />
        <img className="tile tile-d" src={greece} alt="photo d'une ruelle colorée à Réthymnon en Crète" />
        <img className="tile tile-e" src={indonesia_beach} alt="photo d'une plage en Indonésie" />
        </div>
    </div>
    );
}

function MobileGrid(){
    const photos = [
        { src: cinqo_terra, alt: "photo d'un ville des cinque terre en Italie" },
        { src: paris, alt: "photo de la tour Eiffel à Paris" },
        { src: indonesia_kayak, alt: "photo du bord de mer en Indonésie" },
        { src: greece, alt: "photo d'une ruelle colorée à Réthymnon en Crète" },
        { src: indonesia_beach, alt: "photo d'une plage en Indonésie" },
    ];
    return (
        <div className=" px-4">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [-webkit-overflow-scrolling:touch]">
            {photos.map((p, i) => (
              <img
                key={i}
                src={p.src}
                alt={p.alt}
                className="snap-center shrink-0 w-[85vw] sm:w-[70vw] h-[52vh] object-cover rounded-2xl"
                loading="lazy"
                draggable={false}
              />
            ))}
          </div>
        </div>
    );
}