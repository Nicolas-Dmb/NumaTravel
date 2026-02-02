import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  // Ajuste si ton header fait 64px
  const headerOffset = 64;
  const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}


export default function ScrollToAnchor() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    // petit délai pour laisser le DOM se poser
    requestAnimationFrame(() => scrollToHash(hash));
  }, [hash]);

  return null;
}
