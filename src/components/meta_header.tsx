import useDevice from "../hook/useDevice.tsx";
import { scrollToHash } from "../utils/scrollToHash";

export default function MetaHeader() {
  const { islaptop, istouchpad } = useDevice();

  return (
    <>
      <section
        className='fixed top-0 left-0 w-full bg-[#ebe6e277] px-8 z-50 backdrop-blur-sm shadow-lg'
      >
        {islaptop && <LaptopHeader/>}
        {istouchpad && <TouchpadHeader />}
        {!islaptop && !istouchpad && <MobileHeader />}
      </section>
    </>
  );
}

function LaptopHeader() {
  return (
    <div
      className="flex items-center justify-end h-16 font-cormorant font-bold"
    >
      <button
        type="button"
        onClick={() => scrollToHash("#meta-form")}
        className="text-numa-red text-[26px] transform transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110"
      >
        CONTACT
      </button>
    </div>
  );
}

function TouchpadHeader() {

  return <div
      className="flex items-center justify-end h-16 gap-8 items-center px-4"
    >
      <button
        type="button"
        onClick={() => scrollToHash("#meta-form")}
        className="text-[22px] text-numa-red font-cormorant font-semibold"
      >
        CONTACT
      </button>
    </div>
}

function MobileHeader() {
  return(
    <div
      className="flex items-center justify-end h-16 gap-8 items-center"
    >
      <button
        type="button"
        onClick={() => scrollToHash("#meta-form")}
        className="text-[14px] font-cormorant font-semibold text-numa-red"
      >
        CONTACT
      </button>
    </div>
  );
}

