
type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ContactModal = ({
  isOpen,
  onClose,
}: ContactModalProps) => {
  if (!isOpen) return null;

  const email = "contact@numatravelplan.com";
  const phone = "+33 6 12 34 56 78";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900">
          Une petite erreur est survenue
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Votre demande n’a peut-être pas été transmise correctement.
          Vous pouvez me contacter directement par e-mail ou par téléphone,
          je vous répondrai dès que possible.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={`mailto:${email}`}
            className="rounded-xl bg-gray-900 px-4 py-3 text-center text-sm font-medium text-white transition hover:opacity-90"
          >
            Envoyer un e-mail
          </a>

          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-900 transition hover:bg-gray-50"
          >
            Appeler
          </a>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full text-sm text-gray-500 underline underline-offset-2"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};