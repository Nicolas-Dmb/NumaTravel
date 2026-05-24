import { useRef, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { trackEvent, TrackingEvent } from "../../../utils/tracking";
import type { FistPageResponse } from "../model/formResponse";

interface ContactFormProps {
  error: string | null;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, phone: string | undefined, firstPageData: FistPageResponse) => void;
  isLoading: boolean;
  validateFistPageFormData: (formData: FormData) => FistPageResponse | null;
}

export default function ContactForm({
  error,
  handleSubmit,
  isLoading,
  validateFistPageFormData
}: ContactFormProps) {
  const [phone, setPhone] = useState<string | undefined>();
  const [firstPageData, setFirstPageData] = useState<FistPageResponse | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const formRef = useRef<HTMLFormElement>(null);

  const hasUserInteracted = () => {
    if (hasInteracted) return;
    setHasInteracted(true);
    trackEvent(TrackingEvent.FORM_STARTED);
  };

  const goToSecondPage = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    if (phone) {
      formData.set("phone", phone);
    }
    const validated = validateFistPageFormData(formData);
    if (validated) {
      setFirstPageData(validated);
      setCurrentPage(2);
    }
  };

  const goBack = () => {
    setCurrentPage(1);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!firstPageData) {
      event.preventDefault();
      return;
    }
    handleSubmit(event, phone, firstPageData);
  };

  return (
    <div className="flex flex-col justify-center font-poppins text-numa-black px-4 pb-16 w-full max-w-2xl mx-auto">
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="rounded-2xl shadow-md p-6 flex flex-col gap-5 bg-white"
      >
        <h2 className="text-xl font-semibold text-center">
          Parlez-moi de votre projet, de vos envies ou posez-moi vos questions !
        </h2>

        <div className={currentPage === 1 ? "flex flex-col gap-5" : "hidden"}>
          <FirstPage phone={phone} setPhone={setPhone} hasUserInteracted={hasUserInteracted} />
        </div>

        <div className={currentPage === 2 ? "flex flex-col gap-5" : "hidden"}>
          <SecondPage hasUserInteracted={hasUserInteracted} />
        </div>

        {currentPage === 1 ? (
          <button
            type="button"
            onClick={goToSecondPage}
            className="bg-numa-black text-white rounded-lg py-3 flex items-center justify-center gap-2"
          >
            Suivant
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={goBack}
              className="flex-1 border border-numa-black text-numa-black rounded-lg py-3"
            >
              Retour
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-numa-black text-white rounded-lg py-3 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {isLoading ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        )}
      </form>

      {error && <p className="text-numa-red text-center mt-4">{error}</p>}
    </div>
  );
}

interface FirstPageProps {
  phone: string | undefined;
  setPhone: (phone: string | undefined) => void;
  hasUserInteracted: () => void;
}

function FirstPage({ phone, setPhone, hasUserInteracted }: FirstPageProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <label className="text-sm mb-1">Nom</label>
          <input
            onChange={() => hasUserInteracted()}
            type="text"
            name="lastName"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-numa-black transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Prénom</label>
          <input
            onChange={() => hasUserInteracted()}
            type="text"
            name="firstName"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-numa-black transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <label className="text-sm mb-1">Email</label>
          <input
            onChange={() => hasUserInteracted()}
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-numa-black transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Téléphone (optionnel)</label>
          <div className="border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-numa-black transition">
            <PhoneInput
              international
              defaultCountry="FR"
              value={phone}
              onChange={(value) => {
                setPhone(value);
                hasUserInteracted();
              }}
              className="phone-input"
            />
          </div>
        </div>
      </div>
    </>
  );
}

const DEPARTURE_OPTIONS = [
  "Dans les 3 mois",
  "Dans 3 à 6 mois",
  "Dans 6 à 12 mois",
  "Plus tard (1 an+)",
];

const BUDGET_OPTIONS = [
  "Moins de 3 000€",
  "Entre 3 000€ et 5 000€",
  "Entre 5 000€ et 8 000€",
  "Plus de 8 000€",
];

function SecondPage({ hasUserInteracted }: { hasUserInteracted: () => void }) {
  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm mb-1">Quelle destination vous fait rêver ?</label>
        <input
          onChange={() => hasUserInteracted()}
          type="text"
          name="destination"
          required
          placeholder="Ex : Japon, Amérique du Sud, Indonésie, pas encore décidé..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-numa-black transition"
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm mb-2">Quand souhaitez-vous partir ?</legend>
        {DEPARTURE_OPTIONS.map((option, index) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input
              onChange={() => hasUserInteracted()}
              type="radio"
              name="departureRange"
              value={option}
              required={index === 0}
              className="accent-numa-black"
            />
            <span>{option}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm mb-2">Budget approximatif pour le voyage (hors honoraires) ?</legend>
        {BUDGET_OPTIONS.map((option, index) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input
              onChange={() => hasUserInteracted()}
              type="radio"
              name="priceRange"
              value={option}
              required={index === 0}
              className="accent-numa-black"
            />
            <span>{option}</span>
          </label>
        ))}
      </fieldset>

      <div className="flex flex-col">
        <label className="text-sm mb-1">Message</label>
        <textarea
          onChange={() => hasUserInteracted()}
          name="message"
          rows={3}
          placeholder="Dites-moi en plus sur votre projet, vos envies ou vos questions."
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-numa-black transition resize-none"
        />
      </div>
    </>
  );
}