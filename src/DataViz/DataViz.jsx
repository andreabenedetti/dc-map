import * as Plot from "@observablehq/plot";

import VizConstructor from "./VizConstructor";
import tipologiaProgetti from "./data/tipologia-progetti.json"
import acqua from "./data/acqua-progetto.json";
import annoAvvio from "./data/anno-avvio.json";
import periodo from "./data/start-end.json";
import all from "./data/all.json";
import compagnie from "./data/compagnie-anno.json";
import ateco from "./data/ateco.json";
import raw from "./data/countries-value.geojson?raw";
const countries = JSON.parse(raw);

const atecoDates = ateco.map(d => ({
  ...d,
  date: new Date(+d.date, 0, 1),
  count: +d.count
}));


export default function DataViz() {
  return (
    <div className="container mx-auto my-10 px-4 sm:px-0 sm:max-w-4xl">
      <h2 className="font-serif text-3xl">Analisi dei dati</h2>
      <p className="mb-8">A partire dai dati estrapolati dal monitoraggio e dai documenti pubblicati sul sito del Ministero, abbiamo creato alcuni grafici che riassumono alcune numeriche interessanti a capire che tipo di progetti sono attualmente in atto.</p>
      <p className="mb-8">Scegli una tematica per vedere i dettagli sui dati che abbiamo raccolto.</p>
      <div id="visualizations" className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <VizConstructor
        title="Che tipo di progetti sono in cantiere nei siti interessati?"
        description="Non tutti i progetti sono uguali. Se la maggior parte dei progetti prevede la costruzione di nuovi data centers, in alcuni casi si tratta di ampliare strutture esistenti o di installare nuove infrastrutture che supportino il fabbisogno energetico."
        id="progetti"
        options={{
          grid: true,
          marginLeft: 100,
          fy: { label: null },
          color: {legend: true},
          marks: [
            Plot.barX(tipologiaProgetti, Plot.stackX({
              x: "value",
              fy: "site",
              fill: "category",
              inset: 0
            })),
          ]
        }}
        />
        <VizConstructor
        title="Come si riforniscono di acqua le strutture?"
        description="Come viene fornita acqua ai data centers? La maggior parte si allaccia agli acquedotti pubblici, tuttavia le nuove costruzioni usano di riutilizzo di acque di scarto o attingono dalle falde acquifere. Di molti progetti non questa informazione non è resa nota."
        id="acqua"
        options={{
          grid: true,
          marginLeft: 100,
          y: { label: "Numero di progetti" },
          x: {label: "Tipologia di progetto"},
          color: {legend: true},
          marks: [
            Plot.barY(acqua, {
              y: "value",
              x: "projectType",
              fill: "category",
              tip: "x"
            }),
          ]
        }}
        />
        <VizConstructor
        title="Quando sono stati avviati i progetti?"
        id="avvio"
        description="Quando sono iniziati i lavori ai nuovi data center? Notiamo come nel 2024 ci sia il numero più alto di progetti avviati e soggetti a Verifica di Impatto Ambientale. Subito dopo al 2024, il 2025 è l'anno con il maggior numero di avvio dei progetti."
        options={{
          x: { label: "Anno di avvio" },
          y: { label: "Numero progetti" },
          marks: [
            Plot.barY(annoAvvio, { x: "year", y: "count", fill: "oklch(51.1% 0.262 276.966)" }),
          ]
        }}
        />
        <VizConstructor
        title="Da dove provengono le aziende proponenti?"
          id="countries"
          description="Sono molte le aziende che propongono progetti, e hanno sempre sede in Italia per poter operare nell'ambito delle costruzioni delle strutture. Tuttavia, molte di queste aziende fanno riferimento ad aziende multinazionali, come Amazon Italia fa riferimento ad Amazon US. A partire dalle aziende che operano in Italia, siamo risalite alle aziende apicali e alla loro sede centrale per capire da dove arriva l'interesse per la costruzione dei data centers."
        options={{
          projection: "equal-earth",
          color: {
            scheme: "Purples",
            legend: true,
            label: "Numero di progetti"
          },
          marks: [
            Plot.graticule(),
            Plot.geo(countries, {fill: "oklch(97% 0.014 254.604)", stroke: "#FFFFFF"}),
            Plot.geo(countries, { fill: "count_unique_key", stroke: "oklch(35.9% 0.144 278.697)", tip: true }),
            Plot.text(countries, Plot.centroid({text: (d) => d.properties.count_unique_key != null ? d.properties.name : null, fill: "#000000", stroke: "white"})),
            Plot.text(countries, Plot.centroid({text: (d) => d.properties.count_unique_key != null ? d.properties.count_unique_key : null, fill: "#000000", dy: 13, stroke: "white"})),
            Plot.sphere(),
          ]
        }}
        />
        <VizConstructor
          title="Quali sono i codici ATECO delle aziende proponenti?"
          id="ateco"
          options={{
            x: { interval: "year" },
            color: {legend: true},
            marks: [
              Plot.barY(atecoDates, {x: "date", y: "count", fill: "group"})
            ]
          }}
          />
      </div>
    </div>
  );
}
