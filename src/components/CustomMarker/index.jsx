// CustomMarker.jsx - Separate this into its own component for better maintainability
import React, { useEffect, useRef } from "react";
import { Marker } from "@react-google-maps/api";

const CustomMarker = ({ property, selectedColor, handleMarkerClick, markerIcons }) => {
  const markerRef = useRef(null);
  
  // Handle actual marker click
  const onMarkerClick = () => {
    if (property && handleMarkerClick) {
      handleMarkerClick(property);
    }
  };
  
  // Apply enhanced clickability fixes after marker is rendered
  useEffect(() => {
    // Short delay to ensure the marker DOM element is available
    const timeoutId = setTimeout(() => {
      try {
        // Find the marker's img element in the DOM
        const markerElement = document.querySelector(`img[src="${markerIcons[selectedColor] || markerIcons.default}"]`);
        
        if (markerElement) {
          // Apply enhanced clickability styles
          markerElement.style.pointerEvents = 'auto';
          markerElement.style.cursor = 'pointer';
          markerElement.style.zIndex = '9999';
          
          // Add a direct click event listener as a backup
          markerElement.addEventListener('click', onMarkerClick);
        }
      } catch (error) {
        console.error("Error enhancing marker clickability:", error);
      }
    }, 100);
    
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      
      try {
        // Find and clean up the marker element when component unmounts
        const markerElement = document.querySelector(`img[src="${markerIcons[selectedColor] || markerIcons.default}"]`);
        
        if (markerElement) {
          markerElement.removeEventListener('click', onMarkerClick);
        }
      } catch (error) {
        // Ignore cleanup errors
      }
    };
  }, [property, selectedColor, markerIcons]);
  
  // Only render if we have valid coordinates
  if (!property.latitud || !property.longitud) {
    return null;
  }
  
  return (
    <Marker
      ref={markerRef}
      position={{
        lat: property.latitud,
        lng: property.longitud,
      }}
      onClick={onMarkerClick}
      icon={{
        url: markerIcons[selectedColor] || markerIcons.default,
        scaledSize: new window.google.maps.Size(25, 35),
      }}
      options={{
        clickable: true,
        zIndex: 1000
      }}
    />
  );
};

export default CustomMarker;