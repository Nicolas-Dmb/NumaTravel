
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-numa-white p-6 shadow-xl text-numa-black">
        <h2 className="text-xl font-semibold">
          Une petite erreur est survenue
        </h2>

        <p className="mt-3 text-sm leading-6">
          Votre demande n’a peut-être pas été transmise correctement.
          Vous pouvez me contacter directement par e-mail ou par téléphone,
          je vous répondrai dès que possible.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={`mailto:${email}`}
            className="rounded-xl bg-numa-black px-4 py-3 text-center text-sm font-medium text-white transition hover:opacity-90"
          >
            Envoyer un e-mail
          </a>

          <a
            onClick={() => window.open("https://wa.me/330659589733", "_blank")}
            className="rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-medium text-numa-black transition hover:bg-numa-black/10"
          >
            WhatsApp
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