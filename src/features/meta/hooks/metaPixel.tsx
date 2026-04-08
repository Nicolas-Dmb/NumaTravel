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
  console.log("initMetaPixel called with", pixelId);

  if (typeof window === "undefined") return;
  if (!pixelId) return;

  if (!window.fbq) {
    console.log("injecting fbq script");

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

  if (isMetaInitialized) {
    console.log("Meta Pixel already initialized, skipping init");
    return;
  }

  console.log("calling fbq init");
  window.fbq?.("init", pixelId);
  window.fbq?.("track", "PageView");

  isMetaInitialized = true;
}

export function trackMetaLead(): void {
  if (!window.fbq || !isMetaInitialized) return;
  window.fbq("track", "Lead");
}