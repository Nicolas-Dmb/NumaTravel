import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHash } from "./scrollToHash";

export default function ScrollToAnchor() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    // petit délai pour laisser le DOM se poser
    requestAnimationFrame(() => scrollToHash(hash));
  }, [hash]);

  return null;
}
