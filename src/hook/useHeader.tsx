import { useEffect, useRef, useState } from "react";

interface UseHeaderProps {
    scrollDirection:string;
}

export default function useHeader({ scrollDirection }: UseHeaderProps){
    const [displayServices, setDisplayServices] = useState(false);
    const closeTimer = useRef<number | null>(null);

    const open = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setDisplayServices(true);
    };

    const close = () => {
    closeTimer.current = window.setTimeout(() => {
        setDisplayServices(false);
    }, 120);
    };

    useEffect(() => {
    if (scrollDirection === "down") close();
    }, [scrollDirection]);

    return { displayServices, open, close, setDisplayServices };
}