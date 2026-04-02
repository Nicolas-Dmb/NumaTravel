
export default class FormResponse {
    firstName: string;
    secondName: string;
    email: string;
    phone?: string;
    message: string;

    constructor( firstName: string, secondName: string, email: string, message: string, phone?: string) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
        this.phone = phone;
        this.message = message;
    }

    static fromFormData(formData: FormData): FormResponse {
        const data = Object.fromEntries(formData.entries());

        const firstName = String(data.firstName ?? "").trim();
        const secondName = String(data.secondName ?? "").trim();
        const email = String(data.email ?? "").trim();
        const message = String(data.message ?? "").trim();
        const phone = String(data.phone ?? "").trim();

        if (!secondName) throw new Error("Le nom est requis");
        if (!firstName) throw new Error("Le prénom est requis");
        if (!email) throw new Error("L'email est requis");
        if (!message) throw new Error("Le message est requis");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        throw new Error("Format d'email invalide");
        }

        const normalizedPhone = phone || undefined;

        return new FormResponse(
        firstName,
        secondName,
        email,
        message,
        normalizedPhone
        );
  }

    toJson(): Record<string, string | undefined> {
        return {
            firstName: this.firstName,
            secondName: this.secondName,
            email: this.email,
            phone: this.phone,
            message: this.message
        }
    }
    
}
