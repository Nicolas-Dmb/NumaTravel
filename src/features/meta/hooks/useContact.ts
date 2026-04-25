import { trackEvent, TrackingEvent } from "../../../utils/tracking";
import { ContactTypes, trackMetaContact } from "./metaPixel";

export const ContactLocation = {
    CONTACT_PAGE : "contact_page",
    CONTACT_MODAL : "contact_modal"
} as const;

export type ContactLocation = typeof ContactLocation[keyof typeof ContactLocation];

export default function useContact() {

    const phone = "https://wa.me/33659589733";
    const email = "mailto:numatravelplan@gmail.com?subject=Demande%20de%20contact%20NumaTravel";

    const handlePhoneClick = (source : ContactLocation) => {
        trackEvent(TrackingEvent.PHONE_CLICKED, {
            source: source,
        });
        trackMetaContact(ContactTypes.PHONE);
        window.open(phone, "_blank");
    }

    const handleEmailClick = (source : ContactLocation) => {
        trackEvent(TrackingEvent.EMAIL_CLICKED, {
        source: source,
        });
        trackMetaContact(ContactTypes.EMAIL);
        window.location.href = email;
    }

  return {
    handlePhoneClick,
    handleEmailClick,
  };
}