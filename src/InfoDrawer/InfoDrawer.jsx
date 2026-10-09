import { Drawer } from "@base-ui/react/drawer";
import { XIcon, InfoIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { Button } from "@base-ui/react";

function InfoDrawer() {
  return (
    <Drawer.Root swipeDirection="right">
      <Drawer.Trigger className="rounded-full hover:bg-white/20 p-1 transition-all hover:cursor-pointer">
        <InfoIcon size={24} />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="[--backdrop-opacity:0.2] [--bleed:3rem] dark:[--backdrop-opacity:0.7] fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute" />
        <Drawer.Viewport className="[--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0rem] fixed inset-0 flex items-stretch justify-end p-(--viewport-padding)">
          <Drawer.Popup className="[--bleed:3rem] supports-[-webkit-touch-callout:none]:[--bleed:0px] h-full w-[calc(40rem+3rem)] max-w-[calc(100vw-3rem+3rem)] -mr-[3rem] bg-white dark:bg-neutral-900 p-8 pr-[calc(1.5rem+3.5rem)] text-olive-950 dark:text-olive-200 outline-none overflow-y-auto overscroll-contain touch-auto [transform:translateX(var(--drawer-swipe-movement-x))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-ending-style:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-starting-style:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:w-[20rem] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-3rem)] supports-[-webkit-touch-callout:none]:pr-6">
            <Drawer.Content className="mx-auto w-full">
              <div className="flex justify-between items-center border-b border-b-slate-200 dark:border-b-indigo-600 pb-4 mb-4">
                <Drawer.Title className="font-serif text-2xl">
                  Sul progetto
                </Drawer.Title>
                <Drawer.Close className="p-2 hover:cursor-pointer hover:bg-blue-100 transition-colors rounded-full">
                  <XIcon size={16} />
                </Drawer.Close>
              </div>

              <Drawer.Description className="mb-6 space-y-2">
                "Fortezze AI" è un progetto avviato da NINA - Né intelligente né artificiale. NINA è un collettivo di cittadinə, ricercatorə e lavoratorə che analizza, critica e contrasta le dinamiche di potere legate all’intelligenza artificiale. Studiamo come l’AI trasforma la società. Costruiamo reti di resistenza tra attivistə. Diamo vita a immaginari alternativi con azioni concrete per chi abita un mondo sempre più esposto agli algoritmi. Per costruire questa mappatura, stiamo raccogliendo tutti i progetti
                pubblicamente disponibili sul sito del{" "}
                <a href="https://va.mite.gov.it/it-IT/Ricerca/Via" target="">
                  Ministero dell'Ambiente e della Sicurezza Energetica
                </a>
                , letto i documenti e estrapolato le informazioni sulle aree del
                territorio che verranno impattate da questi progetti. Sul portale, con la parola chiave “data center” e “datacenter”,
                vengono restituiti 44 progetti rilevanti in Lombardia: questi
                progetti riguardano{" "}
                <b>
                  nuovi data center, espansioni di data center esistenti, la
                  costruzione di gruppi energetici aggiuntivi, e la costruzione di
                  pozzi per il trattamento delle acque.
                </b> I progetti presentano molti documenti di descrizione del progetto,
                dagli studi di fattibilità, agli impatti ambientali, fino alle
                planimetrie dei data centers. Abbiamo ridisegnato le aree
                geografiche interessate su Google Earth e compilato tutte le aree in
                un unico file geografico che ci permettesse di avere una visione
                d'insieme.
              </Drawer.Description>
              <a href="https://www.nina.watch/manifesto.html" target="_blank"><div className="flex py-2 w-full border-solid border-b border-b-slate-200 font-serif text-lg justify-between hover:p-2 hover:bg-slate-100 transition-all items-center">I venti passi di NINA <ArrowUpRightIcon size={18}/></div></a>
              <a href="https://www.nina.watch/incontri.html" target="_blank"><div className="flex py-2 w-full border-solid border-b border-b-slate-200 font-serif text-lg justify-between hover:p-2 hover:bg-slate-100 transition-all items-center">Le nostre iniziative <ArrowUpRightIcon size={18}/></div></a>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default InfoDrawer;
