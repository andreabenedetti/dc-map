import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import staticMaps from "../assets/staticmaps.json";

function StaticMap({ name }) {
  const entry = staticMaps[name];

  if (!entry) {
    return (
      <div className="w-full h-full bg-mauve-100 flex items-center justify-center text-xs text-mauve-300 text-center">
        Mappa non disponibile
      </div>
    );
  }

  return (
    <Zoom>
      <img
        src={`${import.meta.env.BASE_URL}${entry.file}`}
        alt={`Mappa di ${name}`}
        width={entry.width}
        height={entry.height}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </Zoom>
  );
}

export default StaticMap;
