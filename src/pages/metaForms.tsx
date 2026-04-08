import ContactForm from '../features/meta/components/forms';
import { useEffect } from 'react';
import FourthLayer from '../features/home/components/fourthLayer';
import ThirdLayer from '../features/home/components/thirdLayer';
import { CookiesBanner, CookiesPopup } from '../features/meta/components/cookies';
import useForms from '../features/meta/hooks/useForms';
import { CookieConsent } from '../features/meta/model/formResponse';

interface MetaContactProps {
    setMetaRoutes: (display: boolean) => void;
}

export default function MetaContact({ setMetaRoutes }: MetaContactProps){
    const { error, handleSubmit, isLoading, displayModalCookies, handlePopupAccept, handlePopupRefuse, handleBannerAccept, handleBannerRefuse, showCookies} = useForms();


    useEffect(() => {
        setMetaRoutes(true);
    }, [setMetaRoutes]);


    return <main>
        <div className="min-h-[calc(100vh-4rem)] bg-numa-white pt-4 sm:pt-16">
            {displayModalCookies && <CookiesPopup handlePopupAccept={handlePopupAccept} handlePopupRefuse={handlePopupRefuse} />}
            <ContactForm  error={error} handleSubmit={handleSubmit} isLoading={isLoading} />
            <ThirdLayer />
            <FourthLayer />
            {showCookies === CookieConsent.UNSET && <CookiesBanner handleBannerAccept={handleBannerAccept} handleBannerRefuse={handleBannerRefuse} />}
        </div>
    </main>
}