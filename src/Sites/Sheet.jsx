import { Accordion } from "@base-ui/react";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import Zoom from "react-medium-image-zoom";
import { MapPinIcon } from "@phosphor-icons/react";
import { Button } from "@headlessui/react";

import "react-medium-image-zoom/dist/styles.css";

function Sheet({ site, siteName, projects }) {
  return (
    <>
      <div className="sm:flex gap-2 my-10 bg-white">
        <Zoom>
          <img
            src={`/sites-images/${projects[0].siteKey}.png`}
            loading="lazy"
            decoding="async"
            className="w-50vw"
          />
        </Zoom>
        <div className="w-full p-8">
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="text-4xl mt-2 mb-2 font-serif">{siteName}</h3>
            </div>
              <a href={site.link} target="_blank" className="flex items-center gap-1"><MapPinIcon/> Vedi sulla mappa</a>

          </div>
          <p>{site.desc}</p>
          <Accordion.Root className="w-full border-t border-slate-200 dark:border-b-slate-600 text-neutral-950 dark:text-olive-200 mt-8 font-sans">
            <Accordion.Item className="border-b border-slate-200 dark:border-b-slate-600">
              <Accordion.Header>
                <Accordion.Trigger className="group accordion-trigger">
                  <h4 className="font-serif text-lg font-semibold">
                    {projects.length} Progetti
                  </h4>
                  <PlusIcon
                    size={16}
                    className="transition-transform duration-100 ease-[ease-out] group-data-panel-open:rotate-45"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-150 ease-[ease-out] data-ending-style:h-0 data-starting-style:h-0">
                {projects.map((p) => (
                  <div key={p.projectKey} className="px-3 py-2 mb-2">
                    <p className="text-lg font-bold mb-4">{p.name}</p>
                    <p className="mb-2"><a href={p.link} target="_blank">Vedi scheda</a></p>
                    <p className="mb-2">
                      Tipologia di progetto:{" "}
                      <span className="p-1 px-2 bg-indigo-100 text-slate-600 rounded-2xl mr-1">
                        {p.type}
                      </span>
                    </p>
                    <p className="mb-2">
                      Proponente:{" "}
                      <span className="p-1 px-2 bg-indigo-100 text-slate-600 rounded-2xl mr-1">
                        {p.proposer} ({p.country})
                      </span>
                    </p>
                    <p className="mb-2">
                      Periodo dei lavori:{" "}
                      <span className="p-1 px-2 bg-indigo-100 text-slate-600 rounded-2xl mr-1">
                        {p.startDate} → {p.endDate}
                      </span>
                    </p>
                  </div>
                ))}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion.Root>
        </div>
      </div>
    </>
  );
}

export default Sheet;
