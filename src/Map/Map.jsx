import { useRef, useEffect } from "react";
import centroid from "@turf/centroid";
import rawGeojson from "../assets/data.geojson?raw";
const geojson = JSON.parse(rawGeojson);

import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const centroids = [];

for (const feature of geojson.features) {
  const d = centroid(feature);

  centroids.push(d);
}

console.log(centroids);

function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

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
      center: [9.18951, 45.46427],
      zoom: 10,
    });

    mapRef.current.on("load", () => {
      mapRef.current.addSource("datacenters", {
        type: "geojson",
        data: "data.geojson",
      });

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

      mapRef.current.addLayer({
        id: "off-leash-areas",
        type: "symbol",
        source: "datacenters",
        layout: {
          "text-field": ["format", ["get", "Name"], { "font-scale": 0.8 }],
          "text-font": ["DIN Pro Regular"],
        },
        paint: {
          "text-color": "#ff2d6b",
          "text-halo-color": "#FFFFFF",
          "text-halo-width": 2,
          "text-offset": [0, 100],
        },
      });
      // mapRef.current.addSource("centroids", {
      //   type: "geojson",
      //   data: {
      //     type: "FeatureCollection",
      //     features: centroids,
      //   },
      // });

      // mapRef.current.addLayer({
      //   id: "points",
      //   type: "circle",
      //   source: "centroids",
      // });
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <>
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}

export default Map;
