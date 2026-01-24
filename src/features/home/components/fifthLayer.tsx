import indonesia_kayak from "../assets/indonesia_kayak.png";
import useDevice from "../hook/useDevice";
import {TicketCard} from './sixthLayer.tsx';

export default function FifthLayer() {
  const { islaptop } = useDevice();

  const text = `Un travel planner est un professionnel du voyage spécialisé dans la création d’expériences sur mesure. Son rôle est d’écouter vos envies, de vous conseiller et de concevoir un itinéraire personnalisé, qui correspond à votre style, votre budget et votre rythme.
              \n            
              Contrairement à une agence de voyage, un travel planner ne réserve pas et ne paye pas pour vous : son rôle est purement conseil et accompagnement, afin que vous restiez libre dans vos choix et votre organisation.`;

  return (
    <section className="bg-numa-white text-center xl:min-h-screen px-4 py-10">
      <h1 className="mb-6 lg:mb-10 font-cormorant text-[40px] font-bold text-numa-red lg:text-[55px]">
        Qu’est-ce qu’un travel planner ?
      </h1>

      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-stretch">
        <div className="relative w-full max-w-2xl mx-auto lg:aspect-square">
          {islaptop ? <TicketCard title={null} description={text} /> :
          <div className="relative z-10 flex h-full items-center justify-center px-6 sm:px-10 lg:px-16 py-10">
            <p
              className={`font-poppins text-[14px] leading-relaxed lg:text-[20px] whitespace-pre-line ${
                islaptop ? "text-numa-white" : "text-numa-black"
              }`}
            >
              {text}
            </p>
          </div>}
        </div>

        <img
          src={indonesia_kayak}
          alt="Indonesia Kayak"
          className="hidden lg:block h-full w-full object-cover rounded-2xl"
        />
      </div>
    </section>
  );
}
