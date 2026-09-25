
import useDevice from "../../../hook/useDevice";

export default function SixthLayer() {
  const { islaptop, istouchpad } = useDevice();
  const isMobile = !islaptop && !istouchpad;

  const steps = [
    {
      title: "On échange",
      description:
        "Un premier appel pour cerner votre projet et votre façon de voyager. J’en ressors une direction et un budget estimé.",
    },
    {
      title: "Je construis votre voyage",
      description:
        "Itinéraire étape par étape, transferts entre les îles, sélection des vols, des hébergements et des adresses. Vous validez au fur et à mesure.",
    },
    {
      title: "Vous partez, je reste joignable",
      description:
        "Vous recevez votre carnet de voyage personnalisé, et vous pouvez me contacter avant le départ comme pendant le séjour.",
    },
  ];

  return (
    <section id="accompagnement" className="bg-numa-white text-center px-4 py-5 pb-16">
      <h1 className="font-cormorant text-[40px] font-bold text-numa-red lg:text-[55px]">
        Votre voyage, étape par étape
      </h1>
      <div className="h-1 w-[30vw] bg-numa-red mx-auto mt-4 mb-6 lg:mb-10"></div>

      {isMobile ? <MobileCardLayout steps={steps} /> : <StepsList steps={steps} />}
    </section>
  );
}

function StepsList({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <div className="mx-auto max-w-6xl flex flex-col divide-y divide-numa-black/20 lg:flex-row lg:divide-y-0 lg:divide-x">
      {steps.map((s, i) => (
        <div key={s.title} className="flex-1 px-8 py-8 lg:py-2">
          <p className="font-poppins text-[26px] font-bold text-numa-red">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-1 font-cormorant text-[24px] font-bold leading-tight text-numa-black lg:min-h-[2.5em] lg:text-[26px]">
            {s.title}
          </h2>
          <p className="mt-3 font-poppins text-[15px] leading-relaxed text-numa-black lg:text-[16px]">
            {s.description}
          </p>
        </div>
      ))}
    </div>
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
          md:w-full md:max-w-none
        `+ (title ? " aspect-square w-[80vw] max-w-[360px] p-4 " : " w-[20vw] p-6 ")}
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
          <p className={`font-cormorant leading-snug px-2 whitespace-pre-line md:text-justify `+ (title ? "text-[20px] md:text-[22px] lg:text-[26px] xl:text-[22px] h-[6em]" : "text-[18px] xl:text-[18px]")}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
