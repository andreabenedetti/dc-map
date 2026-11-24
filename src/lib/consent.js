const KEY = "cookie-consent";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 180; // ~6 mesi

export function readConsent() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw);
    // Scaduto: richiedi di nuovo il consenso
    return Date.now() - c.ts > MAX_AGE_MS ? null : c;
  } catch {
    return null;
  }
}

export function saveConsent(analytics) {
  const c = { analytics, ts: Date.now() };
  localStorage.setItem(KEY, JSON.stringify(c));
  return c;
}
