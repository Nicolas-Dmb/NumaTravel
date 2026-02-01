import useDevice from "../hook/useDevice.tsx";
import useScrollDirection from "../hook/useScroll.tsx";
import useHeader from "../hook/useHeader.tsx";

const buttonStyle =
  "text-[18px] transform transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 cursor-pointer text-numa-black font-cormorant font-bold";

const subButtonStyle =
  "text-[16px] transform transition-transform duration-300 hover:-translate-y-0.3 hover:scale-105 cursor-pointer font-cormorant font-semibold text-numa-black";

export default function Header() {
  const { islaptop, istouchpad } = useDevice();
  const scrollDirection = useScrollDirection();
  const { displayServices, open, close, setDisplayServices } = useHeader({ scrollDirection });

  return (
    <>
      <section
        className={`fixed top-0 left-0 w-full bg-[#ebe6e277] px-8 z-50 backdrop-blur-sm shadow-lg ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        } transition-transform duration-300`}
      >
        {islaptop && (
          <LaptopHeader
            onOpenServices={open}
            onCloseServices={close}
            onForceClose={() => setDisplayServices(false)}
          />
        )}
        {istouchpad && <TouchpadHeader />}
        {!islaptop && !istouchpad && <MobileHeader />}
      </section>

      {islaptop && (
        <div
          className={`fixed left-0 w-full z-40 px-8 ${
            scrollDirection === "down" ? "-translate-y-full hidden" : "translate-y-0"
          } transition-transform duration-300`}
          style={{ top: "64px" }}
        >
          <div
            onMouseLeave={close}
            className={`
              mx-auto w-72
              bg-[#ebe6e277] backdrop-blur-sm shadow-lg
              rounded-b-lg
              border-t border-black/10
              overflow-hidden
              transition-all duration-200
              ${displayServices ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}
            `}
          >
            <a className={subButtonStyle + " block px-5 py-3"} href="/#services-voyages">MES SERVICES VOYAGES</a>
            <a className={subButtonStyle + " block px-5 py-3"} href="/#travel-planner">TRAVEL PLANNER</a>
            <a className={subButtonStyle + " block px-5 py-3"} href="/#accompagnement">ACCOMPAGNEMENT</a>
          </div>
        </div>
      )}
    </>
  );
}

interface LaptopHeaderProps {
  onOpenServices: () => void;
  onCloseServices: () => void;
  onForceClose: () => void;
}

function LaptopHeader({ onOpenServices, onForceClose }: LaptopHeaderProps) {
  return (
    <div
      className="text-numa-black flex items-center justify-around h-16 font-cormorant font-bold"
    >
      <a onMouseEnter={onForceClose} className={buttonStyle} href="/#first-layer">ACCUEIL</a>
      <a onMouseEnter={onForceClose} className={buttonStyle} href="/#fourth-layer">QUI SUIS-JE ?</a>

      <div onMouseEnter={onOpenServices}>
        <a className={buttonStyle}>MES SERVICES</a>
      </div>

      <a onMouseEnter={onForceClose} className={buttonStyle}>EXPLORER</a>
      <a onMouseEnter={onForceClose} className="text-numa-red text-[20px] transform transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110">
        CONTACT
      </a>
    </div>
  );
}

function TouchpadHeader() {
  return <div
      className="text-numa-black flex items-center justify-between h-16 gap-8 items-center px-4"
    >
      <a className="text-[22px] font-cormorant font-semibold" href="/#first-layer">NUMA TRAVEL</a>
      <div className="flex gap-10 items-center">
        <a className="text-[22px] font-cormorant font-semibold">EXPLORER</a>
        <a className="text-[22px] text-numa-red font-cormorant font-semibold">
            CONTACT
        </a>
      </div>
    </div>
}

function MobileHeader() {
  return(
    <div
      className="text-numa-black flex items-center justify-between h-16 gap-8 items-center"
    >
      <a className="text-[14px] font-cormorant font-semibold" href="/#first-layer">NUMA TRAVEL</a>
      <div className="flex gap-6 items-center">
        <a className="text-[14px] font-cormorant font-semibold">EXPLORER</a>
        <a className="text-[14px] font-cormorant font-semibold text-numa-red">
            CONTACT
        </a>
      </div>
    </div>
  );
}
