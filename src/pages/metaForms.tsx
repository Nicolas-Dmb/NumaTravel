import ContactForm from '../features/meta/components/forms';
import { useEffect } from 'react';
import FourthLayer from '../features/home/components/fourthLayer';
import ThirdLayer from '../features/home/components/thirdLayer';
import SEO from '../components/SEO';
import MetaHeader from '../components/meta_header';
import type { FistPageResponse } from '../features/meta/model/formResponse';

interface MetaContactProps {
    setMetaRoutes: (display: boolean) => void;
    error: string | null;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, phone: string | undefined, firstPageData: FistPageResponse) => void;
    isLoading: boolean;
    validateFistPageFormData: (formData: FormData) => FistPageResponse | null;
}

export default function MetaContact({ setMetaRoutes, error, handleSubmit, isLoading, validateFistPageFormData }: MetaContactProps){

    useEffect(() => {
        setMetaRoutes(true);
    }, [setMetaRoutes]);


    return (
    <>
        <SEO 
        title="Meta Contact – Numa Travel | Travel planner"
        description="Contactez Numa Travel pour échanger sur votre projet de voyage et créer un itinéraire personnalisé, clé en main."
        canonicalPath="/meta-contact"
        />
        <main>
            <MetaHeader />
            <div className="min-h-[calc(100vh-4rem)] bg-numa-white">
                <div className="bg-numa-black text-numa-white font-cormorant text-center py-16 px-4">
                    <h1 className="text-[22px] font-bold sm:text-[30px] lg:text-[30px] pt-5 lg:px-40 xl:px-72">
                        Travel Planner indépendant. Je conçois des voyages sur mesure — itinéraire, vols, logements, expériences locales — pour celles et ceux qui veulent un voyage vraiment unique.
                    </h1>
                </div>
                <FourthLayer isWhiteBackground={true} />
                <ThirdLayer />
                <div className="mx-auto my-10 md:my-[7.5rem]">
                    <section id="meta-form">
                        <ContactForm error={error} handleSubmit={handleSubmit} isLoading={isLoading} validateFistPageFormData={validateFistPageFormData} />
                    </section>
                </div>
            </div>
        </main>
    </>
    );
}