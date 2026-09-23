
import useDevice from "../../../hook/useDevice";

export default function SixthLayer() {
  const { islaptop, istouchpad } = useDevice();

  const steps = [
    {
      title: "Parlons de votre projet",
      description:
        "Un premier échange pour comprendre ce que vous recherchez : votre façon de voyager, vos envies, votre budget, vos contraintes et les expériences que vous aimeriez vivre en Indonésie.",
    },
    {
      title: "Je construis votre projet",
      description:
        "À partir de notre échange, je vous propose un projet personnalisé et une estimation du budget de votre voyage.",
    },
    {
      title: "Votre itinéraire prend forme",
      description:
        "Je construis votre parcours étape par étape, en réfléchissant aux temps de trajet, aux transferts et à l’équilibre entre découverte, repos et expériences.",
    },
    {
      title: "Je sélectionne les bonnes adresses",
      description:
        "Vols, hébergements, guides, activités et expériences : je recherche les options les plus adaptées à votre voyage.",
    },
    {
      title: "Vous recevez votre carnet de voyage",
      description:
        "Toutes vos informations sont regroupées dans un carnet personnalisé pour vous accompagner avant et pendant votre séjour.",
    },
    {
      title: "Je reste à vos côtés",
      description:
        "Une question avant le départ ? Un doute pendant le voyage ? Vous pouvez me contacter pour être accompagné tout au long de votre aventure.",
    },
  ];

  return (
    <section id="accompagnement" className="bg-numa-white text-center lg:min-h-screen px-4 py-5 pb-16">
      <h1 className="font-cormorant text-[40px] font-bold text-numa-red lg:text-[55px]">
        Votre voyage, étape par étape
      </h1>
      <div className="h-1 w-[30vw] bg-numa-red mx-auto mt-4 mb-6 lg:mb-10"></div>

      {!islaptop && !istouchpad && (
        <MobileCardLayout steps={steps} />
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

function MobileCardLayout({ steps }: { steps: { title: string; description: string }[] }) {


  return (
    <div className="w-full">
      <div className="overflow-hidden">
        <div
          className="hide-scrollbar overflow-x-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
           <div className="flex flex-nowrap w-max py-2">
            <div className="flex flex-nowrap gap-10 flex-none pr-10">
            {steps.map((s, i) => (
              <div key={i} className="flex-none">
                <TicketCard title={s.title} description={s.description} />
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
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
        className={`
          relative mx-auto
          bg-numa-black text-numa-white
          aspect-square
          md:w-full md:max-w-none
        `+ (title ? " w-[80vw] max-w-[360px] p-4 " : " w-[20vw] h-[40vh] p-8 ")}
      >
        <span className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-numa-white" />
        <span className="absolute -top-5 -right-5 h-10 w-10 rounded-full bg-numa-white" />
        <span className="absolute -bottom-5 -left-5 h-10 w-10 rounded-full bg-numa-white" />
        <span className="absolute -bottom-5 -right-5 h-10 w-10 rounded-full bg-numa-white" />

        <div className={"text-center h-full flex flex-col" + (title ? " justify-evenly " : " items-start  justify-center ")}>
            {title && (
                <div>
                  <div className="h-[56px] px-2 flex items-center justify-center pb-16 md:pb-24 h-[2.6em] pt-4">
                      <p className="font-poppins font-bold text-[22px] lg:text-[28px] xl:text-[22px] leading-tight">
                          {title}
                      </p>
                  </div>
                  <div className="h-1 w-[20vw] md:w-[5vw] bg-numa-white mx-auto "></div>
                </div>
            )}
          <p className={`font-cormorant text-[20px] md:text-[22px] lg:text-[26px] xl:text-[22px] leading-snug px-2 whitespace-pre-line md:text-justify`+ (title ? " h-[6em]" : "")}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
