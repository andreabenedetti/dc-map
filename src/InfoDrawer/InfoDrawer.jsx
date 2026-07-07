import { Drawer } from "@base-ui/react/drawer";
import { XIcon, InfoIcon } from "@phosphor-icons/react";

function InfoDrawer() {
  return (
    <Drawer.Root swipeDirection="right">
      <Drawer.Trigger className="rounded-full hover:bg-white/20 p-1 transition-all hover:cursor-pointer">
        <InfoIcon size={24} />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="[--backdrop-opacity:0.2] [--bleed:3rem] dark:[--backdrop-opacity:0.7] fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute" />
        <Drawer.Viewport className="[--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0rem] fixed inset-0 flex items-stretch justify-end p-(--viewport-padding)">
          <Drawer.Popup className="[--bleed:3rem] supports-[-webkit-touch-callout:none]:[--bleed:0px] h-full w-[calc(40rem+3rem)] max-w-[calc(100vw-3rem+3rem)] -mr-[3rem] bg-white/80 backdrop-blur-sm p-8 pr-[calc(1.5rem+3.5rem)] text-neutral-950 outline-none overflow-y-auto overscroll-contain touch-auto [transform:translateX(var(--drawer-swipe-movement-x))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-ending-style:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-starting-style:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:w-[20rem] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-3rem)] supports-[-webkit-touch-callout:none]:pr-6">
            <Drawer.Content className="mx-auto w-full">
              <div className="flex justify-between align-middle border-b border-b-mauve-300 pb-4 mb-4">
                <Drawer.Title className="font-display text-2xl">
                  Sul progetto
                </Drawer.Title>
                <Drawer.Close className="p-2 hover:cursor-pointer hover:bg-white/50 transition-colors rounded-full">
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
                <p>
                  Questo progetto nasce all'interno del collettivo NINA - Né
                  intelligente, né artificiale.
                </p>
              </Drawer.Description>
              <div className="flex justify-end gap-3"></div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default InfoDrawer;
