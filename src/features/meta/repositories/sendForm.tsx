import FormResponse from "../model/formResponse";

export default async function sendForm(formResponse: FormResponse, metaEventId: string|undefined): Promise<{ status: number; message: string }> {
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/submit_form`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formResponse.toJson(metaEventId))
    });
    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    return { status: response.status, message: data.message };  
}