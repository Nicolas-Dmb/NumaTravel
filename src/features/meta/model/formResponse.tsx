

export const CookieConsent = {
  ACCEPTED: "accepted",
  REFUSED: "refused",
  UNSET: "unset",
} as const;

export type CookieConsent =
  typeof CookieConsent[keyof typeof CookieConsent];

export class FistPageResponse {
    firstName: string;
    lastName: string;
    email: string
    phone?: string;

    constructor(firstName: string, lastName: string, email: string, phone?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }

    static fromFormData(formData: FormData): FistPageResponse {
        const data = Object.fromEntries(formData.entries());

        const firstName = String(data.firstName ?? "").trim();
        const lastName = String(data.lastName ?? "").trim();
        const email = String(data.email ?? "").trim();
        const phone = String(data.phone ?? "").trim();

        if (!lastName) throw new Error("Le nom est requis");
        if (!firstName) throw new Error("Le prénom est requis");
        if (!email) throw new Error("L'email est requis");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
            throw new Error("Format d'email invalide");
        }

        if (phone && !/^\+\d{6,15}$/.test(phone)) {
            throw new Error("Format de téléphone invalide");
        }

        const normalizedPhone = phone || undefined;

        return new FistPageResponse(
            firstName,
            lastName,
            email,
            normalizedPhone
        );
    }
}


export default class FormResponse {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    priceRange?: string;
    departureRange?: string;
    destination?: string;
    message: string;

    constructor( firstName: string, lastName: string, email: string, message: string, phone?: string, priceRange?: string, departureRange?: string, destination?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.priceRange = priceRange;
        this.departureRange = departureRange;
        this.destination = destination;
        this.message = message;
    }

    static fromFormData(formData: FormData, firstPageData: FistPageResponse): FormResponse {
        const data = Object.fromEntries(formData.entries());

        const message = String(data.message ?? "").trim();
        const priceRange = String(data.priceRange ?? "").trim();
        const departureRange = String(data.departureRange ?? "").trim();
        const destination = String(data.destination ?? "").trim();

        if (!priceRange) throw new Error("La fourchette de prix est requise");
        if (!departureRange) throw new Error("La période de départ est requise");
        if (!destination) throw new Error("La destination est requise");
        if (!message) throw new Error("Le message est requis");

        return new FormResponse(
            firstPageData.firstName,
            firstPageData.lastName,
            firstPageData.email,
            message,
            firstPageData.phone,
            priceRange,
            departureRange,
            destination
        );
  }

    toJson(metaEventId: string | undefined, fbp: string | undefined, fbc: string | undefined): Record<string, string | undefined> {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            message: this.message,
            priceRange: this.priceRange,
            metaEventId: metaEventId,
            departureRange: this.departureRange,
            destination: this.destination,
            fbp: fbp,
            fbc: fbc,
        }
    }
    
}
