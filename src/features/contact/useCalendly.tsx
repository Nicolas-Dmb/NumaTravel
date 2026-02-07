import { useEffect, useRef, useState } from "react";

export default function useCalendly(){
    const [shouldLoad, setShouldLoad] = useState(false);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const CALENDLY_URL =
        "https://calendly.com/numatravelplan/rdv-telephonique-1?hide_event_type_details=1&hide_gdpr_banner=1";

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
        (entries) => {
            const isVisible = entries.some((e) => e.isIntersecting);
            if (isVisible) {
            setShouldLoad(true);
            io.disconnect();
            }
        },
        { root: null, threshold: 0.15 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (!shouldLoad) return;

        const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
        const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`) as HTMLScriptElement | null;

        const onMessage = (e: MessageEvent) => {
        if (typeof e.data === "object" && e.data?.event?.startsWith?.("calendly.")) {
            setLoading(false);
        }
        };

        window.addEventListener("message", onMessage);

        const markLoadedFallback = window.setTimeout(() => setLoading(false), 9000);

        if (!existing) {
        const script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.onload = () => {
        };
        document.body.appendChild(script);
        }

        return () => {
        window.removeEventListener("message", onMessage);
        window.clearTimeout(markLoadedFallback);
        };
    }, [shouldLoad]);

  return { containerRef, shouldLoad, loading, CALENDLY_URL };
}