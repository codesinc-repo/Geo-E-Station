// components/Map/CustomMarker.jsx
import React, { useEffect, useState } from "react";
import { Marker, Circle } from "@react-google-maps/api";
import for_blue from "../../assests/img/for-blue.png";
import For_user from "../../assests/img/For_user_Home.png";
import for_green from "../../assests/img/gps.png";
import for_map from "../../assests/img/for_map.png";

const markerIcons = {
  red: For_user,
  blue: for_blue,
  green: for_green,
  yellow: for_map,
  default: for_map,
};

const CustomMarker = ({ property, selectedColor, handleMarkerClick, isFocused }) => {
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (ref) {
      const markerElement = ref.querySelector("img");
      if (markerElement) {
        markerElement.style.pointerEvents = "auto";
        markerElement.style.cursor = "pointer";
        markerElement.style.zIndex = "9999";
        markerElement.removeEventListener("click", handleClick);
        markerElement.addEventListener("click", handleClick);
      }
    }

    return () => {
      if (ref) {
        const markerElement = ref.querySelector("img");
        if (markerElement) {
          markerElement.removeEventListener("click", handleClick);
        }
      }
    };
  }, [ref, property]);

  const handleClick = (e) => {
    e.stopPropagation();
    handleMarkerClick(property);
  };

  return (
    <>
      <Marker
        position={{ lat: property.latitud, lng: property.longitud }}
        onClick={() => handleMarkerClick(property)}
        icon={{
          url: isFocused ? for_blue : markerIcons[selectedColor] || markerIcons.default,
          scaledSize: new window.google.maps.Size(25, 35),
        }}
      >
        <div ref={setRef} style={{ position: "absolute" }} />
      </Marker>

      {isFocused && (
        <Circle
          center={{ lat: property.latitud, lng: property.longitud }}
          radius={100}
          options={{
            fillColor: "#4d90fe",
            fillOpacity: 0.2,
            strokeColor: "#1a73e8",
            strokeWeight: 1,
            clickable: false,
          }}
        />
      )}
    </>
  );
};

export default CustomMarker;
