import ContactForm from '../features/meta/components/forms';
import { useEffect } from 'react';
import FourthLayer from '../features/home/components/fourthLayer';
import ThirdLayer from '../features/home/components/thirdLayer';
import SEO from '../components/SEO';

interface MetaContactProps {
    setMetaRoutes: (display: boolean) => void;
    error: string | null;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, phone: string | undefined) => void;
    isLoading: boolean;
}

export default function MetaContact({ setMetaRoutes, error, handleSubmit, isLoading }: MetaContactProps){

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
            <div className="min-h-[calc(100vh-4rem)] bg-numa-white pt-4 sm:pt-16">
                <ContactForm  error={error} handleSubmit={handleSubmit} isLoading={isLoading} />
                <ThirdLayer />
                <FourthLayer />
            </div>
        </main>
    </>
    );
}