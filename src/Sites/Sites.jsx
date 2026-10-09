import { Accordion } from "@base-ui/react";
import Sheet from "./Sheet";

function Sites({ data }) {
  return (
    <>
      <div className="container mx-auto my-10 px-4 sm:px-0 sm:max-w-4xl">
        <h2 className="font-serif text-3xl">Siti interessati</h2>
        <p className="mb-8">Quando si parla dei progetti di costruzione dei data center, spesso si fa riferimento a singole strutture. Molto spesso, tuttavia, queste strutture sorgono o sorgeranno in prossimità tra loro. In questa sezione puoi trovare le informazioni su dove si concentrano i progetti che stiamo monitorando.</p>
      </div>
      <div className="container mx-auto px-4 sm:px-0">
        {data.map((site) => (
          <Sheet site={site} siteName={site.site} projects={site.projects} />
        ))}
      </div>
    </>
  );
}

export default Sites;
