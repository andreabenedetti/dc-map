import { Accordion } from "@base-ui/react";
import { PlusIcon } from "@phosphor-icons/react";

import glossary from "../assets/glossario.json";

function Glossary({ term, definition }) {
  return (
    <>
      <Accordion.Root className="w-full border-t border-blue-100 dark:border-b-olive-600 text-neutral-950 dark:text-olive-200 mt-8 font-sans">
        {glossary.map(g => (
          <Accordion.Item className="border-b border-blue-100 dark:border-b-olive-600">
            <Accordion.Header>
              <Accordion.Trigger className="group accordion-trigger">
                <h4 className="font-serif text-lg font-semibold">
                  {g.term}
                </h4>
                <PlusIcon
                  size={16}
                  className="transition-transform duration-100 ease-[ease-out] group-data-panel-open:rotate-45"
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-150 ease-[ease-out] data-ending-style:h-0 data-starting-style:h-0">
              <div className="px-3 py-2">{g.definition}</div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </>
  );
}

export default Glossary;
