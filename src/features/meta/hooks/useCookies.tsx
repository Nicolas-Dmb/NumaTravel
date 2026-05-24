import { useState, useEffect, useRef } from 'react';
import { CookieConsent } from '../model/formResponse';
import { initMetaPixel } from './metaPixel';
import { trackEvent, TrackingEvent } from '../../../utils/tracking';

export default function useCookies() {
    const [showCookies, setShowCookies] = useState<CookieConsent>(
        (localStorage.getItem("cookieConsent") as CookieConsent) || CookieConsent.UNSET
    );
    const [displayModalCookies, setDisplayModalCookies] = useState(false);
    const pendingCallbackRef = useRef<((consent: CookieConsent) => void) | null>(null);

    useEffect(() => {
        if (showCookies === CookieConsent.ACCEPTED) {
            initMetaPixel(import.meta.env.VITE_META_PIXEL_ID);
        }
    }, [showCookies]);

    function requestConsent(callback: (consent: CookieConsent) => void) {
        pendingCallbackRef.current = callback;
        setDisplayModalCookies(true);
    }

    function handlePopupAccept() {
        setDisplayModalCookies(false);
        initMetaPixel(import.meta.env.VITE_META_PIXEL_ID);
        localStorage.setItem("cookieConsent", CookieConsent.ACCEPTED);
        setShowCookies(CookieConsent.ACCEPTED);
        trackEvent(TrackingEvent.COOKIES_ACCEPTED, { source: "popup" });

        const callback = pendingCallbackRef.current;
        pendingCallbackRef.current = null;
        callback?.(CookieConsent.ACCEPTED);
    }

    function handlePopupRefuse() {
        setDisplayModalCookies(false);
        localStorage.setItem("cookieConsent", CookieConsent.REFUSED);
        setShowCookies(CookieConsent.REFUSED);
        trackEvent(TrackingEvent.COOKIES_REFUSED, { source: "popup" });

        const callback = pendingCallbackRef.current;
        pendingCallbackRef.current = null;
        callback?.(CookieConsent.REFUSED);
    }

    function handleBannerAccept() {
        initMetaPixel(import.meta.env.VITE_META_PIXEL_ID);
        localStorage.setItem("cookieConsent", CookieConsent.ACCEPTED);
        setShowCookies(CookieConsent.ACCEPTED);
        trackEvent(TrackingEvent.COOKIES_ACCEPTED, { source: "banner" });
    }

    function handleBannerRefuse() {
        localStorage.setItem("cookieConsent", CookieConsent.REFUSED);
        setShowCookies(CookieConsent.REFUSED);
        trackEvent(TrackingEvent.COOKIES_REFUSED, { source: "banner" });
    }

    return {
        showCookies,
        displayModalCookies,
        handlePopupAccept,
        handlePopupRefuse,
        handleBannerAccept,
        handleBannerRefuse,
        requestConsent,
    };
}
