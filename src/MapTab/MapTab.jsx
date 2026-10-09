import { Tabs } from "@base-ui/react/tabs";
import Map from "../Map/Map";
import MapList from "../MapList/MapList";
import DataViz from "../DataViz/DataViz";
import Sites from "../Sites/Sites";
import { Accordion } from "@base-ui/react";

import { PlusIcon } from "@phosphor-icons/react";

function MapTab({ data }) {
  return (
    <Tabs.Root defaultValue="list" className="w-full">
      <Tabs.List
        className={
          "bg-indigo-950 w-full flex justify-center border-solid border-b-indigo-950 border-b text-sm sticky top-0 text-white"
        }
      >
        <Tabs.Tab
          value="list"
          className={"font-bold h-full px-5 py-3 hover:cursor-pointer"}
        >
          Siti
        </Tabs.Tab>
        <Tabs.Tab
          value="map"
          className={"font-bold h-full px-5 py-3 hover:cursor-pointer"}
        >
          Mappa
        </Tabs.Tab>
        <Tabs.Tab
          value="data"
          className={"font-bold h-full px-5 py-3 hover:cursor-pointer"}
        >
          Dati
        </Tabs.Tab>
        <Tabs.Tab
          value="defs"
          className={"font-bold h-full px-5 py-3 hover:cursor-pointer"}
        >
          Glossario
        </Tabs.Tab>
        <Tabs.Indicator className="absolute top-0 left-0 -z-1 h-full w-(--active-tab-width) translate-x-(--active-tab-left) border-b-indigo-200 border-b-4 transition-[translate,width] duration-150 ease-in-out" />
      </Tabs.List>
      <Tabs.Panel value="map">
        <Map />
      </Tabs.Panel>
      <Tabs.Panel value="data">
        <DataViz />
      </Tabs.Panel>
      <Tabs.Panel value="list">
        <Sites data={data} />
      </Tabs.Panel>
      <Tabs.Panel value="defs">
        <div className="container mx-auto px-4 sm:px-0 sm:max-w-4xl">
          <h3 className="font-serif text-3xl mt-7 my-4">
            Glossario
          </h3>
          <p>
            Sono molti i termini tecnici che si possono incontrare nei documenti di Valutazione di Impatto Ambientale. Qui puoi trovare un glossario che riporta le definizioni di alcuni termini ricorrenti che vengono usati nei documenti e nei discorsi che ruotano attorno ai data centers.
          </p>
          <Accordion.Root className="w-full border-t border-blue-100 dark:border-b-olive-600 text-neutral-950 dark:text-olive-200 mt-8 font-sans">
            <Accordion.Item className="border-b border-blue-100 dark:border-b-olive-600">
              <Accordion.Header>
                <Accordion.Trigger className="group accordion-trigger">
                  <h4 className="font-serif text-lg font-semibold">
                    Verifica di impatto ambientale (VIA)
                  </h4>
                  <PlusIcon
                    size={16}
                    className="transition-transform duration-100 ease-[ease-out] group-data-panel-open:rotate-45"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-150 ease-[ease-out] data-ending-style:h-0 data-starting-style:h-0">
                <div className="px-3 py-2">Definizione</div>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item className="border-b border-blue-100">
              <Accordion.Header>
                <Accordion.Trigger className="group accordion-trigger">
                  <h4 className="font-serif text-lg font-semibold">
                    Valutazione preliminare
                  </h4>
                  <PlusIcon
                    size={16}
                    className="transition-transform duration-100 ease-[ease-out] group-data-panel-open:rotate-45"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-150 ease-[ease-out] data-ending-style:h-0 data-starting-style:h-0">
                <div className="px-3 py-2">Definizione</div>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item className="border-b border-blue-100">
              <Accordion.Header>
                <Accordion.Trigger className="group accordion-trigger">
                  <h4 className="font-serif text-lg font-semibold">
                    Verifica di assoggettabilità VIA
                  </h4>
                  <PlusIcon
                    size={16}
                    className="transition-transform duration-100 ease-[ease-out] group-data-panel-open:rotate-45"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-150 ease-[ease-out] data-ending-style:h-0 data-starting-style:h-0">
                <div className="px-3 py-2">Definizione</div>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item className="border-b border-blue-100">
              <Accordion.Header>
                <Accordion.Trigger className="group accordion-trigger">
                  <h4 className="font-serif text-lg font-semibold">
                    Verifica di ottemperanza
                  </h4>
                  <PlusIcon
                    size={16}
                    className="transition-transform duration-100 ease-[ease-out] group-data-panel-open:rotate-45"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-150 ease-[ease-out] data-ending-style:h-0 data-starting-style:h-0">
                <div className="px-3 py-2">Definizione</div>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion.Root>
        </div>
      </Tabs.Panel>
    </Tabs.Root>
  );
}

export default MapTab;
