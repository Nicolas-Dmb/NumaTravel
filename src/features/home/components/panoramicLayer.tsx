import useDevice from '../hook/useDevice';
import cinqo_terra from '../assets/5terra.png';
import greece from '../assets/greece.png';
import indonesia_beach from '../assets/indonesia_beach.png';
import indonesia_kayak from '../assets/indonesia_kayak.png';
import paris from '../assets/paris.png';

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
        <img className="tile tile-a" src={cinqo_terra} alt="Cinqo Terra" />
        <img className="tile tile-b" src={paris} alt="Paris" />
        <img className="tile tile-c" src={indonesia_kayak} alt="Indonesia Kayak" />
        <img className="tile tile-d" src={greece} alt="Greece" />
        <img className="tile tile-e" src={indonesia_beach} alt="Indonesia Beach" />
        </div>
    </div>
    );
}

function MobileGrid(){
    const photos = [
        { src: cinqo_terra, alt: 'Cinqo Terra' },
        { src: paris, alt: 'Paris' },
        { src: indonesia_kayak, alt: 'Indonesia Kayak' },
        { src: greece, alt: 'Greece' },
        { src: indonesia_beach, alt: 'Indonesia Beach' },
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
              />
            ))}
          </div>
        </div>
    );
}