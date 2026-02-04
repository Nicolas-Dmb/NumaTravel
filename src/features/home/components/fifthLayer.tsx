import travelPlan from "../assets/travelPlan.webp";
import { TicketCard } from "./sixthLayer.tsx";

export default function FifthLayer() {

  const text = `Un travel planner est un professionnel du voyage spécialisé dans la création d’expériences sur mesure. Son rôle est d’écouter vos envies, de vous conseiller et de concevoir un itinéraire personnalisé, qui correspond à votre style, votre budget et votre rythme.`;
  const text2 =
    "Contrairement à une agence de voyage, un travel planner ne réserve pas et ne paye pas pour vous : son rôle est purement conseil et accompagnement, afin que vous restiez libre dans vos choix et votre organisation.";

  return (
    <section className="bg-numa-white text-center xl:min-h-screen pt-10 pb-10 xl:pb-0">
      <h1 className="font-cormorant text-[40px] font-bold text-numa-red lg:text-[55px] px-4">
        Qu’est-ce qu’un travel planner ?
      </h1>
      <div className="mb-6 h-1 w-[30vw] bg-numa-red mx-auto mt-4 mb-6 lg:mb-10"></div>

      <div className="hidden xl:grid w-full grid-cols-[1fr_1fr_220px] grid-rows-2 gap-5 items-stretch">
        <div className="row-start-1 col-start-1 flex justify-end">
          <div className="w-full max-w-xl pl-8">
            <TicketCard title={null} description={text} />
          </div>
        </div>

        <div className="row-start-2 col-start-2 flex justify-start relative z-10 -translate-y-24">
          <div className="w-full max-w-xl pr-8">
            <TicketCard title={null} description={text2} />
          </div>
        </div>

        <div className="row-span-2 col-start-3">
          <img
            src={travelPlan}
            alt="Bord de mer avec des transats, un parasol et des cocotiers"
            className="h-full w-full object-cover pb-10"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>

      <div className="xl:hidden px-4 max-w-4xl mx-auto">
        <p className="font-poppins text-[14px] sm:text-[16px] leading-relaxed text-numa-black whitespace-pre-line">
          {text + "\n\n" + text2}
        </p>
      </div>
    </section>
  );
}
