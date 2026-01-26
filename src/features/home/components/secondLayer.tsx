import beachLayer2 from '../assets/beachLayer2.png';

export default function SecondLayer(){
    return (
    <section className=" bg-numa-white text-numa-black">
        <div className="mx-auto flex w-full flex-col items-center justify-evenly gap-10 py-10 xl:flex-row">
            <div className="text-center">
                <h1 className="mb-4 font-cormorant font-bold text-[30px] md:text-[50px] lg:text-[55px] text-numa-red">
                    Chaque voyage est unique
                </h1>
                <div className="mb-6 h-1 w-[20vw] mt-4 bg-numa-red mx-auto"></div>
                <p className="mb-0 md:mb-6 max-w-lg font-poppins text-[12px] md:text-[18px]">
                    Je vous aide à transformer vos envies en aventures sur mesure, sans
                    stress, avec des itinéraires pensés pour vous, vos goûts et votre
                    rythme. Profitez de chaque instant, je m’occupe du reste.
                </p>
            </div>
            <div className="w-full lg:w-auto">
                <img
                    src={beachLayer2}
                    alt="Beach Layer 2"
                    className="h-auto w-[40vw] lg:w-[35vw] mx-auto"
                />
            </div>
        </div>
    </section>
    )
}