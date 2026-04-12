

export const CookieConsent = {
  ACCEPTED: "accepted",
  REFUSED: "refused",
  UNSET: "unset",
} as const;

export type CookieConsent =
  typeof CookieConsent[keyof typeof CookieConsent];


export default class FormResponse {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    message: string;

    constructor( firstName: string, lastName: string, email: string, message: string, phone?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.message = message;
    }

    static fromFormData(formData: FormData): FormResponse {
        const data = Object.fromEntries(formData.entries());

        const firstName = String(data.firstName ?? "").trim();
        const lastName = String(data.lastName ?? "").trim();
        const email = String(data.email ?? "").trim();
        const message = String(data.message ?? "").trim();
        const phone = String(data.phone ?? "").trim();

        if (!lastName) throw new Error("Le nom est requis");
        if (!firstName) throw new Error("Le prénom est requis");
        if (!email) throw new Error("L'email est requis");
        if (!message) throw new Error("Le message est requis");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
            throw new Error("Format d'email invalide");
        }

        if (phone && !/^\+\d{6,15}$/.test(phone)) {
            throw new Error("Format de téléphone invalide");
        }

        const normalizedPhone = phone || undefined;

        return new FormResponse(
            firstName,
            lastName,
            email,
            message,
            normalizedPhone
        );
  }

    toJson(metaEventId: string | undefined): Record<string, string | undefined> {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            message: this.message,
            metaEventId: metaEventId
        }
    }
    
}
