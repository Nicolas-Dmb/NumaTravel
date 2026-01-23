import { useEffect } from "react";

export default function useDevice(){
    const islaptop = window.innerWidth >= 1100;
    const istouchpad = window.innerWidth < 1100 && window.innerWidth >= 600;
    useEffect(() => {
        const handleResize = () => {
            window.location.reload();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return { islaptop, istouchpad }
}