export type AnalyticsLocation = "header" | "hero" | "symptoms" | "services" | "ssd" | "attendance" | "repairs" | "regions" | "cta" | "footer";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

export function trackWhatsApp(location: AnalyticsLocation) {
  window.gtag?.("event", "click_whatsapp", { location });
}
