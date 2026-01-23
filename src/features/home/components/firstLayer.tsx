import { useEffect, useRef } from 'react';
import logo from '../assets/logo.svg';
import video from '../assets/video.webm';

export default function FirstLayer(){
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        const v = videoRef.current;
        if (!el || !v) return;

        const io = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
            v.play().catch(() => {});
            } else {
            v.pause();
            v.currentTime = 0;
            }
        },
        { threshold: 0.3 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);
    return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
        <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            className="absolute inset-0 h-full w-full object-cover"
        >
            <source src={video} type="video/webm" />
        </video>

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

            <button className="border border-white mt-6 px-14 py-2 font-delicious text-white rounded hover:bg-white/10 transition">
            EXPLORE
            </button>
        </div>
    </section>
  );
}