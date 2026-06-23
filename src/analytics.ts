// --- Google Analytics 4 ---
//
// 1. Create a GA4 property at https://analytics.google.com
// 2. Admin → Data Streams → add a "Web" stream for your site URL
// 3. Copy the Measurement ID (looks like "G-XXXXXXXXXX") and paste it below.
//
// Until a real ID is set, analytics stays disabled (no script loaded), so the
// site works fine in local dev and forks without tracking anything.
const GA_MEASUREMENT_ID = 'G-B61FQVDQ6Q';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const isConfigured = () => /^G-[A-Z0-9]{6,}$/.test(GA_MEASUREMENT_ID);

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === 'undefined' || !isConfigured()) return;
  initialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag relies on `arguments`, so forward them verbatim.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
