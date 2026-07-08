import "./App.css";
import list from "./assets/list.json";
import Footer from "./Footer/Footer";
import MapTab from "./MapTab/MapTab";
import InfoDrawer from "./InfoDrawer/InfoDrawer";

function App() {
  const data = [...list].sort((a, b) => (a.proposer > b.proposer ? 1 : -1));

  return (
    <>
      <div className={"text-orange-600 bg-olive-800 w-full pb-5 sm:h-2/3"}>
        <div className={"container mx-auto px-4 sm:px-0 py-4"}>
          <div className={"flex justify-between align-middle"}>
            <p className={"font-display"}>NINA</p>
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
          <h2 className={"w-full sm:w-2/3 text-lg sm:text-2xl font-display"}>
            Mappatura dei progetti dei nuovi data center intorno a Milano
          </h2>
        </div>
      </div>
      <MapTab data={data} />
      <Footer />
    </>
  );
}

export default App;
