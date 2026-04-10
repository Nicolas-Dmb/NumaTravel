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

export function setupConsoleErrorTracking() {
  const originalError = console.error;

  console.error = (...args: unknown[]) => {
    originalError(...args);

    const message = args.map(formatArg).join(" | ");

    fetch(`${API_URL}/client-error`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
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
        url: window.location.href,
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
        type: "unhandledrejection",
        url: window.location.href,
      }),
    }).catch(() => {});
  });
}