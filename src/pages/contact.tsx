import { FaInstagram, FaWhatsapp, FaFacebook, FaEnvelope } from "react-icons/fa";
import { useEffect } from "react";
import SEO from "../components/SEO";
import ContactForm from "../features/meta/components/forms";

interface ContactProps {
    error: string | null;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, phone: string | undefined) => void;
    isLoading: boolean;
    setMetaRoutes: (value: boolean) => void;
}

export default function Contact({ error, handleSubmit, isLoading, setMetaRoutes }: ContactProps){
    useEffect(() => {
        setMetaRoutes(false);
    }, [setMetaRoutes]);

    return (
    <>
      <SEO 
        title="Contact – Numa Travel | Travel planner"
        description="Contactez Numa Travel pour échanger sur votre projet de voyage et créer un itinéraire personnalisé, clé en main."
        canonicalPath="/contact"
      />
      <main>
        <div className="min-h-[calc(100vh-4rem)] py-14 md:px-16 bg-numa-white ">
            <h1 className="text-[40px] lg:text-[70px] font-bold font-cormorant text-numa-black">Me contacter</h1>
            <div className="flex flex-col gap-4 mt-8 mx-4 md:flex-row md:gap-8 md:mx-16 lg:mx-32 md:justify-between">
                <ContactOptions />
                <ContactForm error={error} handleSubmit={handleSubmit} isLoading={isLoading} />
            </div>
        </div>
      </main>
    </>
    );
}

function ContactOptions() {
  return (
    <div className="flex flex-col gap-2 md:gap-6 w-full md:w-[40%]">
      <div>
        <h2 className="font-poppins font-semibold text-[18px] text-numa-black">
          Contact rapide
        </h2>
        <p className="font-poppins text-[14px] text-gray-600 mt-1">
          Je réponds généralement sous 24–48h.
        </p>
      </div>
      <button
        type="button"
        onClick={() => window.open("https://wa.me/33659589733", "_blank")}
        className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 hover:shadow-sm transition"
      >
        <FaWhatsapp className="text-numa-red text-2xl" />
        <div className="text-left">
          <p className="font-poppins font-medium text-numa-black">WhatsApp</p>
          <p className="text-sm text-gray-600">Message direct</p>
        </div>
      </button>

      <a
        href="mailto:numatravelplan@gmail.com?subject=Demande%20de%20contact%20NumaTravel"
        className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 hover:shadow-sm transition"
      >
        <FaEnvelope className="text-numa-red text-2xl" />
        <div>
          <p className="font-poppins font-medium text-numa-black">Email</p>
          <p className="text-sm text-gray-600">numatravelplan@gmail.com</p>
        </div>
      </a>

      <div className="rounded-xl border border-gray-200 p-4">
        <p className="font-poppins font-medium text-numa-black">Réseaux</p>
        <div className="flex items-center gap-4 mt-3">
          <button
            type="button"
            onClick={() =>  window.open("https://www.instagram.com/numatravelplan/", "_blank")}
            className="p-3 rounded-full border border-gray-200 hover:shadow-sm transition"
            aria-label="Instagram"
          >
            <FaInstagram className="text-numa-black text-xl" />
          </button>

          <button
            type="button"
            onClick={() => window.open("https://www.facebook.com/profile.php?id=61585037937716", "_blank")}
            className="p-3 rounded-full border border-gray-200 hover:shadow-sm transition"
            aria-label="Facebook"
          >
            <FaFacebook className="text-numa-black text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
