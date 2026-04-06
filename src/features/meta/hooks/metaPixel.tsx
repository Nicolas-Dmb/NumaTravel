declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: (...args: any[]) => void;
  }
}

let isMetaInitialized = false;

export function initMetaPixel(pixelId: string) {
  console.log("initMetaPixel called with", pixelId);

  if (typeof window === "undefined") return;
  if (!pixelId) return;

  if (!window.fbq) {
    console.log("injecting fbq script");

    !(function (f: any, b, e, v, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
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

export function trackMetaLead() {
  if (!window.fbq || !isMetaInitialized) return;
  window.fbq("track", "Lead");
}