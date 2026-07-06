import fs from "fs";
import path from "path";
import bbox from "@turf/bbox";
import center from "@turf/center";
import simplify from "@turf/simplify";
import "dotenv/config";

const geojson = JSON.parse(
  fs.readFileSync("./src/assets/data.geojson", "utf-8"),
);

const STYLE = "mapbox/streets-v12"; // style compatibile con Static API
const WIDTH = 600;
const HEIGHT = 600;
const BEARING = 30;
const PITCH = 45;
const TOKEN = process.env.VITE_MAPBOX_ACCESS_TOKEN;

const OUTPUT_DIR = "./public/static-maps";
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function calculateZoom(bounds, width, height, padding = 40) {
  const WORLD_DIM = { width: 256, height: 256 };
  const ZOOM_MAX = 20;
  function latRad(lat) {
    const sin = Math.sin((lat * Math.PI) / 180);
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }
  function zoomFraction(mapPx, worldPx, fraction) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }
  const [minLng, minLat, maxLng, maxLat] = bounds;
  const latFraction = (latRad(maxLat) - latRad(minLat)) / Math.PI;
  const lngDiff = maxLng - minLng;
  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;
  const latZoom = zoomFraction(
    height - padding * 2,
    WORLD_DIM.height,
    latFraction,
  );
  const lngZoom = zoomFraction(
    width - padding * 2,
    WORLD_DIM.width,
    lngFraction,
  );
  return Math.min(latZoom, lngZoom, ZOOM_MAX);
}

function slugify(name) {
  return name
    .toLowerCase()
    .substring(0, 30)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const manifest = {};

for (const feature of geojson.features) {
  const name = feature.properties.Name;
  const slug = slugify(name);

  const simplified = simplify(feature, {
    tolerance: 0.0003,
    highQuality: false,
  });
  const overlayGeojson = {
    type: "Feature",
    geometry: simplified.geometry,
    properties: {
      stroke: "#ff2d6b",
      "stroke-width": 3,
      "stroke-opacity": 1,
      fill: "#ff2d6b",
      "fill-opacity": 0.15,
    },
  };

  const bounds = bbox(feature);
  const featureCenter = center(feature).geometry.coordinates;
  const zoom = calculateZoom(bounds, WIDTH, HEIGHT) - 0.5; // offset empirico per il pitch

  const encoded = encodeURIComponent(JSON.stringify(overlayGeojson));
  const requestUrl =
    `https://api.mapbox.com/styles/v1/${STYLE}/static/geojson(${encoded})` +
    `/auto/${WIDTH}x${HEIGHT}@2x?padding=250&access_token=${TOKEN}`;

  console.log(`Scarico immagine per "${name}"...`);

  const res = await fetch(requestUrl);
  if (!res.ok) {
    console.error(`Errore per "${name}": ${res.status} ${res.statusText}`);
    continue;
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const filename = `${slug}.png`;
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), buffer);

  manifest[name] = {
    file: `/static-maps/${filename}`,
    width: WIDTH,
    height: HEIGHT,
  };

  // pausa per non martellare l'API con richieste troppo ravvicinate
  await new Promise((r) => setTimeout(r, 200));
}

fs.writeFileSync(
  "./src/assets/staticmaps.json",
  JSON.stringify(manifest, null, 2),
);
console.log(
  `Fatto: ${Object.keys(manifest).length} immagini salvate in ${OUTPUT_DIR}`,
);
