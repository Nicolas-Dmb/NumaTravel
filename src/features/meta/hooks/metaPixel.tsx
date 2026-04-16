declare global {
  interface Window {
    fbq?: ((...args: any[]) => void) & {
      callMethod?: (...args: any[]) => void;
      queue?: any[];
      push?: (...args: any[]) => void;
      loaded?: boolean;
      version?: string;
    };
    _fbq?: Window["fbq"];
  }
}

let isMetaInitialized = false;

export function initMetaPixel(pixelId: string): void {
  if (typeof window === "undefined") return;
  if (!pixelId) return;

  if (!window.fbq) {
    (function (
      f: Window,
      b: Document,
      e: string,
      v: string,
      n?: Window["fbq"],
      t?: HTMLScriptElement,
      s?: HTMLScriptElement | Element,
    ) {
      if (f.fbq) return;

      n = function (...args: any[]) {
        if (n!.callMethod) {
          n!.callMethod(...args);
        } else {
          n!.queue!.push(args);
        }
      } as Window["fbq"];

      f.fbq = n;
      if (!f._fbq) {
        f._fbq = n;
      }

      n!.push = (...args: any[]) => {
        n?.queue?.push(...args);
      };
      n!.loaded = true;
      n!.version = "2.0";
      n!.queue = [];

      t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;

      s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  }

  if (isMetaInitialized) return;

  window.fbq?.("init", pixelId);
  window.fbq?.("track", "PageView");

  isMetaInitialized = true;
}

export function generateMetaEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `meta_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

export function trackMetaLead(eventId: string): void {
  if (!window.fbq || !isMetaInitialized) {
    console.warn("Meta Pixel not initialized, cannot track Lead");
    return;
  }

  window.fbq("track", "Lead", {}, { eventID: eventId });
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.split("=")[1]) : undefined;
}

export function getMetaBrowserData() {
  return {
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
  };
}
