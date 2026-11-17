import { Accordion } from "@base-ui/react";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import Zoom from "react-medium-image-zoom";
import { ScrollArea } from "@base-ui/react";

import "react-medium-image-zoom/dist/styles.css";

function Sheet({ site, siteName, projects }) {
  return (
    <>
      <div className="sm:flex gap-10 my-5">
        <Zoom>
          <img
          src={`/sites-images/${projects[0].siteKey}.png`}
          loading="lazy"
          decoding="async"
          className={"grow"}
          />
        </Zoom>
        <div className="w-full px-4 mt-2 sm:mt-0 sm:px-0 sm:w-xl">
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="text-4xl mt-2 mb-2 font-serif">{siteName}</h3>
            </div>
          </div>
          <p>{site.desc}</p>
          <h4 className="text-xl font-serif mt-4">Progetti</h4>
          <ScrollArea.Root className="h-80 w-100% max-w-[calc(100vw-1rem)]">
            <ScrollArea.Viewport className="h-full border border-blue-100 dark:border-white focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-950 dark:focus-visible:outline-white">
                  <ScrollArea.Content className="flex flex-col gap-4 py-2 pr-5 pl-3 text-sm leading-[1.375rem] text-neutral-950 dark:text-white">
              {projects.map((p) => (
                <div key={p.projectKey}>
                  <p className="text-base"><b>{p.type}</b> da parte di <b>{p.proposer}</b> ({p.country}). Progetto iniziato il <b>{p.startDate}</b>. <a href={p.link} target="_blank">Vedi scheda</a></p>
                </div>
              ))}
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className="m-px flex w-2 justify-center bg-slate-400/12 dark:bg-white/12 opacity-0 transition-opacity pointer-events-none data-hovering:opacity-100 data-hovering:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0 data-scrolling:pointer-events-auto">
            <ScrollArea.Thumb className="w-full bg-slate-400 dark:bg-white" /></ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
      </div>
    </>
  );
}

export default Sheet;
