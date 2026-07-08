import { Tabs } from "@base-ui/react/tabs";
import Map from "../Map/Map";
import MapList from "../MapList/MapList";

function MapTab({ data }) {
  return (
    <Tabs.Root defaultValue="list" className="w-full">
      <Tabs.List
        className={
          "bg-olive-800 w-full flex justify-center border-solid border-b-olive-300 border-b text-sm sticky top-0"
        }
      >
        <Tabs.Tab
          value="list"
          className={
            "text-olive-200 font-bold h-full px-5 py-3 hover:cursor-pointer"
          }
        >
          Lista
        </Tabs.Tab>
        <Tabs.Tab
          value="map"
          className={
            "text-olive-200 font-bold h-full px-5 py-3 hover:cursor-pointer"
          }
        >
          Mappa
        </Tabs.Tab>
        <Tabs.Indicator className="absolute top-0 left-0 -z-1 h-full w-(--active-tab-width) translate-x-(--active-tab-left) border-b-orange-600 border-b-4 transition-[translate,width] duration-150 ease-in-out" />
      </Tabs.List>
      <Tabs.Panel value="list">
        <MapList data={data} />
      </Tabs.Panel>
      <Tabs.Panel value="map">
        <Map />
      </Tabs.Panel>
    </Tabs.Root>
  );
}

export default MapTab;
