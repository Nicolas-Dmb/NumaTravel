import logo from "../assets/logo.svg";
import video from "/public/video-desktop.mp4";
import hero from "/public/hero.jpg";
import { useNavigate } from "react-router-dom";

export default function FirstLayer() {
    const navigate = useNavigate();

  
  return (
    <section className="relative h-screen overflow-hidden">
      <video
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        poster={hero}
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover"
        src={video}
      />

      <div className="absolute top-0 right-0 p-4 z-20">
            <img
            src={logo}
            alt="Numa Travel Logo"
            className="w-20 h-20 lg:w-32 lg:h-32 xl:w-48 xl:h-48"
            />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-white">
            <h3 className="text-[22px] mb-2 font-delicious font-bold">DISCOVER</h3>
            <h1 className="text-[40px] lg:text-[70px] xl:text-[92.8px] mb-4 font-poppins">
            NUMA TRAVEL
            </h1>
            <p className="text-[24px] font-cormorant">TRAVEL PLANNER</p>

            <button onClick={()=> navigate("/explorer")} className="border border-white mt-6 px-14 py-2 font-delicious text-white rounded hover:bg-white/10 transition">
            EXPLORE
            </button>
        </div>
    </section>
  );
}
