import ContactForm from '../features/meta/components/forms';
import { useEffect } from 'react';
import FourthLayer from '../features/home/components/fourthLayer';
import ThirdLayer from '../features/home/components/thirdLayer';
import { CookiesBanner, CookiesPopup } from '../features/meta/components/cookies';
import useForms from '../features/meta/hooks/useForms';
import { CookieConsent } from '../features/meta/model/formResponse';
import SEO from '../components/SEO';

interface MetaContactProps {
    setMetaRoutes: (display: boolean) => void;
}

export default function MetaContact({ setMetaRoutes }: MetaContactProps){
    const { error, handleSubmit, isLoading, displayModalCookies, handlePopupAccept, handlePopupRefuse, handleBannerAccept, handleBannerRefuse, showCookies} = useForms();


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
                {displayModalCookies && <CookiesPopup handlePopupAccept={handlePopupAccept} handlePopupRefuse={handlePopupRefuse} />}
                <ContactForm  error={error} handleSubmit={handleSubmit} isLoading={isLoading} />
                <ThirdLayer />
                <FourthLayer />
                {showCookies === CookieConsent.UNSET && !displayModalCookies && <CookiesBanner handleBannerAccept={handleBannerAccept} handleBannerRefuse={handleBannerRefuse} />}
            </div>
        </main>
    </>
    );
}