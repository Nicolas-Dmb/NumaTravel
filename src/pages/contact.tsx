import { FaInstagram, FaWhatsapp, FaFacebook, FaEnvelope } from "react-icons/fa";
import useCalendly from "../features/contact/useCalendly";
import SEO from "../components/SEO";


export default function Contact(){
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
                <Calendly />
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
        onClick={() => window.open("https://wa.me/0659589733", "_blank")}
        className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 hover:shadow-sm transition"
      >
        <FaWhatsapp className="text-numa-red text-2xl" />
        <div className="text-left">
          <p className="font-poppins font-medium text-numa-black">WhatsApp</p>
          <p className="text-sm text-gray-600">Message direct</p>
        </div>
      </button>

      <a
        href="mailto:contact@numatravel.com?subject=Demande%20de%20contact%20NumaTravel"
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
function Calendly() {
  const { containerRef, shouldLoad, loading, CALENDLY_URL } = useCalendly();

  return (
    <div className="w-full md:w-[55%]" ref={containerRef}>
      <h2 className="font-poppins font-semibold text-[18px] text-numa-black mb-2">
        Prendre rendez-vous
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        Choisis un créneau et discutons ensemble de ton projet de voyage.
      </p>

      <div className="relative rounded-2xl overflow-hidden border border-gray-200">
        <div
          className={`absolute inset-0 z-10 bg-white transition-opacity duration-500 ${
            !shouldLoad || loading ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <CalendlySkeleton />
        </div>

        {shouldLoad && (
          <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{ minWidth: "320px", height: "500px" }}
          />
        )}
      </div>
      <div className="px-6 pb-6 text-center mx-auto">
        <button
          type="button"
          onClick={() => window.open(CALENDLY_URL, "_blank")}
          className="border border-numa-black mt-6 px-14 py-2 font-delicious text-numa-black rounded hover:bg-numa-black/10 transition"
        >
          Ouvrir Calendly sur une nouvelle page
        </button>
      </div>
    </div>
  );
}


function CalendlySkeleton() {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-2/3 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="h-10 w-full rounded bg-gray-200" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-10 rounded bg-gray-200" />
          <div className="h-10 rounded bg-gray-200" />
          <div className="h-10 rounded bg-gray-200" />
          <div className="h-10 rounded bg-gray-200" />
        </div>
        <div className="h-40 w-full rounded bg-gray-200" />
        <p className="text-sm text-gray-500 pt-2">
          Chargement du calendrier…
        </p>
      </div>
    </div>
  );
}
