
import useDevice from "../hook/useDevice";

export default function SixthLayer() {
  const { islaptop, istouchpad } = useDevice();

  const steps = [
    {
      title: "Premier échange",
      description:
        "Un appel téléphonique ou en visio pour comprendre vos envies, vos attentes, votre budget et votre façon de voyager.",
    },
    {
      title: "Analyse et devis personnalisé",
      description:
        "Suite à notre échange, je vous envoie un devis personnalisé, une estimation budgétaire et une brochure d’activités phares de la destination.",
    },
    {
      title: "Conception de l’itinéraire",
      description:
        "Création d’un itinéraire sur mesure incluant les grandes étapes du voyage et les recommandations principales.",
    },
    {
      title: "Sélection des vols et hébergements",
      description:
        "Recherche et conseils pour les vols et les logements les plus adaptés à votre itinéraire et à vos critères.",
    },
    {
      title: "Recommandation des activités & carnet de voyage",
      description:
        "Suggestions d’activités et d’expériences, puis création d’un carnet de voyage personnalisé regroupant toutes les informations utiles.",
    },
    {
      title: "Suivi avant et pendant le voyage",
      description:
        "Accompagnement jusqu’au départ et assistance pendant votre séjour pour vous permettre de voyager en toute sérénité.",
    },
  ];

  return (
    <section className="bg-numa-white text-center lg:min-h-screen px-4 py-5">
      <h1 className="mb-6 font-cormorant text-[40px] font-bold text-numa-red lg:text-[55px]">
        Les étapes du processus
      </h1>

      {!islaptop && !istouchpad && (
        <div className="flex gap-10 overflow-x-auto snap-x snap-mandatory pb-4 [-webkit-overflow-scrolling:touch] pl-3">
          {steps.map((s) => (
            <div key={s.title} className="snap-center shrink-0">
              <TicketCard title={s.title} description={s.description} />
            </div>
          ))}
        </div>
      )}

      {istouchpad && (
        <div className="mx-auto max-w-5xl grid grid-cols-2 gap-6">
          {steps.map((s) => (
            <TicketCard key={s.title} title={s.title} description={s.description} />
          ))}
        </div>
      )}

      {islaptop && (
        <div className="mx-auto max-w-6xl grid grid-cols-3 gap-8">
          {steps.map((s) => (
            <TicketCard key={s.title} title={s.title} description={s.description} />
          ))}
        </div>
      )}
    </section>
  );
}


interface PropsCard{
    title: string|null;
    description: string;
}

export function TicketCard({ title, description }: PropsCard) {
  return (
    <div className="pb-6 lg:pb-0">
      <div
        className="
          relative mx-auto
          bg-numa-black text-numa-white p-4
          w-[80vw] max-w-[360px] aspect-square
          md:w-full md:max-w-none
        "
      >
        <span className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-numa-white" />
        <span className="absolute -top-5 -right-5 h-10 w-10 rounded-full bg-numa-white" />
        <span className="absolute -bottom-5 -left-5 h-10 w-10 rounded-full bg-numa-white" />
        <span className="absolute -bottom-5 -right-5 h-10 w-10 rounded-full bg-numa-white" />

        <div className={"text-center space-y-3 h-full flex flex-col pt-8" + (title ? " justify-center" : " items-start justify-center")}>
            {title && (
                <div className="h-[56px] md:h-[64px] px-2 flex items-start justify-center pb-24">
                    <p className="font-poppins font-bold text-[22px] lg:text-[28px] leading-tight">
                        {title}
                    </p>
                </div>
            )}

          <p className="font-cormorant text-[20px] md:text-[22px] lg:text-[26px] leading-snug px-2 whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
