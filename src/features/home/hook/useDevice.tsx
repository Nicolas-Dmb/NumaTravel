import { useEffect, useState } from "react";

export default function useDevice() {
  const get = () => {
    const w = window.innerWidth;
    return {
      islaptop: w >= 1100,
      istouchpad: w < 1100 && w >= 600,
    };
  };

  const [device, setDevice] = useState(get);

  useEffect(() => {
    let raf = 0;

    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setDevice(get()));
    };

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return device;
}
