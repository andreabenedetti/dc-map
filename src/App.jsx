import "./App.css";
import list from "./assets/list.json";
import sites from "./assets/fortezze.json";
import Footer from "./Footer/Footer";
import MapTab from "./MapTab/MapTab";
import InfoDrawer from "./InfoDrawer/InfoDrawer";
import Hero from "./Hero/Hero";
import { CookieConsent } from "./CookieConsent/CookieConsent";
import { trackPageView } from "./lib/analytics";

import { ArrowCircleUpRightIcon, DownloadIcon } from "@phosphor-icons/react";
import { Cookie } from "@phosphor-icons/react/dist/ssr";


function App() {
  const data = [...list].sort((a, b) => (a.proposer > b.proposer ? 1 : -1));

  return (
    <>
      <div className={"text-indigo-800 bg-indigo-50 w-full pb-5 sm:h-2/3"}>
        <div className={"container mx-auto px-4 sm:px-0 py-4"}>
          <div className={"flex justify-between align-middle"}>
            <a href="https://www.nina.watch/" target="_blank">NINA</a>
            <InfoDrawer />
          </div>
        </div>
        <div
          className={
            "px-4 sm:px-0 container mx-auto min-h-full flex flex-wrap content-center justify-start"
          }
        >
          <h1
            className={
              "text-7xl sm:text-[10em] self-center mb-4 w-full intro-title"
            }
          >
            Fortezze AI
          </h1>
          <h2 className={"w-full text-3xl sm:text-4xl font-serif text-balance"}>
            Mappiamo l'infrastruttura dei nuovi data center in Lombardia
          </h2>
          <div className={"gap-x-2 flex mt-2"}><a className="btn-lg btn-primary mt-3.5" href="https://monitoraggiodatacenters.nina.watch/" target="_blank">Guarda il monitoraggio <ArrowCircleUpRightIcon /></a> <a className="btn-lg btn-outline mt-3.5" href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTEw5VRS7_TNNJdarLu9lNQx_sV2nHElORes8C73cBqAO4iB3n72gamngeiHJXe2AvQwzNv_J6dB-RC/pub?output=xlsx" target="_blank">Scarica i dati <DownloadIcon /></a></div>
        </div>
      </div>
      <MapTab data={sites} />
      <Hero />
      <Footer />
      <CookieConsent />
    </>
  );
}

export default App;
