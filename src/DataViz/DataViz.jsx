import * as Plot from "@observablehq/plot";

import VizConstructor from "./VizConstructor";
import tipologiaProgetti from "./data/tipologia-progetti.json"
import acqua from "./data/acqua-progetto.json";
import annoAvvio from "./data/anno-avvio.json";
import periodo from "./data/start-end.json";
import all from "./data/all.json";
import compagnie from "./data/compagnie-anno.json";
import ateco from "./data/ateco.json";
import fondazione from "./data/fondazione-avvio.json";
import raw from "./data/countries-value.geojson?raw";
const countries = JSON.parse(raw);

const atecoDates = ateco.map(d => ({
  ...d,
  date: new Date(+d.date, 0, 1),
  count: +d.count
}));

// ---------- Visualizzazione "fondazione impresa → avvio VIA" ----------
const LOLLI = "oklch(51.1% 0.262 276.966)";
const ORANGE = "rgb(255, 114, 92)";

const LABEL_ISCRIZIONE = "Anno di iscrizione dell'impresa";
const LABEL_AVVIO = "Anno di avvio della procedura VIA";

// Layout delle etichette
const MARGIN_LEFT = 300;
const MAX_CHARS = 40;   // caratteri per riga (con MARGIN_LEFT 300)
const LINE_H = 14;      // interlinea in px
const GAP = 4;          // spazio tra azienda e nome progetto
const ROW_PAD = 24;     // aria sopra/sotto ogni progetto
const MARGIN_TOP = 40;
const MARGIN_BOTTOM = 30;
const TEXT_X = -MARGIN_LEFT + 8; // testo allineato a sinistra, vicino al bordo

function wrap(text, max) {
  const lines = [];
  let cur = "";
  for (const w of text.trim().split(/\s+/)) {
    if (!cur) cur = w;
    else if ((cur + " " + w).length <= max) cur += " " + w;
    else { lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines;
}

let cursor = MARGIN_TOP;
const companyLabels = [];
const projectLabels = [];
const fondazioneRows = fondazione.map(d => {
  const cl = wrap(d.proponente, MAX_CHARS);
  const pl = wrap(d.nome, MAX_CHARS);
  const blockH = (cl.length + pl.length) * LINE_H + GAP;
  const rowH = blockH + ROW_PAD;
  const yc = cursor + rowH / 2;
  const top = yc - blockH / 2;
  cl.forEach((t, i) => companyLabels.push({ y: top + LINE_H * (i + 0.5), text: t }));
  pl.forEach((t, i) => projectLabels.push({ y: top + LINE_H * (cl.length + i + 0.5) + GAP, text: t }));
  cursor += rowH;
  // yl: altezza della prima riga del nome azienda (dove sta il lollipop)
  return { ...d, yc, yl: top + LINE_H * 0.5 };
});
const FONDAZIONE_HEIGHT = cursor + MARGIN_BOTTOM;
// ----------------------------------------------------------------------

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
        <VizConstructor
          title="Quanto sono giovani le aziende che propongono i progetti?"
          id="fondazione"
          description="Per ogni progetto, la linea collega l'anno di iscrizione dell'impresa proponente all'anno di avvio della procedura di VIA. Alcune aziende esistono da decenni, altre sono state costituite poco prima di presentare il progetto. Sono mostrati i 36 progetti per cui abbiamo entrambi gli anni."
            source="Camera di Commercio (Registro delle Imprese); Ministero dell'Ambiente e della Sicurezza Energetica (procedure di VIA); elaborazione degli autori."
options={{
            height: FONDAZIONE_HEIGHT,
            marginLeft: MARGIN_LEFT,
            marginTop: MARGIN_TOP,
            marginBottom: MARGIN_BOTTOM,
            x: { label: "Anno", axis: "top", grid: true, tickFormat: "d" },
            y: { type: "identity", axis: null },
            color: {
              domain: [LABEL_ISCRIZIONE, LABEL_AVVIO],
              range: [LOLLI, ORANGE],
            },
            symbol: {
              legend: true,
              domain: [LABEL_ISCRIZIONE, LABEL_AVVIO],
              range: ["circle", "diamond2"],
            },
            marks: [
              // Azienda: grassetto, colore lolli, allineata a sinistra
              Plot.text(companyLabels, {
                y: "y", text: "text",
                frameAnchor: "left", textAnchor: "start", dx: TEXT_X,
                fontSize: 11, fontWeight: "bold", fill: LOLLI,
              }),
              // Nome del progetto: corsivo, arancio, allineato a sinistra
              Plot.text(projectLabels, {
                y: "y", text: "text",
                frameAnchor: "left", textAnchor: "start", dx: TEXT_X,
                fontSize: 10, fontStyle: "italic", fill: ORANGE,
              }),
              // Linea di collegamento nera, sottile
              Plot.link(fondazioneRows, {
                x1: "iscrizione", x2: "avvio", y1: "yl", y2: "yl",
                stroke: "#000", strokeWidth: 1,
              }),
              Plot.dot(fondazioneRows, {
                x: "iscrizione", y: "yl",
                symbol: () => LABEL_ISCRIZIONE,
                fill: () => LABEL_ISCRIZIONE, r: 4,
                tip: true,
                title: d => `${d.proponente}\n${d.nome}\nIscrizione: ${d.iscrizione}`,
              }),
              Plot.dot(fondazioneRows, {
                x: "avvio", y: "yl",
                symbol: () => LABEL_AVVIO,
                fill: () => LABEL_AVVIO, r: 5,
                tip: true,
                title: d => `${d.proponente}\n${d.nome}\nAvvio VIA: ${d.avvio}`,
              }),
            ],
          }}
        />
      </div>
    </div>
  );
}