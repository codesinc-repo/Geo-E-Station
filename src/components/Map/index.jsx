import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  OverlayView,
  Circle,
} from "@react-google-maps/api";
import axios from "axios";
import { Button } from "react-bootstrap";
import Filters from "../Filters";

import CompanyDetailsModal from "../CompanyDetailsModal/CompanyDetailsModal";
import PDFGenerator from "../PDFGenerator/PDFGenerator";
import { jsPDF } from "jspdf";
import inactive from "../../assests/img/for-inactive.png";
import active from "../../assests/img/for-active.png";

import "./map.css";
import for_map from "../../assests/img/for_map.png";
import For_user from "../../assests/img/For_user_Home.png";
import for_blue from "../../assests/img/for-blue.png";
import EmailModal from "../../components/EmailService";
import for_green from "../../assests/img/gps.png";
import { useNavigate } from "react-router-dom";
import MapDrawingManager from "../MapDrawingManager";

const mapLibraries = ["places", "drawing"];

// Marker icon mapping
const markerIcons = {
  red: For_user,
  blue: for_blue,
  green: for_green,
  yellow: for_map,
  default: for_map,
};

// Custom Marker Component with enhanced clickability
const CustomMarker = ({
  property,
  selectedColor,
  handleMarkerClick,
  isFocused,
}) => {
  const [ref, setRef] = useState(null);

  // Force re-registration of click events after component mounts/updates
  useEffect(() => {
    if (ref) {
      // Add explicit click handler to marker DOM element
      const markerElement = ref.querySelector("img");
      if (markerElement) {
        markerElement.style.pointerEvents = "auto";
        markerElement.style.cursor = "pointer";
        markerElement.style.zIndex = "9999";

        // Remove previous event listener to prevent duplicates
        markerElement.removeEventListener("click", handleClick);

        // Add fresh event listener
        markerElement.addEventListener("click", handleClick);
      }
    }

    // Cleanup function to remove event listener
    return () => {
      if (ref) {
        const markerElement = ref.querySelector("img");
        if (markerElement) {
          markerElement.removeEventListener("click", handleClick);
        }
      }
    };
  }, [ref, property]);

  // Handler function
  const handleClick = (e) => {
    e.stopPropagation();
    handleMarkerClick(property);
  };

  return (
    <>
      {/* Marker */}
      <Marker
        position={{
          lat: property.latitud,
          lng: property.longitud,
        }}
        onClick={() => handleMarkerClick(property)}
        icon={{
          url: isFocused
            ? for_blue
            : markerIcons[selectedColor] || markerIcons.default,
          scaledSize: new window.google.maps.Size(25, 35),
        }}
      >
        <div ref={setRef} style={{ position: "absolute" }}></div>
      </Marker>

      {/* Radius highlight (shown only when focused) */}
      {isFocused && (
        <Circle
          center={{
            lat: property.latitud,
            lng: property.longitud,
          }}
          radius={100} // Radius in meters (adjust as needed)
          options={{
            fillColor: "#4d90fe", // Light blue fill
            fillOpacity: 0.2, // Semi-transparent
            strokeColor: "#1a73e8", // Border color
            strokeWeight: 1, // Thin border
            clickable: false, // Prevent blocking clicks
          }}
        />
      )}
    </>
  );
};

