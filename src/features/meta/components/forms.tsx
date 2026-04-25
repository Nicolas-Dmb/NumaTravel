import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { trackEvent, TrackingEvent } from "../../../utils/tracking";

interface ContactFormProps {
  error: string | null;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, phone: string | undefined) => void;
  isLoading: boolean;
}

export default function ContactForm({
  error,
  handleSubmit,
  isLoading,
}: ContactFormProps) {
  const [phone, setPhone] = useState<string | undefined>();
  const [hasInteracted, setHasInteracted] = useState(false);

  const hasUserInteracted = () => {
    if (hasInteracted) return;
    setHasInteracted(true);
    trackEvent(TrackingEvent.FORM_STARTED);
  }

  return (
    <div className="flex flex-col justify-center font-poppins text-numa-black px-4 pb-16 w-full max-w-2xl mx-auto">
      <form
        onSubmit={(event) => handleSubmit(event, phone)}
        className="rounded-2xl shadow-md p-6 flex flex-col gap-5 bg-white"
      >
        <h2 className="text-xl font-semibold text-center">
          Parlez-moi de votre projet, de vos envies ou posez-moi vos questions !
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <label className="text-sm mb-1">Nom</label>
            <input
              onChange={() => hasUserInteracted()}
              type="text"
              name="lastName"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-numa-black transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Prénom</label>
            <input
              onChange={() => hasUserInteracted()}
              type="text"
              name="firstName"
              required
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
              required
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

        <div className="flex flex-col">
          <label className="text-sm mb-1">Message</label>
          <textarea
            onChange={() => hasUserInteracted()}
            name="message"
            rows={3}
            placeholder="Dites-moi où vous voulez partir, quand, et votre budget approximatif. Je vous répondrai avec une première idée de voyage sur mesure."
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-numa-black transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-numa-black text-white rounded-lg py-3 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {isLoading ? "Envoi..." : "Envoyer"}
        </button>
      </form>

      {error && <p className="text-numa-red text-center mt-4">{error}</p>}
    </div>
  );
}