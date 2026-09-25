import beachLayer2 from '../assets/beachLayer2.webp';

export default function SecondLayer(){
    return (
    <section className=" bg-numa-white text-numa-black">
        <div className="mx-auto flex w-full flex-col items-center justify-evenly gap-10 py-10 xl:flex-row">
            <div className="text-center">
                <h1 className="mb-4 font-cormorant font-bold text-[30px] md:text-[50px] lg:text-[55px] text-numa-red">
                    L’Indonésie autrement, pensée pour vous.
                </h1>
                <div className="mb-6 h-1 w-[20vw] mt-4 bg-numa-red mx-auto"></div>
                <p className="mb-0 px-5 md:px-0 md:mb-6 max-w-lg mx-auto font-poppins text-[12px] md:text-[18px]">
                    De Bali aux îles oubliées de Sumbawa, de la jungle de Sumatra aux
                    eaux de Raja Ampat, je conçois des voyages sur mesure en Indonésie,
                    adaptés à votre rythme, vos envies et votre budget.
                </p>
            </div>
            <div className="w-full lg:w-auto">
                <img
                    src={beachLayer2}
                    alt="photo d'une plage en Indonésie"
                    className="h-auto w-[40vw] lg:w-[35vw] mx-auto"
                    loading="lazy"
                    draggable={false}
                />
            </div>
        </div>
    </section>
    )
}