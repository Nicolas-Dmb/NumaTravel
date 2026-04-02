import React, {useState} from 'react';
import FormResponse from '../model/formResponse';
import { useNavigate } from 'react-router-dom';
import sendForm from '../repositories/sendForm';

export default function useMeta(){
    const [formResponse, setFormResponse] = useState<FormResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function _ValidateFormData(formData: FormData): FormResponse | null {
        try{
            const formResponse = FormResponse.fromFormData(formData);
            setFormResponse(formResponse);
        }catch(error){
            if (error instanceof Error) {                
                setError(error.message);
                console.warn("Form submission failed:", error, "Form data:", Object.fromEntries(formData.entries()));
            }else{
                console.error("An unknown error occurred during form submission.");
                _errorNavigate();
            }
            return null;
        }
        return formResponse;
    }


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        setIsLoading(true);
        console.info("Form submitted, validating data...");
        const formData = new FormData(event.currentTarget);
        const formResponse = _ValidateFormData(formData);
        if(formResponse == null){
            setIsLoading(false);
            return;
        }
        try{
            const [status, message] = await sendForm(formResponse);
            if(status === 200){
                console.info("Form submission successful:", message);
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
        isLoading
    }
}