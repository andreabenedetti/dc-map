import "./App.css";
import list from "./assets/list.json";
import Footer from "./Footer/Footer";
import MapTab from "./MapTab/MapTab";
import InfoDrawer from "./InfoDrawer/InfoDrawer";
import Intro from "./Intro/Intro";

function App() {
  const data = [...list].sort((a, b) => (a.proposer > b.proposer ? 1 : -1));

  return (
    <>
      <div className={"text-blue-400 bg-indigo-950 w-full pb-5 sm:h-2/3"}>
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
            Come i data center stanno diventando le nuove fortezze dell'intelligenza artificiale
          </h2>
        </div>
      </div>
      <Intro />
      {/* <MapTab data={data} />*/}
      <div className={"container mx-auto px-4 sm:px-0 py-20 flex flex-wrap items-center justify-center space-y-4"}>
        <img src="img-2.png" className="w-120 h-auto max-w-full" />
      <p className={"font-serif text-lg text-slate-600 text-balance text-center"}>Presto pubblicheremo i dati che abbiamo raccolto. Seguici su @n.i.n.a_watch per ricevere aggiornamenti e informazioni aggiuntive.</p></div>
      <Footer />
    </>
  );
}

export default App;
