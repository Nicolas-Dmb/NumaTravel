import alois from '../assets/alois.webp'

interface FourthLayerProps {
  isWhiteBackground: boolean;
}

export default function FourthLayer({ isWhiteBackground }: FourthLayerProps) {
  const destinations = (
    <p className="font-poppins text-[13px] leading-relaxed sm:text-[15px]">
      7 destinations explorées :{" "}
      <span className="font-semibold">
        Bali · Lombok · Gili · Sumba · Sumbawa · Sumatra · Raja Ampat
      </span>
    </p>
  );

  return (
    <section className={isWhiteBackground ? "bg-numa-white text-numa-black xl:min-h-[95vh]" : "bg-numa-red text-numa-white xl:min-h-[95vh]"}>

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-stretch xl:gap-16 xl:min-h-[95vh]">

          <div className="xl:flex xl:flex-col xl:justify-start">
            <img
              src={alois}
              alt="Photo de moi en voyage"
              className="mx-auto h-auto w-[80vw] max-w-md object-cover xl:h-[90vh] xl:w-auto xl:max-w-none"
              loading="lazy"
              draggable={false}
            />
            <div className="hidden xl:block mt-4">{destinations}</div>
          </div>

          <div className="flex w-full px-0 md:px-24 xl:px-0 flex-col text-center xl:text-left xl:pt-16 xl:justify-between">
            <div className="space-y-6 font-poppins text-[15px] leading-relaxed sm:text-[18px] lg:text-[19px] lg:leading-[1.8]">
              <p>L’Indonésie occupe une place particulière dans ma vie. J’y voyage depuis 2018 et j’ai eu l’occasion d’explorer différentes îles du pays : Bali, Lombok, les îles Gili, Sumba, Sumbawa, Sumatra et Raja Ampat.</p>
              <p>Mon lien avec l’Indonésie est également personnel : mon frère vivant en Indonésie, j’ai aussi eu l’occasion de découvrir le pays autrement et de m’y sentir progressivement comme chez moi. Au fil de mes voyages, j’ai créé des liens avec des locaux, des guides, des personnes rencontrées sur place, et découvert des adresses et des endroits loin des itinéraires les plus classiques. Je connais les réalités d’un voyage en Indonésie : les distances, les transferts entre les îles, les différentes façons de se déplacer, les particularités de chaque région et les petits détails qui peuvent faire toute la différence une fois sur place.</p>
              <p><span className="font-semibold">C’est cette connaissance du terrain que je souhaite aujourd’hui mettre au service de vos voyages.</span> Je ne cherche pas à vous faire visiter « toute l’Indonésie ». Je cherche à construire <span className="font-semibold">la vôtre</span>.</p>
            </div>

            <div className="mt-8 xl:hidden">{destinations}</div>

            <div className="mt-10 w-fit bg-numa-black px-6 py-2 mx-auto ml-[30vw] md:ml-[40vw] xl:ml-0 xl:mx-0 xl:self-end">
              <h1 className={isWhiteBackground ?"font-cormorant text-[22px] font-bold sm:text-[30px] lg:text-[43px] text-numa-white" : "font-cormorant text-[22px] font-bold sm:text-[30px] lg:text-[43px]"}>
                Moi, c’est Aloïs !
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
