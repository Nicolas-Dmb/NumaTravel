import logo from '../assets/logo.svg';
import video from '../assets/video.webm';

export default function FirstLayer(){
    return (
        <div>
            <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
                <source src={video} type="video/webm" />
            </video>
            <div className="absolute top-0 right-0 p-4 z-20">
                <img src={logo} alt="Numa Travel Logo" className="w-20 h-20 lg:w-32 lg:h-32 xl:w-48 xl:h-48" />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white bg-black bg-opacity-50">
                <h3 className="text-[22px] mb-2 font-delicious font-bold">DISCOVER</h3>
                <h1 className="text-[40px] lg:text-[70px] xl:text-[92.8px] mb-4 font-poppins">NUMA TRAVEL</h1>
                <p className="text-[24px] font-cormorant">TRAVEL PLANNER</p>
            </div>
        </div>
    )
}