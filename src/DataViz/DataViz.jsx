import * as Plot from "@observablehq/plot";
import { hierarchy, pack } from "d3-hierarchy";

import VizConstructor from "./VizConstructor";
import tipologiaProgetti from "./data/tipologia-progetti.json";
import acqua from "./data/acqua-progetto.json";
import annoAvvio from "./data/anno-avvio.json";
import ateco from "./data/ateco.json";
import fondazione from "./data/fondazione-avvio.json";
import raw from "./data/countries-value.geojson?raw";
import societa from "./data/societa-veicolo.json";
import areaRaw from "./data/comuni-area-milano.geojson?raw";
import concentrazione from "./data/concentrazione-comuni-siti-progetti.json";

const comuni = concentrazione.comuni;
const area = JSON.parse(areaRaw);
const countries = JSON.parse(raw);

const atecoDates = ateco.map(d => ({
  ...d,
  date: new Date(+d.date, 0, 1),
  count: +d.count,
}));

// ---------- Visualizzazione "fondazione impresa → avvio VIA" ----------

const LOLLI = "oklch(51.1% 0.262 276.966)";
const ORANGE = "rgb(255, 114, 92)";

const LABEL_ISCRIZIONE = "Anno di iscrizione dell'impresa";
const LABEL_AVVIO = "Anno di avvio della procedura VIA";

const veicoli = societa.filter(d => d.eta != null);
const societaPerId = new Map(
  societa.map(d => [Number(d.id), d])
);
const conteggioProgetti = new Map();

for (const progetto of veicoli) {
  conteggioProgetti.set(
    progetto.gruppo,
    (conteggioProgetti.get(progetto.gruppo) ?? 0) + 1
  );
}

const gruppiVeicoli = [...conteggioProgetti.keys()].sort(
  (a, b) =>
    conteggioProgetti.get(b) - conteggioProgetti.get(a) ||
    a.localeCompare(b, "it")
);

const rPx = n => 3 + 27 * Math.sqrt(n / 12);

// ---------- Layout cerchi sulla mappa ----------

const MAP_WIDTH = 760;
const MAP_HEIGHT = 560;
const RAD = Math.PI / 180;

const mercatorY = lat =>
  Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2));

const lonSpan = (9.66 - 8.80) * RAD;
const latSpan = mercatorY(45.77) - mercatorY(45.20);

const mapScale = Math.min(
  MAP_WIDTH / lonSpan,
  MAP_HEIGHT / latSpan
);

// Sposta i cerchi del packing attorno al centro geografico del comune.
function offsetGeo(lon, lat, dx, dy) {
  const shiftedLon = lon + dx / (mapScale * RAD);
  const shiftedMercatorY = mercatorY(lat) - dy / mapScale;
  const shiftedLat =
    (2 * Math.atan(Math.exp(shiftedMercatorY)) - Math.PI / 2) / RAD;

  return {
    lon: shiftedLon,
    lat: shiftedLat,
  };
}

const comuniMappa = [];
const sitiMappa = [];
const progettiMappa = [];
for (const comune of comuni) {
  const raggioComune = rPx(comune.progetti);

  const root = hierarchy({
    children: comune.siti.map(sito => ({
      ...sito,
      children: sito.progetti.map(progetto => ({
        ...progetto,
        value: 1,
      })),
    })),
  })
    .sum(d => d.value ?? 0)
    .sort((a, b) => b.value - a.value);

  pack()
    .size([raggioComune * 2, raggioComune * 2])
    .padding(2)(root);

  comuniMappa.push({
    ...comune,
    raggio: raggioComune,
  });

  for (const sitoNode of root.children ?? []) {
    const sitoPos = offsetGeo(
      comune.lon,
      comune.lat,
      sitoNode.x - raggioComune,
      sitoNode.y - raggioComune
    );

    sitiMappa.push({
      ...sitoPos,
      raggio: sitoNode.r,
      comune: comune.comune,
      nome: sitoNode.data.sito,
      numeroProgetti: sitoNode.data.progetti.length,
    });

    for (const progettoNode of sitoNode.children ?? []) {
      const progettoPos = offsetGeo(
        comune.lon,
        comune.lat,
        progettoNode.x - raggioComune,
        progettoNode.y - raggioComune
      );

const progetto = progettoNode.data;
const datiImpresa = societaPerId.get(Number(progetto.id));

progettiMappa.push({
  ...progettoPos,
  comune: comune.comune,
  sito: sitoNode.data.sito,
  ...progetto,
  annoNascita:
    datiImpresa?.iscrizione != null
      ? Number(datiImpresa.iscrizione)
      : null,
  proponente: datiImpresa?.proponente ?? progetto.proponente,
});
    }
  }
}

