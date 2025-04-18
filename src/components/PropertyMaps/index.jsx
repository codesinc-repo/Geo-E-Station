import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Container, Alert, ButtonGroup, Button, Row, Col } from "react-bootstrap";

const PropertyMap = () => {
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your API Key

  // Map Styles
  const mapStyles = {
    WHO_GREY: [
      { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
      { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    ],
    ROADMAP: [],
    SATELLITE: "satellite",
  };

  const [mapType, setMapType] = useState("roadmap");
  const [mapStyle, setMapStyle] = useState(mapStyles.WHO_GREY);

  const center = { lat: 43.3614, lng: -5.8494 }; // Example location (Oviedo, Spain)

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={10}>
          {/* Notice Box */}
          <Alert variant="warning" className="text-center">
            ⚠ Approximate address. Contact the advertiser for the exact address.
          </Alert>

          {/* Google Map */}
          <LoadScript googleMapsApiKey={apiKey}>
            <div style={{ borderRadius: "10px", overflow: "hidden" }}>
              <GoogleMap
                mapContainerStyle={{ height: "400px", width: "100%" }}
                center={center}
                zoom={14}
                mapTypeId={mapType}
                options={{ styles: mapStyle }}
              >
                {/* Marker */}
                <Marker position={center} />
              </GoogleMap>
            </div>
          </LoadScript>

          {/* Map Controls */}
          <div className="text-center mt-3">
            <ButtonGroup>
              <Button
                variant="dark"
                onClick={() => {
                  setMapType("roadmap");
                  setMapStyle(mapStyles.WHO_GREY);
                }}
              >
                WHO GREY
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setMapType("roadmap");
                  setMapStyle(mapStyles.ROADMAP);
                }}
              >
                ROADMAP
              </Button>
              <Button
                variant="primary"
                onClick={() => setMapType("satellite")}
              >
                SATELLITE
              </Button>
            </ButtonGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};


export default PropertyMap;
