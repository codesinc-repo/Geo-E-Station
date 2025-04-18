import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MapMarkers from '../components/MapMarkers'; // Adjust the path as needed

// Import marker icon images – ensure these paths match your folder structure
import for_map from "../assests/img/for_map.png";
import For_user from "../assests/img/For_user_Home.png";
import for_after_Click from "../assests/img/For_map_afterclick (2).png";
import for_blue from "../assests/img/for-blue.png";
import for_green from "../assests/img/gps.png";

// Marker icons object
const markerIcons = {
  red: For_user,
  blue: for_blue,
  green: for_green,
  yellow: for_map,
  default: for_map,
  afterClick: for_after_Click,
};

// Dummy function to simulate fetching property details.
// Replace with your actual logic.
const fetchPropertyById = async (id) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id, name: `Property ${id}` }), 500)
  );
};
const userLocation = { lat: 37.7749, lng: -122.4194 };

const Test = () => {
  const [displayedProperties] = useState([
    { idPropiedad: 1, latitud: 37.7749, longitud: -122.4194 },
    { idPropiedad: 2, latitud: 34.0522, longitud: -118.2437 },
  ]);

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [prop, setProp] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const selectedColor = 'blue';

  const handleMarkerClick = async (property) => {
    console.log("Clicked property:", property);

    if (!property.latitud || !property.longitud) {
      console.error("Invalid property coordinates:", property);
      return;
    }

    try {
      const fetchedData = await fetchPropertyById(property.idPropiedad);
      if (!fetchedData) {
        console.error("No data returned for property", property.idPropiedad);
        return;
      }

      const newSelectedProperty = {
        ...fetchedData,
        directions: {
          origin: userLocation,
          destination: { lat: property.latitud, lng: property.longitud },
          travelMode: "DRIVING",
        },
      };

      console.log("New Selected Property:", newSelectedProperty);
      setSelectedProperty(newSelectedProperty);
      setProp((prev) => [...prev, newSelectedProperty]);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  // Load the Google Maps API – ensure your API key is valid.
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "YOUR_API_KEY", // Replace with your actual API key
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 36.0,
    lng: -120.0,
  };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
      <MapMarkers
        displayedProperties={displayedProperties}
        markerIcons={markerIcons}
        selectedColor={selectedColor}
        handleMarkerClick={handleMarkerClick}
      />
      {/* You can add additional components or modals here */}
    </GoogleMap>
  );
};

export default Test;
