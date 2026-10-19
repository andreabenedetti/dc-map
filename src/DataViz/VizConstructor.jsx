import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { XIcon } from "@phosphor-icons/react";

const btn =
  "flex h-40 items-center justify-start gap-2 bg-white dark:bg-neutral-950 p-4 break-normal text-2xl/7 font-serif text-slate-600 dark:text-white select-none hover:not-data-disabled:bg-indigo-100 dark:hover:not-data-disabled:bg-indigo-800 active:not-data-disabled:bg-indigo-200 dark:active:not-data-disabled:bg-indigo-700 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-indigo-950 dark:focus-visible:outline-white hover:cursor-pointer transition-all duration-200 text-center";

function PlotView({ options }) {
  const ref = useRef(null);

  useEffect(() => {
    const plot = Plot.plot(options);
    ref.current.append(plot);
    return () => plot.remove();
  }, [options]);

  return <div ref={ref} className="min-w-fit" />;
}

function VizConstructor({ title, description, options, id, source }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={btn}>{title}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-50" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 flex max-h-[calc(100dvh-3rem)] max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 bg-white dark:bg-neutral-950 p-6 text-neutral-950 dark:text-white transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
          <div className="flex justify-between gap-3 pb-3 border-b border-b-slate-200 shrink-0">
            <Dialog.Title className="font-serif text-3xl">{title}</Dialog.Title>
            <Dialog.Close className="p-2 px-2.5 hover:cursor-pointer hover:bg-blue-100 transition-colors rounded-full">
              <XIcon size={16} />
            </Dialog.Close>
          </div>
          <p className="shrink-0">{description}</p>
          <div className="overflow-auto min-h-0">
            <PlotView id={id} options={options} />
          </div>
          {source && (
            <p className="shrink-0 pt-3 border-t border-t-slate-200 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Fonte dati:</span> {source}
            </p>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default VizConstructor;