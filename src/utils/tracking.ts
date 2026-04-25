
export const TrackingEvent = {
  FORM_STARTED: "form_started",
  FORM_SUBMITTED: "form_submitted",
  FORM_ERROR: "form_error",
  PHONE_CLICKED: "phone_clicked",
  EMAIL_CLICKED: "email_clicked",
  COOKIES_ACCEPTED: "cookies_accepted",
  COOKIES_REFUSED: "cookies_refused",
} as const;

export type TrackingEvent =
  typeof TrackingEvent[keyof typeof TrackingEvent];

export const trackEvent = (
  eventName: TrackingEvent,
  data: Record<string, any> = {}
) => {
  const params = new URLSearchParams(window.location.search);

  const commonData = {
    page: window.location.pathname,
    source: params.get("utm_source") || "direct",
    medium: params.get("utm_medium") || "none",
    campaign: params.get("utm_campaign") || "none",
    device: /Mobi|Android/i.test(navigator.userAgent)
      ? "mobile"
      : "desktop",
  };

  window.umami?.track(eventName, {
    ...commonData,
    ...data,
  });
};

declare global {
  interface Window {
    umami?: {
      track: (
        eventName: string,
        data?: Record<string, unknown>
      ) => void;
    };
  }
}