const MapComponent = ({ properties, updateProperties }) => {
  console.log(properties, "all properties");
  const mapRef = useRef(null);
  const drawingManagerRef = useRef(null);
  const [allProperties, setAllProperties] = useState([]); // Stores all properties from API
  const [prop, setProp] = useState([]); // Stores filtered properties inside drawn polygon
  const [userLocation, setUserLocation] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState({});
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [drawingMode, setDrawingMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activePolygon, setActivePolygon] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [polygons, setPolygons] = useState([]);
  const [polygonCompleted, setPolygonCompleted] = useState(false);
  const [propertyBoundary, setPropertyBoundary] = useState(null);
  const [focusedProperty, setFocusedProperty] = useState(null);
  const focusOnProperty = (property) => {
    setFocusedProperty(property);
    if (mapRef.current && property.latitud && property.longitud) {
      const position = new window.google.maps.LatLng(
        property.latitud,
        property.longitud
      );
      console.log(
        position.lat,
        "position",
        property.latitud,
        property.longitud,
        "property.latitud,property.longitud"
      );
      mapRef.current.panTo(position);
      mapRef.current.setZoom(15); // Zoom in when focusing

      // Add a slight bounce effect
      setTimeout(() => {
        mapRef.current.panBy(0, -500); // Move up slightly
        setTimeout(() => {
          mapRef.current.panBy(0, 50); // Return to original position
        }, 300);
      }, 300);
    }
  };

  const [locationDetails, setLocationDetails] = useState({
    country: "",
    state: "",
    city: "",
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [totalProperties, setTotalProperties] = useState();
  const [selectedColor, setSelectedColor] = useState(
    localStorage.getItem("selectedColor") || "white"
  );

  const navigate = useNavigate();

  // Enhanced onPolygonComplete function with comprehensive clickability fixes
  const onPolygonComplete = (polygon) => {
    try {
      // Get the polygon's path
      const polygonPath = polygon.getPath();

      // Filter properties within the polygon
      const propertiesInPolygon = allProperties.filter((property) => {
        if (!property.latitud || !property.longitud) return false;

        const propertyLatLng = new window.google.maps.LatLng(
          property.latitud,
          property.longitud
        );

        return window.google.maps.geometry.poly.containsLocation(
          propertyLatLng,
          polygon
        );
      });
      // Attach click listener to polygon
      window.google.maps.event.addListener(polygon, "click", (event) => {
        if (filteredProperties.length > 0) {
          const firstProperty = filteredProperties[0]; // or show a list/modal with options
          handleMarkerClick(firstProperty); // Reuse your existing marker click logic
        }
      });

      console.log(
        `Found ${propertiesInPolygon.length} properties inside polygon`
      );
      setFocusedProperty(null);
      // Update filtered properties state
      setFilteredProperties(propertiesInPolygon);
      console.log(propertiesInPolygon, "propertiesInPolygon");
      // Set properties count
      setPropertiesCount(propertiesInPolygon.length);

      // Zoom to the polygon's bounds
      const bounds = new window.google.maps.LatLngBounds();
      polygonPath.forEach((latLng) => bounds.extend(latLng));
      mapRef.current.fitBounds(bounds);

      // Store the polygon for later use
      setActivePolygon(polygon);

      // Mark polygon as completed
      setPolygonCompleted(true);

      // Force drawing mode to be disabled
      setDrawingMode(false);

      // Clean up drawing manager
      if (drawingManagerRef.current) {
        drawingManagerRef.current.setDrawingMode(null);
        drawingManagerRef.current.setMap(null);
        drawingManagerRef.current = null;
      }

      // Reset cursor on map
      if (mapRef.current) {
        mapRef.current.setOptions({
          draggableCursor: "default",
          draggingCursor: "grab",
          clickableIcons: true,
        });
      }

      // Fix marker clickability after a short delay
      setTimeout(() => {
        try {
          // Find all marker images and make them clickable
          const markers = document.querySelectorAll(
            'img[src*="map"], img[src*="marker"]'
          );

          markers.forEach((marker) => {
            marker.style.pointerEvents = "auto";
            marker.style.cursor = "pointer";
            marker.style.zIndex = "9999";
          });

          console.log("Markers should now be clickable");
        } catch (error) {
          console.error("Error fixing marker clickability:", error);
        }
      }, 200);
    } catch (error) {
      console.error("Error in onPolygonComplete:", error);
    }
  };

  const toggleDrawingMode = () => {
    try {
      if (drawingMode) {
        // Turn off drawing mode
        setDrawingMode(false);

        // Clean up drawing manager
        if (drawingManagerRef.current) {
          drawingManagerRef.current.setDrawingMode(null);
          drawingManagerRef.current.setMap(null);
          drawingManagerRef.current = null;
        }

        // Reset completion flag
        setPolygonCompleted(false);

        // Reset map cursor
        if (mapRef.current) {
          mapRef.current.setOptions({
            draggableCursor: "default",
            draggingCursor: "grab",
          });
        }

        // Fix marker clickability
        setTimeout(() => {
          const markers = document.querySelectorAll(
            'img[src*="map"], img[src*="marker"]'
          );
          markers.forEach((marker) => {
            marker.style.pointerEvents = "auto";
            marker.style.cursor = "pointer";
            marker.style.zIndex = "9999";
          });
        }, 200);
      } else {
        // Turn on drawing mode
        setDrawingMode(true);
        setPolygonCompleted(false);
      }
    } catch (error) {
      console.error("Error in toggleDrawingMode:", error);
      // Ensure we reset to a safe state if there's an error
      setDrawingMode(false);
      setPolygonCompleted(false);
    }
  };
  // Clear polygons
  const clearPolygons = () => {
    setFocusedProperty(null);
    polygons.forEach((polygon) => {
      if (polygon) {
        polygon.setMap(null); // Remove polygon
        if (polygon.overlay) {
          polygon.overlay.setMap(null); // Remove overlay cross icon
        }
      }
    });

    setPolygons([]); // Clear polygons from state
    setProp([]); // Clear filtered properties
    setActivePolygon(null); // Reset active polygon
    setFilteredProperties([]); // Clear filtered properties
    setDrawingMode(false); // Ensure drawing mode is disabled
    setPolygonCompleted(false); // Reset completion state

    // Fix marker clickability after clearing
    setTimeout(() => {
      document
        .querySelectorAll('img[src*="map"], img[src*="marker"]')
        .forEach((marker) => {
          marker.style.pointerEvents = "auto";
          marker.style.cursor = "pointer";
          marker.style.zIndex = "9999";
        });
    }, 100);
  };

  // Go to user's live location
  const goToLiveLocation = () => {
    if (userLocation) {
      mapRef.current.panTo(
        new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
      );
      mapRef.current.setZoom(15); // Set a closer zoom level to show detail
      setIsLiveActive(true); // Set live active to true when going to live location
    } else {
    }
  };

  useEffect(() => {
    // When drawingMode becomes false, make sure it stays off
    if (drawingMode === false) {
      // Clean up any references to the drawing manager
      if (drawingManagerRef.current) {
        drawingManagerRef.current.setDrawingMode(null);
        drawingManagerRef.current.setMap(null);
        drawingManagerRef.current = null;
      }

      // Reset cursor styles on map
      if (mapRef.current) {
        mapRef.current.setOptions({
          draggableCursor: "default",
          draggingCursor: "grab",
        });
      }

      // Double check all markers are clickable
      const markers = document.querySelectorAll('.gm-style img[src*="map"]');
      markers.forEach((marker) => {
        marker.style.pointerEvents = "auto";
        marker.style.cursor = "pointer";
      });
    }
  }, [drawingMode]);

  // Handle marker click
  // Function to handle the click on a property marker
  const handleMarkerClick = async (property) => {
    console.log("Marker clicked:", property.idPropiedad);

    if (!property.latitud || !property.longitud) {
      return;
    }

    try {
      // Fetch property details by ID
      const fetchedData = await fetchPropertyById(property.idPropiedad);
      if (!fetchedData) {
        return;
      }

      // Prepare the new selected property including price
      const newSelectedProperty = {
        ...fetchedData, // This includes the price, title, description, etc.
        directions: {
          origin: userLocation,
          destination: { lat: property.latitud, lng: property.longitud },
          travelMode: "DRIVING",
        },
        markerPosition: {
          lat: property.latitud,
          lng: property.longitud,
        },
      };

      // Set the selected property and show the details modal
      setSelectedProperty(newSelectedProperty);
      setProp((prev) => [...prev, newSelectedProperty]);
      setShowDetailsModal(true); // Open the modal to show details
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  // Function to fetch property details by ID from the new endpoint
  const fetchPropertyById = async (id) => {
    try {
      const response = await axios.get(
        `https://apis.geoestate.ai/api/Property/getPropertyDetails/${id}`
      );
      return response.data; // This will include the price and other details
    } catch (error) {
      console.error("Error fetching property by ID:", error);
      return null;
    }
  };

  const handleCloseEmailModal = () => setShowEmailModal(false);
  const handleShowEmailModal = () => setShowEmailModal(true);
  const handleShowCompanyModal = () => setShowCompanyModal(true);
  const handleCloseCompanyModal = () => setShowCompanyModal(false);

  const handleSaveCompanyDetails = (details) => {
    setCompanyDetails(details); // Save the company details to state
    setShowCompanyModal(false); // Close the modal after saving
    generatePDF(details); // Trigger the PDF generation with company and property data
  };

  const generatePDF = (companyDetails) => {
    const { logo, name, address, phone, email } = companyDetails;
    const { titulo, descripcion, foto } = selectedProperty;

    const doc = new jsPDF();

    // Add Property Info
    doc.setFontSize(16);
    doc.text(titulo || "No Title Available", 10, 10);
    doc.setFontSize(12);
    doc.text(descripcion || "No Description Available", 10, 20);

    // Add Company Info
    doc.setFontSize(14);
    doc.text("Company Information", 10, 40);
    doc.text(`Name: ${name}`, 10, 50);
    doc.text(`Address: ${address}`, 10, 60);
    doc.text(`Phone: ${phone}`, 10, 70);
    doc.text(`Email: ${email}`, 10, 80);

    // Add company logo if provided
    if (logo) {
      const logoImage = URL.createObjectURL(logo);
      doc.addImage(logoImage, "JPEG", 10, 90, 40, 40);
    }

    // Add property image if provided
    if (foto) {
      doc.addImage(foto, "JPEG", 10, 130, 100, 100);
    }

    doc.save(`${titulo || "property"}.pdf`);
  };

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {}
    );
  }, []);

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "https://apis.geoestate.ai/api/Property/getProperties"
        );

        if (Array.isArray(response.data)) {
          setAllProperties(response.data); // Store properties
          setTotalProperties(response.data.length); // Set total count
        } else {
          setAllProperties([]); // Fallback to empty array
          setTotalProperties(0);
        }
      } catch (error) {
        setAllProperties([]); // Fallback to empty array
        setTotalProperties(0);
      }
    };
    fetchProperties();
  }, []);

  // Update properties count
  useEffect(() => {
    setPropertiesCount(properties.length);
  }, [properties]);

  // Monitor localStorage for color changes
  useEffect(() => {
    const handleStorageChange = () => {
      const color = localStorage.getItem("selectedColor");
      setSelectedColor(color || "white");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleProperDetail = (idPropiedad) => {
    navigate(`/product-detail/${idPropiedad}`);
  };

  useEffect(() => {
    if (polygonCompleted) {
      // Clean up drawing manager
      if (drawingManagerRef.current) {
        try {
          drawingManagerRef.current.setDrawingMode(null);
          drawingManagerRef.current.setMap(null);
        } catch (e) {
          console.error("Error cleaning up drawing manager:", e);
        }
        drawingManagerRef.current = null;
      }

      // Ensure drawing mode stays off
      setDrawingMode(false);

      // Fix marker clickability
      setTimeout(() => {
        try {
          const markers = document.querySelectorAll(
            'img[src*="map"], img[src*="marker"]'
          );
          markers.forEach((marker) => {
            marker.style.pointerEvents = "auto";
            marker.style.cursor = "pointer";
            marker.style.zIndex = "9999";
          });
        } catch (e) {
          console.error("Error fixing marker clickability:", e);
        }
      }, 200);
    }
  }, [polygonCompleted]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Clean up when component unmounts
      try {
        console.log("Component unmounting, resetting cursor");

        if (drawingManagerRef.current) {
          drawingManagerRef.current.setMap(null);
          drawingManagerRef.current = null;
        }

        if (activePolygon) {
          activePolygon.setMap(null);
        }
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    };
  }, []);

  const displayedProperties =
    filteredProperties.length > 0 ? filteredProperties : properties;

  return (
    <>
      <EmailModal
        property={selectedProperty}
        show={showEmailModal}
        handleClose={handleCloseEmailModal}
      />

      <div className="container-fluid py-4 bg-gradient bg-light shadow-sm rounded">
        <div className="row align-items-center justify-content-between" s>
          {/* Left Section */}
          <div className="proprtyheader col-md-8 col-12">
            <h4 className="mb-2 text-muted ">
              Property for sale in {locationDetails.country || "Spain"}
            </h4>
            <p className="mb-0 text-muted">
              Total Properties Found: <strong>{totalProperties || 0}</strong> |
              Properties Selected Region: <strong>{propertiesCount}</strong>
            </p>
          </div>

          <Filters
            show={showFilters}
            handleClose={() => setShowFilters(false)}
            property={filteredProperties}
            updateProperties={setFilteredProperties}
            filters={{}}
            setFilters={() => {}}
          />

          {/* Right Section */}
          <div className="col-md-4 col-12 text-md-end text-center mt-md-0 mt-3">
            {/* Optional buttons can go here */}
          </div>
        </div>
      </div>
      {/* Property List Sidebar */}
      <div
        style={{
          position: "fixed",
          right: "20px",
          top: "20px",
          width: "300px",
          maxHeight: "80vh",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          zIndex: 1000,
          overflow: "hidden",
          display: filteredProperties.length > 0 ? "block" : "none",
        }}
      >
        <div
          style={{
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 style={{ margin: 0 }}>
            Filtered Properties ({filteredProperties.length})
          </h5>
          <button
            onClick={() => setFilteredProperties([])}
            style={{
              background: "none",
              border: "none",
              color: "#666",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
        <div
          style={{
            overflowY: "auto",
            maxHeight: "calc(80vh - 60px)",
          }}
        >
          {filteredProperties.map((property, index) => (
            <div
              key={index}
              onClick={() => {
                focusOnProperty(property);
                setSelectedProperty(property); // Add this to track the selected property
                setShowDetailsModal(true); // ✅ This line opens the modal
              }}
              style={{
                padding: "15px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                backgroundColor:
                  selectedProperty?.idPropiedad === property.idPropiedad
                    ? "#e6f2ff"
                    : "white",
                borderLeft:
                  selectedProperty?.idPropiedad === property.idPropiedad
                    ? "4px solid #4d90fe"
                    : "4px solid transparent",
                transition: "all 0.2s", // Changed from 'background-color' to 'all'
                transform:
                  selectedProperty?.idPropiedad === property.idPropiedad
                    ? "scale(1.02)"
                    : "scale(1)",
                boxShadow:
                  selectedProperty?.idPropiedad === property.idPropiedad
                    ? "0 2px 8px rgba(0,0,0,0.1)"
                    : "none",
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <img
                  src={property.foto || "https://via.placeholder.com/400"}
                  alt="Property"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h6 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
                    {property.titulo || "No title available"}
                  </h6>
                  <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                    {property.ubicacion || ""}
                  </p>
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    €{property.precio || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <LoadScript
        googleMapsApiKey="AIzaSyD6BzBn_Tszpy0STtNSbtyyBp4ii2Ji55c"
        libraries={mapLibraries}
        onLoad={() => setGoogleMapsLoaded(true)}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: " 120vh", // Adjust based on your header/footer

            top: "0px",
            border: "1px solid #ddd", // Optional border
            borderRadius: "8px", // Optional rounded corners
            overflow: "hidden", // Ensures no scrollbars appear
          }}
        >
          {googleMapsLoaded && (
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "100%",
                position: "absolute", // Ensures map fills container
              }}
              mapContainerClassName={
                drawingMode ? "map-container drawing-mode" : "map-container"
              }
              zoom={8}
              center={{ lat: 39.6111, lng: 2.8989 }}
              onLoad={(map) => {
                mapRef.current = map;
                setMapLoaded(true);
              }}
              options={{
                restriction: {
                  latLngBounds: {
                    north: 85,
                    south: -85,
                    east: 180,
                    west: -180,
                  },
                  strictBounds: true,
                },
                mapTypeId: "satellite",
              }}
            >
              {/* User location marker */}
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={{
                    url: For_user,
                    scaledSize: new window.google.maps.Size(25, 35),
                  }}
                />
              )}

              {/* Property markers - Using CustomMarker component for better clickability */}
              {Array.isArray(displayedProperties) &&
                displayedProperties.map(
                  (property, index) =>
                    property.latitud &&
                    property.longitud && (
                      <CustomMarker
                        key={index}
                        property={property}
                        selectedColor={selectedColor}
                        handleMarkerClick={handleMarkerClick}
                        isFocused={
                          focusedProperty?.idPropiedad === property.idPropiedad
                        }
                      />
                    )
                )}

              {/* Directions */}
              {selectedProperty && selectedProperty.directions && (
                <DirectionsService
                  options={selectedProperty.directions}
                  callback={(response) => {
                    if (response.status === "OK") {
                      setDirectionsResponse(response);
                    } else {
                      alert("Failed to get directions: " + response.status);
                    }
                  }}
                />
              )}

              {directionsResponse && (
                <DirectionsRenderer
                  options={{
                    directions: directionsResponse,
                    suppressMarkers: true,
                    preserveViewport: true,
                    polylineOptions: {
                      strokeColor: "#33db4a",
                      strokeWeight: 6,
                    },
                  }}
                />
              )}

              {/* Use the separate drawing manager component */}
              {googleMapsLoaded && (
                <MapDrawingManager
                  mapRef={mapRef}
                  isActive={drawingMode && !polygonCompleted}
                  onPolygonComplete={onPolygonComplete}
                  onDrawingModeChanged={(isActive) => setDrawingMode(isActive)}
                  setDrawingManagerRef={(ref) => {
                    drawingManagerRef.current = ref;
                  }}
                />
              )}

              {/* PDF Generator */}
              <PDFGenerator
                companyDetails={companyDetails}
                selectedProperty={selectedProperty}
              />

              {/* Property details modal */}
              {showDetailsModal && selectedProperty && (
                <div
                  className="property-modal-container"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: "none",
                    zIndex: 1000,
                  }}
                >
                  <CompanyDetailsModal
                    id={selectedProperty.idPropiedad}
                    show={showCompanyModal}
                    handleClose={handleCloseCompanyModal}
                    onSave={handleSaveCompanyDetails}
                  />

                  <OverlayView
                    position={{
                      lat: selectedProperty.markerPosition?.lat,
                      lng: selectedProperty.markerPosition?.lng,
                    }}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    getPixelPositionOffset={(width, height) => ({
                      x: -(width / 2),
                      y: -height - 10, // Adjust this value as needed
                    })}
                  >
                    <div
                      className="property-modal p-3 rounded shadow bg-white"
                      onClick={() =>
                        handleProperDetail(selectedProperty.idPropiedad)
                      }
                      style={{
                        Width: "300px !important",
                        height: "auto",
                        transform: "translate(-50%, -105%)",
                        marginBottom: "5px",
                        cursor: "pointer",
                        pointerEvents: "auto",
                        border: "1px solid #ddd",
                      }}
                    >
                      {/* Close Button */}
                      <div className="d-flex justify-content-end">
                        <button
                          className="btn-close"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDetailsModal(false);
                          }}
                        />
                      </div>

                      <div className="property-image text-center">
                        <img
                          src={
                            selectedProperty.foto ||
                            "https://via.placeholder.com/400"
                          }
                          alt="Property"
                          className="rounded w-100"
                          style={{ maxHeight: "150px", objectFit: "cover" }}
                        />
                      </div>

                      <h5 className="mt-2 mb-1 text-dark">
                        {selectedProperty.titulo || "No title available"}
                      </h5>
                      <div className="my-1">
                        Plot Size:{" "}
                        <span style={{ fontSize: "14px" }}>
                          {selectedProperty.area || "N/A"}m²
                        </span>
                      </div>
                      <div className="my-1">
                        Beds:{" "}
                        <span style={{ fontSize: "14px" }}>
                          {selectedProperty.habitaciones || "N/A"}
                        </span>
                      </div>
                      <div className="my-1">
                        Baths:{" "}
                        <span style={{ fontSize: "14px" }}>
                          {selectedProperty.banos || "N/A"}
                        </span>
                      </div>
                      <div className="mt-2 text-end fs-6">
                        Price:{" "}
                        <span className="text-primary fw-bold">
                          €{selectedProperty.precio || "N/A"}
                        </span>
                      </div>

                      <p className="text-muted small">
                        {selectedProperty.ubicacion || ""}
                      </p>
                    </div>
                  </OverlayView>
                </div>
              )}
            </GoogleMap>
          )}
        </div>

        {/* Drawing Mode Button */}
        <Button className="draw-zone-button" onClick={toggleDrawingMode}>
          {drawingMode ? "Disable Drawing" : "Enable Drawing"}
        </Button>

        {/* Live Location Button */}
        <div
          className="live-location-control"
          onClick={goToLiveLocation}
          style={{
            position: "absolute",
            bottom: "20px",
            right: "40rem",
            zIndex: "1000",
            border: "2px solid green",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            width: "50px",
            height: "60px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={isLiveActive ? active : inactive}
            alt="Live Location"
            className="live-location-icon"
            style={{
              width: "24px",
              height: "34px",
              filter: isLiveActive ? "none" : "grayscale(100%)",
            }}
          />
          <div
            className="live-location-text"
            style={{
              marginTop: "5px",
              fontSize: "12px",
              color: isLiveActive ? "white" : "#999",
            }}
          >
            Live
          </div>
        </div>

        {/* Clear Filters Button */}
        <Button className="clear-directions-button" onClick={clearPolygons}>
          Clear Filters
        </Button>
      </LoadScript>
    </>
  );
};

export default MapComponent;
