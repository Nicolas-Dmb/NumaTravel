import ContactForm from '../features/meta/components/forms';
import { useEffect, useRef, useState } from 'react';
import FourthLayer from '../features/home/components/fourthLayer';
import ThirdLayer from '../features/home/components/thirdLayer';
import SEO from '../components/SEO';
import { scrollToHash } from '../utils/scrollToHash';
import type { FistPageResponse } from '../features/meta/model/formResponse';

interface MetaContactProps {
    setMetaRoutes: (display: boolean) => void;
    error: string | null;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, phone: string | undefined, firstPageData: FistPageResponse) => void;
    isLoading: boolean;
    validateFistPageFormData: (formData: FormData) => FistPageResponse | null;
}

export default function MetaContact({ setMetaRoutes, error, handleSubmit, isLoading, validateFistPageFormData }: MetaContactProps){
    const formRef = useRef<HTMLElement>(null);
    const [showCta, setShowCta] = useState(true);

    useEffect(() => {
        setMetaRoutes(true);
    }, [setMetaRoutes]);

    useEffect(() => {
        const el = formRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setShowCta(!entry.isIntersecting),
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
    <>
        <SEO
        title="Meta Contact – Numa Travel | Travel planner"
        description="Contactez Numa Travel pour échanger sur votre projet de voyage et créer un itinéraire personnalisé, clé en main."
        canonicalPath="/meta-contact"
        />
        <main>
            <button
                type="button"
                onClick={() => scrollToHash("#meta-form")}
                aria-hidden={!showCta}
                tabIndex={showCta ? 0 : -1}
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-2 rounded-full bg-[#ebe6e2cc] backdrop-blur-sm shadow-lg text-numa-red font-cormorant font-bold text-[18px] sm:text-[22px] transition-all duration-300 hover:scale-105 ${showCta ? 'opacity-100' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
            >
                ME CONTACTER
            </button>
            <div className="min-h-screen bg-numa-white">
                <div className="bg-numa-black text-numa-white font-cormorant text-center py-16 px-4">
                    <h1 className="text-[22px] font-bold sm:text-[30px] lg:text-[30px] pt-5 lg:px-40 xl:px-72">
                        Travel Planner indépendant. Je conçois des voyages sur mesure — itinéraire, vols, logements, expériences locales — pour celles et ceux qui veulent un voyage vraiment unique.
                    </h1>
                </div>
                <FourthLayer isWhiteBackground={true} />
                <ThirdLayer />
                <div className="mx-auto my-10 md:my-[7.5rem]">
                    <section ref={formRef} id="meta-form">
                        <ContactForm error={error} handleSubmit={handleSubmit} isLoading={isLoading} validateFistPageFormData={validateFistPageFormData} />
                    </section>
                </div>
            </div>
        </main>
    </>
    );
}