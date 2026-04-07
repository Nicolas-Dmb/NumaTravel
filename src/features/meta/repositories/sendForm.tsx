import FormResponse from "../model/formResponse";

export default async function sendForm(formResponse: FormResponse): Promise<{ status: number; message: string }> {
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/submit_form`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formResponse)
    });
    if (!response.status || response.status !== 201) {
        throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();;
}