import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  Button,
  Form,
  Spinner,
  Badge,
} from "react-bootstrap";
import { FaTasks, FaEuroSign, FaFilePdf, FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import PropertyDetailHeader from "../PropertyDetailHeader";
import QuickAssessment from "../QuickAssessment";
import PropertyOverview from "../PropertyOverview";
import "./PropertyDetail.css";
import img from "../../assests/img/bg-section3.png"; // Placeholder image
import TaskModal from "../TaskModal";

// Import needed Google Maps components
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import PropertyPDFContent from "./PropertyPDFContent";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoSource, setPhotoSource] = useState(""); // Track selected source
  const [photos, setPhotos] = useState([]); // Store multiple uploaded or linked photos
  const [showModal, setShowModal] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);
  const [generatedRecord, setGeneratedRecord] = useState(null);

  const handleGenerateRecord = (recordData) => {
    setGeneratedRecord(recordData);
  };

  // Fetch property details by id
  const fetchPropertyById = async (propertyId) => {
    if (!propertyId) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://apis.geoestate.ai/api/Property/getPropertyDetails/${propertyId}`
      );

      if (response?.data) {
        console.log("Fetched Property Data:", response.data);
        setProperty(response.data);

        // Extract images into an array and remove null values
        const imageUrls = [
          response.data.foto,
          response.data.foto2,
          response.data.foto3,
          response.data.foto4,
          response.data.foto5,
          response.data.foto6,
        ].filter((photo) => photo); // Removes null/undefined values

        setPhotos(imageUrls); // Set filtered array to state
      } else {
        console.warn("No data found for the property.");
        setError("Property data not available.");
      }
    } catch (error) {
      console.error("Failed to fetch property:", error);
      setError(
        error.response?.data?.message || "Failed to load property details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyById(id);
    
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Location access denied.", error);
        // Default to property location or a fallback
      }
    );
  }, [id]);

  // Handle dropdown change
  const handlePhotoSourceChange = (e) => {
    setPhotoSource(e.target.value);
  };

  // Handle multiple file uploads
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => URL.createObjectURL(file)); // Convert to preview URL
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]); // Append to existing photos
  };

  // Handle input change for multiple URLs
  const handlePhotoUrlChange = (e) => {
    const url = e.target.value.trim();
    if (url) {
      setPhotos((prevPhotos) => [...prevPhotos, url]); // Add URL to the photo list
    }
  };

  // Handle marker click
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  // Close info window
  const closeInfoWindow = () => {
    setSelectedMarker(null);
  };
  
  // Map container style
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
    marginTop: "20px",
    marginBottom: "20px"
  };

  // Define the property marker icon
  const propertyMarkerIcon = {
    url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    scaledSize: { width: 40, height: 40 },
  };

  // Define the user location marker icon
  const userMarkerIcon = {
    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    scaledSize: { width: 40, height: 40 },
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading property details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 text-center">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  // Determine the center of the map
  const mapCenter = property?.latitud && property?.longitud 
    ? { lat: property.latitud, lng: property.longitud }
    : userLocation || { lat: 40.416775, lng: -3.703790 }; // Default to Madrid if no coordinates
   
    const handlePrint = () => {
      const printContent = document.getElementById("pdf").innerHTML;
      const printWindow = window.open("", "");
    
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
            </style>
          </head>
          <body>${printContent}</body>
        </html>
      `);
    
      printWindow.document.close();
      printWindow.print();
    };
    
    
  return (
    <>
      <PropertyDetailHeader   onGenerateRecord={handleGenerateRecord} propertyId={property.idPropiedad} />
     

      {/* PDF Download Button on top */}
      <Container className="my-4">
        <Row>
          <Col className="text-center">
            <Button onClick={handlePrint}>Download PDF</Button>
          </Col>
        </Row>
      </Container>
      <div id="pdf" className="d-none">
      <PropertyPDFContent recordData={generatedRecord}  property={property} photos={photos} img={img} />
      </div>

      {/* 
        Dedicated container for PDF content.
        Only include the desired sections: images, description, price, 
        QuickAssessment, and PropertyOverview.
      */}
      <Container id="pdf-content" className="my-4">
        <Row>
          {/* Images Section */}
          <Col md={8}>
            <Carousel>
              {photos.length > 0 ? (
                photos.map((photo, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 img-fluid"
                      src={photo}
                      alt={`Property ${index}`}
                    />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-fluid"
                    src={img}
                    alt="Placeholder"
                  />
                </Carousel.Item>
              )}
            </Carousel>
          </Col>

          {/* Property Details Section */}
          <Col
            md={4}
            className="mt-3 mt-md-0 p-3 border rounded shadow-sm bg-white"
          >
            {/* Title */}
            <h4 className="fw-bold">{property?.titulo || "Property Title"}</h4>

            {/* Price */}
            <h5 className="text-danger fw-bold">
              Rent withdrawn: <FaEuroSign /> {property?.precio || "N/A"}
            </h5>

            {/* Property Details */}
            <p className="text-muted">
              {property?.area ? `${property.area} m²` : "N/A"} |{" "}
              {property?.planta !== undefined
                ? `Floor: ${property.planta}`
                : "N/A"}{" "}
              |{" "}
              {property?.habitaciones ? `${property.habitaciones} bed.` : "N/A"}{" "}
              | {property?.banos ? `${property.banos} bathroom` : "N/A"}
            </p>

            {/* Publication Date */}
            <p className="text-muted">
              Date of discharge:{" "}
              {property?.fechaPublicacion
                ? new Date(property.fechaPublicacion).toLocaleDateString()
                : "N/A"}
            </p>

            {/* Tags */}
            <div className="mb-3">
              <Badge bg="success" className="me-1">
                Particular
              </Badge>
              <Badge bg="secondary" className="me-1">
                Floor
              </Badge>
              <Badge bg="secondary" className="me-1">
                {property?.habitaciones} bed.
              </Badge>
              <Badge bg="secondary" className="me-1">
                {property?.banos} bathroom
              </Badge>
              <Badge bg="warning" text="dark" className="me-1">
                Consumption <span className="fw-bold">F</span>
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2 flex-wrap">
              <Button
                variant="dark"
                className="d-flex align-items-center"
                onClick={() => setShowModal(true)}
              >
                <FaTasks className="me-2" /> TASK
              </Button>
              <Button variant="dark" className="d-flex align-items-center">
                <FaEuroSign className="me-2" /> APPRECIATE
              </Button>
              <Button onClick={handlePrint} variant="dark" className="d-flex align-items-center">
                <FaFilePdf className="me-2" /> RECRUITMENT REPORT
              </Button>
              <TaskModal show={showModal} handleClose={() => setShowModal(false)} />
            </div>
          </Col>
        </Row>

        {/* Map Section - Added below the buttons */}
        <Row className="my-4">
          <Col>
            <div className="border rounded shadow-sm">
              <h5 className="p-3 border-bottom bg-light">
                <FaMapMarkerAlt className="me-2" /> Property Location
              </h5>
              <div className="p-2">
                <LoadScript googleMapsApiKey="AIzaSyD6BzBn_Tszpy0STtNSbtyyBp4ii2Ji55c" onLoad={() => setMapLoaded(true)}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={mapCenter}
                    zoom={15}
                    onLoad={(map) => {
                      mapRef.current = map;
                    }}
                    options={{
                      fullscreenControl: true,
                      streetViewControl: true,
                      mapTypeControl: true,
                      zoomControl: true,
                    }}
                  >
                    {/* Property Marker */}
                    {property?.latitud && property?.longitud && (
                      <Marker
                        position={{ lat: property.latitud, lng: property.longitud }}
                        onClick={() => handleMarkerClick(property)}
                        icon={propertyMarkerIcon}
                      />
                    )}

                    {/* User Location Marker */}
                    {userLocation && (
                      <Marker
                        position={userLocation}
                        icon={userMarkerIcon}
                        title="Your Location"
                      />
                    )}

                    {/* Info Window for Property */}
                    {selectedMarker && (
                      <InfoWindow
                        position={{ lat: selectedMarker.latitud, lng: selectedMarker.longitud }}
                        onCloseClick={closeInfoWindow}
                      >
                        <div style={{ padding: "5px", maxWidth: "200px" }}>
                          <h6 className="mb-1">{selectedMarker.titulo || "Property"}</h6>
                          <p className="mb-1 text-muted small">
                            {selectedMarker.ubicacion || "Location not available"}
                          </p>
                          <p className="mb-0">
                            <strong>€{selectedMarker.precio}</strong> · {selectedMarker.area} m²
                          </p>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </LoadScript>
                <div className="d-flex justify-content-between align-items-center p-2">
                  <small className="text-muted">
                    Coordinates: {property?.latitud?.toFixed(6) || "N/A"}, {property?.longitud?.toFixed(6) || "N/A"}
                  </small>
                  {property?.ubicacion && (
                    <span className="badge bg-secondary">{property.ubicacion}</span>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* QuickAssessment Section */}
        <Row className="my-4">
          <Col>
            <Form.Group controlId="photoSource">
              <Form.Label className="fw-bold">
                Select the source for the photos
              </Form.Label>
              <Form.Select
                value={photoSource}
                onChange={handlePhotoSourceChange}
              >
                <option value="">-- Select --</option>
                <option value="local">Local Drive</option>
                <option value="cloud">Cloud Storage</option>
                <option value="link">URL Link</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Render input based on selection */}
        {photoSource === "local" && (
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="uploadPhoto">
                <Form.Label className="fw-bold">Upload Photos</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                />
              </Form.Group>
            </Col>
          </Row>
        )}

        {photoSource === "cloud" || photoSource === "link" ? (
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="photoUrl">
                <Form.Label className="fw-bold">Enter Image URLs</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Paste image URL and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handlePhotoUrlChange(e);
                      e.target.value = ""; // Clear input after adding
                    }
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        ) : null}

        {/* Property Description */}
        <Row className="mb-3">
          <Col>
            <h5 className="fw-bold">Property Description</h5>
            <p className="mb-2">
              Create your property description quickly and easily with the help
              of artificial intelligence.
            </p>
            <Button className="btn-des">Generate Description</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PropertyDetail;