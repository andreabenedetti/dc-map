import "./App.css";
import list from "./assets/list.json";
import Footer from "./Footer/Footer";
import MapTab from "./MapTab/MapTab";
import InfoDrawer from "./InfoDrawer/InfoDrawer";
import Intro from "./Intro/Intro";

import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr";

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
            La nuvola è fatta di terra: mappiamo l'infrastruttura dell'estrattivismo digitale
          </h2>
        </div>
      </div>
      <Intro />
      {/* <MapTab data={data} />*/}
      <div className={"container mx-auto w-full sm:w-4xl px-4 sm:px-0 py-20 items-center justify-center space-y-3"}>
        <img src="img-2.png" className="w-70 h-auto max-w-full mx-auto" />
        <p className={"font-serif text-2xl text-slate-600 text-center"}>Partecipa alla mappatura</p>
        <p className={"text-sans text-base text-slate-600 text-center"}>Così come N.i.n.a. non è un'isola, ma un'infrastruttura a disposizione di chi lotta, questa mappatura è pensata per essere utilizzata da chiunque ne abbia bisogno.</p>
        <p className={"text-sans text-base text-slate-600 text-center"}>Se fai parte di un collettivo ecologista, di un sindacato, di un gruppo di ricerca studentesco, o se sei semplicemente un cittadino o una cittadina che vuole opporsi a questa colonizzazione tecnologica sul proprio territorio, vogliamo unire le forze con te. Tutto può essere bene comune, dai dati ai territori, e solo collettivamente possiamo difenderli.</p>
        <div className={"w-fit mx-auto flex items-center gap-2 bg-indigo-950 px-4 py-2 text-white transition-all hover:bg-blue-200 hover:text-blue-500"}><EnvelopeIcon size={18} /> <a href="mailto:info@nina.watch">Contattaci via mail</a></div>

      </div>
      <Footer />
    </>
  );
}

export default App;
