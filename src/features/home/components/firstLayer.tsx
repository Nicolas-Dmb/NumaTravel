import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";
import video from "/video-desktop.mp4";
import hero from "/hero.webp";
import { useNavigate } from "react-router-dom";

export default function FirstLayer() {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoPlaying, setVideoPlaying] = useState(false);

    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        const p = el.play();
        if (p !== undefined) {
            p.then(() => setVideoPlaying(true)).catch(() => setVideoPlaying(false));
        }
    }, []);


  return (
    <section className="relative h-screen overflow-hidden">
      <img
        src={hero}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        poster={hero}
        disablePictureInPicture
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          videoPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <source src={video} type="video/mp4" />
      </video>

      <div className="absolute top-0 right-0 p-4 z-20">
            <img
            src={logo}
            alt="logo de Numa Travel"
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
