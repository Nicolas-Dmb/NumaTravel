import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import doneAnimation from '../features/meta/assets/doneAnimation.lottie';


interface ThanksProps {
    setMetaRoutes: (display: boolean) => void;
}

export default function Thanks({ setMetaRoutes }: ThanksProps){
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setMetaRoutes(false);
            navigate("/");
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate, setMetaRoutes]);
    
    return (
    <main>
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-numa-white">
            <h1 className="text-lg sm:text-4xl font-poppins text-numa-black mb-4">Merci pour votre message !</h1>
            <DotLottieReact
                src={doneAnimation}
                autoplay
                className="w-48 h-48 mb-4"
            />
            <p className="text-sm sm:text-lg font-delicious text-numa-black">Hâte d'échanger un peu plus avec vous 😊</p>
        </div>
    </main>
    )
}