const API_URL = import.meta.env.VITE_API_URL || "/api";

function formatArg(arg: unknown): string {
  if (arg instanceof Error) {
    return `${arg.name}: ${arg.message}\n${arg.stack ?? ""}`;
  }

  if (typeof arg === "string") {
    return arg;
  }

  try {
    return JSON.stringify(arg);
  } catch {
    return String(arg);
  }
}

function getErrorContext() {
  const cookieConsent = localStorage.getItem("cookieConsent") ?? "unset";

  const getCookie = (name: string): string | undefined => {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split("=")[1]) : undefined;
  };

  return {
    url: window.location.href,
    pathname: window.location.pathname,
    timestamp: new Date().toISOString(),
    isMetaRoute: window.location.hash.includes("meta-contact"),
    hasCookieConsent: cookieConsent,
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
    referrer: document.referrer || undefined,
  };
}

export function setupConsoleErrorTracking() {
  const originalError = console.error;

  console.error = (...args: unknown[]) => {
    originalError(...args);

    const message = args.map(formatArg).join(" | ");
    const errorArg = args.find((a) => a instanceof Error) as Error | undefined;

    fetch(`${API_URL}/client-error`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        stack: errorArg?.stack ?? null,
        ...getErrorContext(),
      }),
    }).catch(() => {
    });
  };

  window.addEventListener("error", (e) => {
    fetch(`${API_URL}/client-error`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: e.message,
        file: e.filename,
        line: e.lineno,
        column: e.colno,
        stack: e.error?.stack ?? null,
        ...getErrorContext(),
      }),
    }).catch(() => {});
  });

  window.addEventListener("unhandledrejection", (e) => {
    const msg =
      e.reason instanceof Error
        ? `${e.reason.message}\n${e.reason.stack}`
        : String(e.reason);

    fetch(`${API_URL}/client-error`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: msg,
        stack: e.reason instanceof Error ? e.reason.stack : null,
        type: "unhandledrejection",
        ...getErrorContext(),
      }),
    }).catch(() => {});
  });
}