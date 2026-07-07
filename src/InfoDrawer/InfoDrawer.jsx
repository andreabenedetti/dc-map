import { Drawer } from "@base-ui/react/drawer";
import { Accordion } from "@base-ui/react";
import { XIcon, InfoIcon, PlusIcon } from "@phosphor-icons/react";

function InfoDrawer() {
  return (
    <Drawer.Root swipeDirection="right">
      <Drawer.Trigger className="rounded-full hover:bg-white/20 p-1 transition-all hover:cursor-pointer">
        <InfoIcon size={24} />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="[--backdrop-opacity:0.2] [--bleed:3rem] dark:[--backdrop-opacity:0.7] fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute" />
        <Drawer.Viewport className="[--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0rem] fixed inset-0 flex items-stretch justify-end p-(--viewport-padding)">
          <Drawer.Popup className="[--bleed:3rem] supports-[-webkit-touch-callout:none]:[--bleed:0px] h-full w-[calc(40rem+3rem)] max-w-[calc(100vw-3rem+3rem)] -mr-[3rem] bg-white p-8 pr-[calc(1.5rem+3.5rem)] text-neutral-950 outline-none overflow-y-auto overscroll-contain touch-auto [transform:translateX(var(--drawer-swipe-movement-x))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-ending-style:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-starting-style:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:w-[20rem] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-3rem)] supports-[-webkit-touch-callout:none]:pr-6">
            <Drawer.Content className="mx-auto w-full">
              <div className="flex justify-between align-middle border-b border-b-mauve-300 pb-4 mb-4">
                <Drawer.Title className="font-display text-2xl">
                  Sul progetto
                </Drawer.Title>
                <Drawer.Close className="p-2 hover:cursor-pointer hover:bg-mauve-100 transition-colors rounded-full">
                  <XIcon size={16} />
                </Drawer.Close>
              </div>

              <Drawer.Description className="mb-6 space-y-2">
                <h2 className="text-3xl font-display">
                  Le nuove fortezze dell'intelligenza artificiale
                </h2>
                <p>
                  "Fortezze AI" raccoglie i progetti in via di valutazione e
                  costruzione dei nuovi data center nei dintorni di Milano.
                  Questi data center hanno svariati usi, ma nascono
                  prevalentemente dalla necessità di computazione per favorire
                  l'adozione di modelli di intelligenza artificiale.
                </p>
                <p>
                  Per costruire questa mappatura, abbiamo raccolto tutti i
                  progetti pubblicamente disponibili sul sito del Ministero
                  dell'Ambiente e della Sicurezza Energetica, letto i documenti
                  e estrapolato le informazioni sulle aree del territorio che
                  verranno impattate da questi progetti.
                </p>
                <p>
                  Sul{" "}
                  <a href="https://va.mite.gov.it/it-IT/Ricerca/">portale</a>,
                  cercando con la parola chiave "data center" e "datacenter", è
                  possibile trovare una trentina di progetti attualmente in
                  valutazione, in opera o in valutazione di ottemperanza.
                </p>
                <h3 className="font-display text-2xl mt-7">
                  Tipologie di procedure avviate
                </h3>
                <p>
                  Sul portale del Ministero, sono tracciati diversi processi di
                  valutazione e approvazione dei progetti. In queste
                  valutazioni, le aziende proponenti sottopongono a una
                  commissione materiali che dimostrino l'impatto che l'opera in
                  atto avrà sul territorio. Le aziende documentano l'impatto
                  attraverso studi, relazioni, prospetti architettonici, e piani
                  di compensazione del territorio.
                </p>
                <Accordion.Root className="w-full border-t border-mauve-300 text-neutral-950 mt-8">
                  <Accordion.Item className="border-b border-mauve-300">
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 bg-transparent px-3 py-2 text-left text-sm font-normal text-neutral-950 select-none hover:not-data-disabled:bg-mauve-100 focus-visible:relative focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-mauve-950 transition-all hover:cursor-pointer">
                        <h4 className="font-display text-lg font-semibold">
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
                  <Accordion.Item className="border-b border-mauve-300">
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 bg-transparent px-3 py-2 text-left text-sm font-normal text-neutral-950 select-none hover:not-data-disabled:bg-mauve-100 focus-visible:relative focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-mauve-950 transition-all hover:cursor-pointer">
                        <h4 className="font-display text-lg font-semibold">
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
                  <Accordion.Item className="border-b border-mauve-300">
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 bg-transparent px-3 py-2 text-left text-sm font-normal text-neutral-950 select-none hover:not-data-disabled:bg-mauve-100 focus-visible:relative focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-mauve-950 transition-all hover:cursor-pointer">
                        <h4 className="font-display text-lg font-semibold">
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
                  <Accordion.Item className="border-b border-mauve-300">
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 bg-transparent px-3 py-2 text-left text-sm font-normal text-neutral-950 select-none hover:not-data-disabled:bg-mauve-100 focus-visible:relative focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-mauve-950 transition-all hover:cursor-pointer">
                        <h4 className="font-display text-lg font-semibold">
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
              </Drawer.Description>
              <div className="flex justify-end gap-3">
                <p>
                  Questo progetto nasce all'interno del collettivo NINA - Né
                  intelligente, né artificiale.
                </p>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default InfoDrawer;
