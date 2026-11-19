import { useRef, useEffect, useState } from "react";
import centroid from "@turf/centroid";
import rawGeojson from "../assets/data.geojson?raw";
const geojson = JSON.parse(rawGeojson);
import { Button } from "@base-ui/react";
import { CornersOutIcon } from "@phosphor-icons/react/dist/ssr";

import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const centroids = [];
const INITIAL_CENTER = [9.18951, 45.46427]
const INITIAL_ZOOM = 10

for (const feature of geojson.features) {
  const d = centroid(feature);
  centroids.push(d);
}

console.log(centroids);

function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      config: {
        basemap: {
          lightPreset: "daylight",
          showPedestrianRoads: false,
          show3dObjects: true,
        },
      },
      center: center,
      zoom: zoom,
    });

    mapRef.current.on("load", () => {
      mapRef.current.addSource("datacenters", {
        type: "geojson",
        data: "data.geojson",
      });

      mapRef.current.on('move', () => {
        // get the current center coordinates and zoom level from the map
        const mapCenter = mapRef.current.getCenter()
        const mapZoom = mapRef.current.getZoom()

        // update state
        setCenter([ mapCenter.lng, mapCenter.lat ])
        setZoom(mapZoom)
      })

      mapRef.current.addLayer({
        id: "contour",
        type: "line",
        source: "datacenters",
        layout: {},
        paint: {
          "line-color": "#ff2d6b",
          "line-width": 2,
          "line-gap-width": 0,
          "line-cap": "rounded",
          "line-join": "rounded",
        },
      });

      mapRef.current.addLayer({
        id: "footprint",
        type: "fill",
        source: "datacenters",
        layout: {},
        paint: {
          "fill-color": "#ff2d6b",
          "fill-opacity": 0.2,
        },
      });
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  const resetView = () => {
    mapRef.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM
    })
  }

  return (
    <>
      <div className="section-container">
        <h2 className="section-title">Mappa di tutti i progetti</h2>
        <p className="mb-8">Per capire la portata dei progetti dei nuovi data centers, occorre avere anche una visione d'insieme che permetta di fare una panoramica di tutti i progetti. Qui trovi una mappa che mostra tutte le aree interessate da progetti di data centers in Lombardia.</p>
      </div>
      <Button className={"btn-large btn-primary p-2 absolute m-2 z-50"} aria-label="Reset posizione" onClick={resetView}><CornersOutIcon /></Button>
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}

export default Map;
