import React, { useState } from 'react';
import { Marker } from '@react-google-maps/api';

const MapMarkers = ({
  displayedProperties,
  markerIcons,
  selectedColor,
  handleMarkerClick,
}) => {
  // State to track which marker was clicked (active)
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);

  // Wrapper that updates active marker index and calls the async click handler
  const onMarkerClick = async (property, index) => {
    setActiveMarkerIndex(index);
    await handleMarkerClick(property);
  };

  // Conditionally create the marker icon size if the Google Maps API is loaded
  const iconSize =
    window.google && window.google.maps
      ? new window.google.maps.Size(25, 35)
      : null;

  return (
    <>
      {displayedProperties.length > 0 &&
        displayedProperties.map(
          (property, index) =>
            property.latitud &&
            property.longitud && (
              <Marker
                key={index}
                position={{
                  lat: property.latitud,
                  lng: property.longitud,
                }}
                onClick={() => onMarkerClick(property, index)}
                icon={{
                  url:
                    activeMarkerIndex === index
                      ? markerIcons.afterClick // change to clicked icon
                      : markerIcons[selectedColor] || markerIcons.blue,
                  ...(iconSize && { scaledSize: iconSize }),
                }}
              />
            )
        )}
    </>
  );
};

export default MapMarkers;
