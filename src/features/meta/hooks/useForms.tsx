import React, { useState, useEffect, useRef} from 'react';
import FormResponse, { CookieConsent } from '../model/formResponse';
import { useNavigate } from 'react-router-dom';
import sendForm from '../repositories/sendForm';
import {trackMetaLead, initMetaPixel, generateMetaEventId} from "./metaPixel";


export default function useForms() {
    const [showCookies, setShowCookies] = useState<CookieConsent>(localStorage.getItem("cookieConsent") as CookieConsent || CookieConsent.UNSET);
    const [displayModalCookies, setDisplayModalCookies] = useState(false);
    const [pendingFormResponse, setPendingFormResponse] = useState<FormResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const hasSubmittedRef = useRef(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(showCookies === CookieConsent.ACCEPTED){
            initMetaPixel(import.meta.env.VITE_META_PIXEL_ID);
        }
    }, [showCookies]);

    function _validateFormData(formData: FormData): FormResponse | null {
        try {
            return FormResponse.fromFormData(formData);;
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                console.warn("Form submission failed:", error, "Form data:", Object.fromEntries(formData.entries()));
            } else {
                console.error("An unknown error occurred during form submission.");
                _errorNavigate();
            }
            return null;
        }
    }


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>, phone: string | undefined) {
        event.preventDefault();

        if (hasSubmittedRef.current) {
            console.warn("Form has already been submitted, ignoring duplicate submission.");
            return;
        }

        setIsLoading(true);

        
        console.info("Form submitted, validating data...");
        const formData = new FormData(event.currentTarget);
        if (phone) {
            formData.set("phone", phone);
        }
        const formResponse = _validateFormData(formData);
        if(formResponse == null){
            setIsLoading(false);
            return;
        }

        if(showCookies === CookieConsent.UNSET){
            setPendingFormResponse(formResponse);
            setDisplayModalCookies(true);
            setIsLoading(false);
            return;
        }

        sendFormData(formResponse, showCookies);

    } 

    function handlePopupAccept(){
        if (hasSubmittedRef.current) {
            console.warn("Form has already been submitted, ignoring duplicate submission.");
            return;
        }
        setIsLoading(true);
        setDisplayModalCookies(false);

        if (!pendingFormResponse) {
            setError("Désolé, une erreur est survenue lors de l'envoi du formulaire, veuillez réessayer.");
            return;
        }

        initMetaPixel(import.meta.env.VITE_META_PIXEL_ID);

        localStorage.setItem("cookieConsent", CookieConsent.ACCEPTED);
        setShowCookies(CookieConsent.ACCEPTED);

        sendFormData(pendingFormResponse, CookieConsent.ACCEPTED);
    }

    function handlePopupRefuse(){
        if (hasSubmittedRef.current) {
            console.warn("Form has already been submitted, ignoring duplicate submission.");
            return;
        }
        setIsLoading(true);
        setDisplayModalCookies(false);


        if (!pendingFormResponse) {
            setError("Désolé, une erreur est survenue lors de l'envoi du formulaire, veuillez réessayer.");
            return;
        }

        localStorage.setItem("cookieConsent", CookieConsent.REFUSED);
        setShowCookies(CookieConsent.REFUSED);

        sendFormData(pendingFormResponse, CookieConsent.REFUSED);
    }

    function handleBannerAccept(){
        initMetaPixel(import.meta.env.VITE_META_PIXEL_ID);
        localStorage.setItem("cookieConsent", CookieConsent.ACCEPTED);
        setShowCookies(CookieConsent.ACCEPTED);
    }

    function handleBannerRefuse(){
        localStorage.setItem("cookieConsent", CookieConsent.REFUSED);
        setShowCookies(CookieConsent.REFUSED);
    }

    async function sendFormData(formResponse: FormResponse, showCookiesResponse: CookieConsent){
        if (hasSubmittedRef.current) {
            console.warn("Form has already been submitted, ignoring duplicate submission.");
            return;
        }
        hasSubmittedRef.current = true;

        let metaEventId: string | undefined = undefined;
        if(showCookiesResponse === CookieConsent.ACCEPTED){
            metaEventId = generateMetaEventId();
        }
        try{
            const { status, message } = await sendForm(formResponse, metaEventId);
            if(status === 201){
                console.info("Form submission successful:", message);
                if (showCookiesResponse === CookieConsent.ACCEPTED && metaEventId) {
                    trackMetaLead(metaEventId);
                }
                navigate("/meta-contact/success");
            }else{
                console.error("Form submission failed with status:", status, "and message:", message);
                _errorNavigate();
            }
        }catch(error){
            console.error("An error occurred while sending the form:", error);
            _errorNavigate();
        }finally{
            hasSubmittedRef.current = false;
            setIsLoading(false);
            setPendingFormResponse(null);
        }
    }

    function _errorNavigate(){
        setError("Désolé, une erreur est survenue lors de l'envoi du formulaire. Vous allez être redirigé vers une page de contact");
        setTimeout(() => {
            navigate("/contact");
        }, 3000);
    }

    
    return {
        error, 
        handleSubmit,
        isLoading,
        displayModalCookies,
        handlePopupAccept,
        handlePopupRefuse,
        handleBannerAccept,
        handleBannerRefuse,
        showCookies,
    }
}