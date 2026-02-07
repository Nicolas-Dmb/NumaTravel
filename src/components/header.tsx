import useDevice from "../hook/useDevice.tsx";
import useScrollDirection from "../hook/useScroll.tsx";
import useHeader from "../hook/useHeader.tsx";
import more from "/more.svg";
import close from "/close.svg";
import { useState } from "react";
import { Link } from "react-router-dom";


const buttonStyle =
  "text-[18px] transform transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 cursor-pointer text-numa-black font-cormorant font-bold";

const subButtonStyle =
  "text-[16px] transform transition-transform duration-300 hover:-translate-y-0.3 hover:scale-105 cursor-pointer font-cormorant font-semibold text-numa-black";

export default function Header() {
  const { islaptop, istouchpad } = useDevice();
  const scrollDirection = useScrollDirection();
  const { displayServices, open, close, setDisplayServices } = useHeader({ scrollDirection });
  const [seeMore, setSeeMore] = useState(false);

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
        {istouchpad && <TouchpadHeader setSeeMore={setSeeMore} />}
        {!islaptop && !istouchpad && <MobileHeader setSeeMore={setSeeMore} />}
      </section>

      {islaptop && (
        <LaptopServices
          displayServices={displayServices}
          close={close}
          scrollDirection={scrollDirection}
        />
      )}
      {!islaptop && (<MoreSections isTouchpad={istouchpad} setSeeMore={setSeeMore} seeMore={seeMore} scrollDirection={scrollDirection} />)}
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
      <Link onMouseEnter={onForceClose} className={buttonStyle} to="/#first-layer">ACCUEIL</Link>
      <Link onMouseEnter={onForceClose} className={buttonStyle} to="/#fourth-layer">QUI SUIS-JE ?</Link>

      <div onMouseEnter={onOpenServices}>
        <a className={buttonStyle}>MES SERVICES</a>
      </div>

      <Link onMouseEnter={onForceClose} className={buttonStyle} to="/explorer">EXPLORER</Link>
      <Link onMouseEnter={onForceClose} to="/contact" className="text-numa-red text-[20px] transform transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110">
        CONTACT
      </Link>
    </div>
  );
}

interface MdHeaderProps {
  setSeeMore: (seeMore: boolean) => void;
}

function TouchpadHeader({ setSeeMore }: MdHeaderProps) {

  return <div
      className="text-numa-black flex items-center justify-between h-16 gap-8 items-center px-4"
    >
      <Link className="text-[22px] font-cormorant font-semibold" to="/#first-layer">NUMA TRAVEL</Link>
      <div className="flex gap-10 items-center">
        <Link to="/explorer" className="text-[22px] font-cormorant font-semibold">EXPLORER</Link>
        <Link to="/contact" className="text-[22px] text-numa-red font-cormorant font-semibold">
            CONTACT
        </Link>
        <img src={more} alt="More options" className="w-6 h-6 cursor-pointer" onClick={() => setSeeMore(true)} />
      </div>
    </div>
}

function MobileHeader({ setSeeMore }: MdHeaderProps) {
  return(
    <div
      className="text-numa-black flex items-center justify-between h-16 gap-8 items-center"
    >
      <Link className="text-[14px] font-cormorant font-semibold" to="/#first-layer">NUMA TRAVEL</Link>
      <div className="flex gap-4 items-center">
        <Link to="/explorer" className="text-[14px] font-cormorant font-semibold">EXPLORER</Link>
        <Link to="/contact" className="text-[14px] font-cormorant font-semibold text-numa-red">
            CONTACT
        </Link>
        <img src={more} alt="More options" className="w-5 h-5 cursor-pointer" onClick={() => setSeeMore(true)} />
      </div>
    </div>
  );
}


interface MoreSectionsProps {
  isTouchpad: boolean;
  setSeeMore: (seeMore: boolean) => void;
  seeMore?: boolean;
  scrollDirection?: string;
}

function MoreSections({ isTouchpad, setSeeMore, seeMore, scrollDirection }: MoreSectionsProps){
  const touchPadStyle = "text-[22px] font-cormorant font-semibold";
  const mobileStyle = "text-[14px] font-cormorant font-semibold";
  return (
    <div className={`fixed top-0 left-0 w-full bg-[#ebe6e277] z-50 backdrop-blur-sm shadow-lg pb-8 px-8 ${seeMore ? "block" : "hidden"} transition-transform duration-300 ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"}`}>
      <img src={close} alt="Close options" className={`cursor-pointer float-right mt-4 ${isTouchpad ? "w-5 h-5" : "w-5 h-5"}`} onClick={() => setSeeMore(false)} />
      <div className="flex flex-col gap-4 pt-16 items-center" onClick={()=> setSeeMore(false)}>
        <Link className={isTouchpad ? touchPadStyle : mobileStyle} to="/#services-voyages">QUI SUIS-JE ?</Link>
        <Link className={isTouchpad ? touchPadStyle : mobileStyle} to="/#travel-planner">MES SERVICES VOYAGES</Link>
        <Link className={isTouchpad ? touchPadStyle : mobileStyle} to="/#travel-planner">TRAVEL PLANNER</Link>
        <Link className={isTouchpad ? touchPadStyle : mobileStyle} to="/#accompagnement">ACCOMPAGNEMENT</Link>
      </div>
    </div>
  )
}


interface LaptopServicesProps {
  displayServices: boolean;
  close: () => void;
  scrollDirection: string;
}

function LaptopServices({ displayServices, close, scrollDirection }: LaptopServicesProps){
  return(
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
        <Link className={subButtonStyle + " block px-5 py-3"} to="/#services-voyages">MES SERVICES VOYAGES</Link>
        <Link className={subButtonStyle + " block px-5 py-3"} to="/#travel-planner">TRAVEL PLANNER</Link>
        <Link className={subButtonStyle + " block px-5 py-3"} to="/#accompagnement">ACCOMPAGNEMENT</Link>
      </div>
    </div>
  )
}