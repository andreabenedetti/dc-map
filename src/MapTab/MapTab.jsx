import { Tabs } from "@base-ui/react/tabs";
import Map from "../Map/Map";
import MapList from "../MapList/MapList";

function MapTab({ data }) {
  return (
    <Tabs.Root defaultValue="list" className="w-full">
      <Tabs.List
        className={
          "bg-white w-full flex justify-center border-solid border-b-mauve-300 border-b text-sm sticky top-0"
        }
      >
        <Tabs.Tab
          value="list"
          className={"text-mauve-700 h-full px-5 py-2 hover:cursor-pointer"}
        >
          List
        </Tabs.Tab>
        <Tabs.Tab
          value="map"
          className={"text-mauve-700 h-full px-5 py-2 hover:cursor-pointer"}
        >
          Map
        </Tabs.Tab>
        <Tabs.Indicator className="absolute top-0 left-0 -z-1 h-full w-(--active-tab-width) translate-x-(--active-tab-left) border-b-mauve-600 border-b-4 transition-[translate,width] duration-150 ease-in-out" />
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
