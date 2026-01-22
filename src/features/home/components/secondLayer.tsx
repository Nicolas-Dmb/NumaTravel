import beachLayer2 from '../assets/beachLayer2.png';

export default function SecondLayer(){
    return (
    <section className="xl:min-h-screen bg-numa-white text-numa-black">
        <div className="mx-auto flex xl:min-h-screen w-full flex-col items-center justify-evenly gap-10 py-10 xl:flex-row">
            <div className="text-center">
                <h1 className="mb-4 font-cormorant font-bold text-[50px] lg:text-[55px] text-numa-red">
                    Chaque voyage est unique
                </h1>

                <p className="mb-6 max-w-lg font-poppins text-[18px]">
                    Je vous aide à transformer vos envies en aventures sur mesure, sans
                    stress, avec des itinéraires pensés pour vous, vos goûts et votre
                    rythme. Profitez de chaque instant, je m’occupe du reste.
                </p>
            </div>
            <div className="w-full lg:w-auto">
                <img
                    src={beachLayer2}
                    alt="Beach Layer 2"
                    className="h-auto w-[90vw] lg:w-[40vw] mx-auto"
                />
            </div>
        </div>
    </section>
    )
}