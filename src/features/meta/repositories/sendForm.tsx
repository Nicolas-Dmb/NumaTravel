import FormResponse from "../model/formResponse";

export default function sendForm(formResponse: FormResponse): Promise<[number, string]> {
    // TODO : add api url in .env file
    // const response = fetch("", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(formResponse)
    // });

    // return response;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([200, "Form sent successfully"]);
        }, 1000);
    });
}