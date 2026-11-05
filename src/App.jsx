import "./App.css";
import list from "./assets/list.json";
import sites from "./assets/fortezze.json";
import Footer from "./Footer/Footer";
import MapTab from "./MapTab/MapTab";
import InfoDrawer from "./InfoDrawer/InfoDrawer";
import Hero from "./Hero/Hero";

import { ArrowCircleUpRightIcon } from "@phosphor-icons/react";

function App() {
  const data = [...list].sort((a, b) => (a.proposer > b.proposer ? 1 : -1));

  return (
    <>
      <div className={"text-white bg-indigo-950 w-full pb-5 sm:h-2/3"}>
        <div className={"container mx-auto px-4 sm:px-0 py-4"}>
          <div className={"flex justify-between align-middle"}>
            <p>NINA</p>
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
            Fortezze A.I.
          </h1>
          <h2 className={"w-full text-3xl sm:text-4xl font-serif text-balance"}>
            La nuvola è fatta di terra: mappiamo l'infrastruttura
            dei nuovi data center in Lombardia
          </h2>
          <a className="btn-lg btn-inverse mt-3.5" href="https://monitoraggiodatacenters.nina.watch/" target="_blank">Guarda il monitoraggio <ArrowCircleUpRightIcon /></a>
        </div>
      </div>
      <MapTab data={sites} />
      <Hero />
      <Footer />
    </>
  );
}

export default App;