// ---------- Visualizzazione fondazione / avvio VIA ----------

const MARGIN_LEFT = 300;
const MAX_CHARS = 40;
const LINE_H = 14;
const GAP = 4;
const ROW_PAD = 24;
const MARGIN_TOP = 40;
const MARGIN_BOTTOM = 30;
const TEXT_X = -MARGIN_LEFT + 8;

function wrap(text, max) {
  const lines = [];
  let cur = "";

  for (const word of text.trim().split(/\s+/)) {
    if (!cur) {
      cur = word;
    } else if ((cur + " " + word).length <= max) {
      cur += " " + word;
    } else {
      lines.push(cur);
      cur = word;
    }
  }

  if (cur) lines.push(cur);
  return lines;
}

let cursor = MARGIN_TOP;
const companyLabels = [];
const projectLabels = [];

const fondazioneRows = fondazione.map(d => {
  const companyLines = wrap(d.proponente, MAX_CHARS);
  const projectLines = wrap(d.nome, MAX_CHARS);
  const blockH = (companyLines.length + projectLines.length) * LINE_H + GAP;
  const rowH = blockH + ROW_PAD;
  const yc = cursor + rowH / 2;
  const top = yc - blockH / 2;

  companyLines.forEach((text, i) => {
    companyLabels.push({
      y: top + LINE_H * (i + 0.5),
      text,
    });
  });

  projectLines.forEach((text, i) => {
    projectLabels.push({
      y: top + LINE_H * (companyLines.length + i + 0.5) + GAP,
      text,
    });
  });

  cursor += rowH;

  return {
    ...d,
    yc,
    yl: top + LINE_H * 0.5,
  };
});

const FONDAZIONE_HEIGHT = cursor + MARGIN_BOTTOM;

const progettiConAnno = progettiMappa.filter(
  d => Number.isFinite(d.annoNascita)
);

const progettiSenzaAnno = progettiMappa.filter(
  d => !Number.isFinite(d.annoNascita)
);

const anniImpresa = progettiConAnno.map(d => d.annoNascita);
const annoMin = Math.min(...anniImpresa);
const annoMax = Math.max(...anniImpresa);

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

       <VizConstructor
  title="Chi c'è dietro le società che presentano i progetti?"
  id="veicolo"
  description="Ogni punto è un progetto, raggruppato per gruppo di riferimento. La posizione indica da quanti anni esisteva l'impresa proponente quando è partita la procedura di VIA. Per 21 progetti su 36 l'impresa era stata costituita al massimo due anni prima (fascia evidenziata): spesso sono società create per un singolo sito. Altri 13 progetti fanno capo a imprese con almeno dieci anni di vita. Per 6 progetti manca l'anno di iscrizione."
  source="Camera di Commercio (Registro delle Imprese); Ministero dell'Ambiente (procedure di VIA); elaborazione degli autori."
  options={{
    width: 760,
    height: gruppiVeicoli.length * 46 + 120,
    marginLeft: 200,
    marginTop: 50,
    marginRight: 30,
    x: {
      type: "sqrt",
      domain: [0, 50],
      ticks: [0, 1, 2, 5, 10, 20, 50],
      grid: true,
      axis: "top",
      inset: 10,
      label: "Anni di vita dell'impresa all'avvio della procedura di VIA →"
    },
    fy: {
      domain: gruppiVeicoli,
      label: null,
      tickSize: 0
    },
    marks: [
      Plot.rectX([{ a: 0, b: 2 }], {
        x1: "a",
        x2: "b",
        fill: "currentColor",
        fillOpacity: 0.06
      }),
      Plot.dot(veicoli, Plot.dodgeY({
        x: "eta",
        fy: "gruppo",
        fill: "#111111",
        r: 5,
        anchor: "middle",
        padding: 1.5,
        tip: true,
        title: d =>
          `${d.proponente}\nGruppo: ${d.gruppo}\nIscritta nel ${d.iscrizione}, VIA avviata nel ${d.avvio}\n(${d.eta} anni di vita)`
      }))
    ]
  }}
