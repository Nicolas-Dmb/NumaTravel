import React, { useState, useRef } from 'react';
import FormResponse, { CookieConsent, FistPageResponse } from '../model/formResponse';
import sendForm from '../repositories/sendForm';
import { trackMetaLead, generateMetaEventId, getMetaBrowserData } from "./metaPixel";
import { useNavigate } from 'react-router-dom';
import { trackEvent, TrackingEvent } from '../../../utils/tracking';

type UseFormsArgs = {
    showCookies: CookieConsent;
    requestConsent: (callback: (consent: CookieConsent) => void) => void;
};

export default function useForms({ showCookies, requestConsent }: UseFormsArgs) {
    const [displayContactModal, setDisplayContactModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const hasSubmittedRef = useRef(false);
    const navigate = useNavigate();

    function validateFistPageFormData(formData: FormData): FistPageResponse | null {
        try {
            return FistPageResponse.fromFormData(formData);
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

    function _validateFormData(formData: FormData, firstPageData: FistPageResponse): FormResponse | null {
        try {
            return FormResponse.fromFormData(formData, firstPageData);
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

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>, phone: string | undefined, firstPageData: FistPageResponse) {
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
        const formResponse = _validateFormData(formData, firstPageData);
        if(formResponse == null){
            setIsLoading(false);
            return;
        }
        setError(null);

        if(showCookies === CookieConsent.UNSET){
            setIsLoading(false);
            requestConsent((consent) => {
                setIsLoading(true);
                sendFormData(formResponse, consent);
            });
            return;
        }

        sendFormData(formResponse, showCookies);
    }

    async function sendFormData(formResponse: FormResponse, showCookiesResponse: CookieConsent){
        if (hasSubmittedRef.current) {
            console.warn("Form has already been submitted, ignoring duplicate submission.");
            return;
        }
        hasSubmittedRef.current = true;

        let metaEventId: string | undefined = undefined;
        let fbp: string | undefined = undefined;
        let fbc: string | undefined = undefined;
        if(showCookiesResponse === CookieConsent.ACCEPTED){
            metaEventId = generateMetaEventId();

            const metaBrowserData = getMetaBrowserData();
            fbp = metaBrowserData.fbp;
            fbc = metaBrowserData.fbc;
        }
        try{
            const { status, message } = await sendForm(formResponse, metaEventId, fbp, fbc);
            if(status === 201){
                console.info("Form submission successful:", message);
                if (showCookiesResponse === CookieConsent.ACCEPTED && metaEventId) {
                    trackMetaLead(metaEventId);
                }
                trackEvent(TrackingEvent.FORM_SUBMITTED);
                navigate("/meta-contact/success");
            }else{
                console.error(`Unexpected response status: ${status} ${error} Form response: firstName=${formResponse.firstName}, lastName=${formResponse.lastName}, email=${formResponse.email}, phone=${formResponse.phone}, message=${formResponse.message}`);
                _errorNavigate();
                trackEvent(TrackingEvent.FORM_ERROR, {
                    email: formResponse.email,
                });
            }
        }catch(error){
            console.error(`An error occurred while sending the form: ${error} Form response: firstName=${formResponse.firstName}, lastName=${formResponse.lastName}, email=${formResponse.email}, phone=${formResponse.phone}, message=${formResponse.message}`);
            _errorNavigate();
            trackEvent(TrackingEvent.FORM_ERROR, {
                email: formResponse.email,
            });
        }finally{
            hasSubmittedRef.current = false;
            setIsLoading(false);
        }
    }

    function _errorNavigate(){
        navigate("/contact");
        setDisplayContactModal(true);
    }


    return {
        error,
        handleSubmit,
        isLoading,
        displayContactModal,
        setDisplayContactModal,
        validateFistPageFormData,
    };
}
