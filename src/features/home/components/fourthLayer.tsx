import beautiful_lolo from '../assets/beautiful_lolo.png'

export default function FourthLayer() {
  return (
    <section className="bg-numa-red text-numa-white xl:min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-12 xl:py-0">
        <div className="flex flex-col gap-10 xl:min-h-screen xl:flex-row xl:items-stretch xl:gap-16">

          <div className="xl:flex xl:flex-col xl:justify-start">
            <img
              src={beautiful_lolo}
              alt="Photo de moi en voyage"
              className="mx-auto h-auto w-[80vw] max-w-md object-cover xl:h-[90vh] xl:w-auto xl:max-w-none"
            />
          </div>

          <div className="flex w-full max-w-xl flex-col text-center xl:text-left xl:py-16 xl:justify-between">
            <div className="space-y-6 font-poppins text-[15px] leading-relaxed sm:text-[18px] lg:text-[19px] lg:leading-[1.8]">
              <p>Le voyage a toujours occupé une place importante dans ma vie, autant pour la découverte que pour les expériences humaines qu’il permet. J’ai eu la chance de voyager dès mon plus jeune âge et, au fil des années, j’ai pu mettre un pied dans près de 20 pays, chacun m’apportant une vision différente du monde et des cultures.</p>
              <p>Aujourd’hui, j’accompagne des voyageurs qui souhaitent partir l’esprit léger, en les aidant à structurer leurs idées et à donner forme à leur projet de voyage.</p>
              <p>J’aime concevoir des itinéraires réfléchis, cohérents et adaptés à chaque personne, en prenant en compte les envies, le rythme et la façon de voyager de chacun.</p>
              <p>Mon approche est basée sur l’écoute, la personnalisation et la simplicité, afin de proposer des voyages qui ont du sens et qui vous ressemblent.</p>
            </div>

            <div className="mt-10 w-fit bg-numa-black px-6 py-2 mx-auto xl:mx-0 xl:self-end">
              <h1 className="font-cormorant text-[22px] font-bold sm:text-[30px] lg:text-[43px]">
                Moi, c’est Aloïs !
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
