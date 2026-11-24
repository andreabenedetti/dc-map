import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Switch } from "@base-ui/react/switch";
import { readConsent, saveConsent } from "../lib/consent";
import { updateAnalyticsConsent } from "../lib/analytics";
import "./CookieConsent.css";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const c = readConsent();
    if (c) {
      setAnalytics(c.analytics);
      updateAnalyticsConsent(c.analytics);
    } else {
      setShowBanner(true);
    }
  }, []);

  // Permette di riaprire le preferenze da un link nel footer
  useEffect(() => {
    const open = () => setPrefsOpen(true);
    window.addEventListener("open-cookie-preferences", open);
    return () => window.removeEventListener("open-cookie-preferences", open);
  }, []);

  function decide(value) {
    saveConsent(value);
    setAnalytics(value);
    updateAnalyticsConsent(value);
    setShowBanner(false);
    setPrefsOpen(false);
  }

  return (
    <>
      {showBanner && (
        <div className="cc-banner" role="region" aria-label="Cookie">
          <p>
            Usiamo cookie analitici (Google Analytics) per capire come viene
            usato il sito. Puoi accettare, rifiutare o scegliere. Maggiori
            informazioni nella <a href="/cookie-policy">Cookie Policy</a>.
          </p>
          <div className="cc-actions">
            {/* Stesso peso visivo per Accetta e Rifiuta */}
            <button className="cc-btn" onClick={() => decide(false)}>
              Rifiuta
            </button>
            <button className="cc-btn" onClick={() => setPrefsOpen(true)}>
              Personalizza
            </button>
            <button className="cc-btn" onClick={() => decide(true)}>
              Accetta
            </button>
          </div>
        </div>
      )}

      <Dialog.Root open={prefsOpen} onOpenChange={setPrefsOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="cc-backdrop" />
          <Dialog.Popup className="cc-popup">
            <Dialog.Title>Preferenze cookie</Dialog.Title>
            <Dialog.Description>
              Scegli quali categorie di cookie autorizzare.
            </Dialog.Description>

            <div className="cc-row">
              <div>
                <strong>Tecnici</strong>
                <p>Necessari al funzionamento del sito.</p>
              </div>
              <Switch.Root className="cc-switch" checked disabled>
                <Switch.Thumb className="cc-thumb" />
              </Switch.Root>
            </div>

            <div className="cc-row">
              <div>
                <strong>Analitici</strong>
                <p>Google Analytics: statistiche sull'uso del sito.</p>
              </div>
              <Switch.Root
                className="cc-switch"
                checked={analytics}
                onCheckedChange={setAnalytics}
              >
                <Switch.Thumb className="cc-thumb" />
              </Switch.Root>
            </div>

            <div className="cc-actions">
              <button className="cc-btn" onClick={() => decide(false)}>
                Rifiuta tutti
              </button>
              <button className="cc-btn" onClick={() => decide(analytics)}>
                Salva scelte
              </button>
              <button className="cc-btn" onClick={() => decide(true)}>
                Accetta tutti
              </button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
