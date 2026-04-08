import React, { useState, useEffect} from 'react';
import FormResponse, { CookieConsent } from '../model/formResponse';
import { useNavigate } from 'react-router-dom';
import sendForm from '../repositories/sendForm';
import {trackMetaLead, initMetaPixel} from "./metaPixel";


export default function useForms() {
    const [showCookies, setShowCookies] = useState<CookieConsent>(localStorage.getItem("cookieConsent") as CookieConsent || CookieConsent.UNSET);
    const [displayModalCookies, setDisplayModalCookies] = useState(false);
    const [pendingFormResponse, setPendingFormResponse] = useState<FormResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
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


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        setIsLoading(true);

        
        console.info("Form submitted, validating data...");
        const formData = new FormData(event.currentTarget);
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
        try{
            const { status, message } = await sendForm(formResponse);
            if(status === 201){
                console.info("Form submission successful:", message);
                if (showCookiesResponse === CookieConsent.ACCEPTED){
                    trackMetaLead();
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