import travelPlan from "../assets/travelPlan.webp";
import { TicketCard } from "./sixthLayer.tsx";

export default function FifthLayer() {

  const text = `Organiser un voyage en Indonésie peut rapidement devenir un véritable casse-tête : des milliers d’îles, des transports parfois complexes, des temps de trajet difficiles à anticiper et une multitude d’hébergements et d’activités à comparer. Mon rôle est de vous faire gagner du temps et de vous éviter les mauvaises surprises, grâce à une connaissance concrète de la destination.`;
  const text2 =
    "La différence avec une agence de voyage ? Vous réservez et payez directement vos prestations. Je ne réserve pas à votre place : je vous conseille, recherche et sélectionne les meilleures options pour votre projet, puis je rassemble toutes les informations dans un carnet de voyage personnalisé.";

  return (
    <section className="bg-numa-white text-center pt-10 pb-10 xl:pb-0">
      <h1 className="font-cormorant text-[40px] font-bold text-numa-red lg:text-[55px] px-4">
        Pourquoi faire appel à Numa Travel ?
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
            className="h-full w-full object-cover"
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