/>

<VizConstructor
  title="Dove si concentrano i data center?"
  id="concentrazione"
  description="Il cerchio grande indica il comune; i cerchi al suo interno rappresentano i siti e i singoli progetti VIA. Il colore dei progetti indica l'anno di iscrizione dell'impresa proponente: più chiaro per gli anni più lontani, più scuro per quelli recenti. La disposizione interna non indica la posizione geografica esatta dei siti."
  source="Ministero dell'Ambiente (procedure di VIA); Registro delle Imprese; confini comunali ISTAT; elaborazione degli autori."
  options={{
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    margin: 0,
    zoom: { scaleExtent: [1, 8] },
    r: { type: "identity" },
    color: {
      type: "linear",
      scheme: "Purples",
      domain: [annoMin, annoMax],
      legend: true,
      label: "Anno di iscrizione dell'impresa proponente",
    },
    projection: {
      type: "mercator",
      domain: {
        type: "MultiPoint",
        coordinates: [
          [8.8, 45.2],
          [9.66, 45.77],
        ],
      },
    },
    marks: [
      // Confini comunali: niente riempimento azzurrino, bordi sottili
      Plot.geo(area, {
        fill: "#fff",
        stroke: "#d1d5db",
        strokeWidth: 0.25,
      }),

      // Etichetta di Milano
      Plot.text(
        [{ lon: 9.19, lat: 45.4642, t: "MILANO" }],
        {
          x: "lon",
          y: "lat",
          text: "t",
          fill: "#9ca3af",
          fontSize: 11,
          fontWeight: "bold",
          letterSpacing: 2,
        }
      ),

      // Cerchi esterni: comuni
      Plot.dot(comuniMappa, {
        x: "lon",
        y: "lat",
        r: "raggio",
        fill: "#111",
        fillOpacity: 0.1,
        stroke: "#111",
        strokeWidth: 0.7,
        tip: true,
        title: d =>
          `${d.comune} (${d.provincia})\n${d.numero_siti} siti · ${d.progetti} progetti`,
      }),

      // Cerchi intermedi: siti
      Plot.dot(sitiMappa, {
        x: "lon",
        y: "lat",
        r: "raggio",
        fill: "#111",
        fillOpacity: 0.1,
        stroke: "#111",
        strokeWidth: 0.5,
        tip: true,
        title: d =>
          `${d.nome}\nComune: ${d.comune}\n${d.numeroProgetti} progetti VIA`,
      }),

      // Progetti con anno noto: colore chiaro → scuro in base all'anno
      Plot.dot(progettiConAnno, {
  x: "lon",
  y: "lat",
  r: 4,
  fill: "annoNascita",
  stroke: "#fff",
  strokeWidth: 0.8,
  tip: true,
  title: d =>
    `${d.nome}\nSito: ${d.sito}\nComune: ${d.comune}\nProponente: ${d.proponente}\nAnno di iscrizione: ${d.annoNascita}`,
}),

Plot.dot(progettiSenzaAnno, {
  x: "lon",
  y: "lat",
  r: 4,
  fill: "#bdbdbd",
  stroke: "#fff",
  strokeWidth: 0.8,
  tip: true,
  title: d =>
    `${d.nome}\nSito: ${d.sito}\nComune: ${d.comune}\nProponente: ${d.proponente}\nAnno di iscrizione non disponibile`,
}),

      // Etichette dei comuni con almeno due progetti
      ...comuniMappa
        .filter(d => d.progetti >= 2)
        .map(d =>
          Plot.text([d], {
            x: "lon",
            y: "lat",
            text: "comune",
            dy: -(d.raggio + 7),
            fontSize: 10,
            fontWeight: "bold",
            fill: "#111",
            stroke: "#fff",
            strokeWidth: 3,
            strokeLinejoin: "round",
          })
        ),
    ],
  }}
/>
      </div>
    </div>
  );
}