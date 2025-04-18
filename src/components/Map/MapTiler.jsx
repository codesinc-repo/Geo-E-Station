import React, { useRef, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import './maps.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Modal, Button } from 'react-bootstrap';
import { debounce } from 'lodash';

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  maptilersdk.config.apiKey = '8ZM2AU8xhSID7dSShsk4'; // Ensure this key is kept secure

  const initializeMap = useCallback(() => {
    if (map.current) return;
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [139.753, 35.6844],
      zoom: 3
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        line_string: true,
        point: true,
        trash: true
      }
    });
    map.current.addControl(draw, 'top-right');
  }, []);

  useEffect(() => {
    initializeMap();
    const handleMoveEnd = debounce(() => {
      if (!map.current) return;
      const bounds = map.current.getBounds().toArray().flat();
      fetchProperties(bounds);
    }, 500); // Increased debounce time to reduce calls

    map.current.on('moveend', handleMoveEnd);
    return () => {
      map.current.off('moveend', handleMoveEnd);
    };
  }, [initializeMap]);

  const fetchProperties = useCallback(async (bounds) => {
    try {
      const response = await axios.get(`/api/Property/getProperties?bbox=${bounds}`);
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  }, []);

  useEffect(() => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    properties.forEach(property => {
      if (property.latitud && property.longitud) {
        const marker = new maptilersdk.Marker({
          map: map.current,
          title: property.titulo,
        })
        .setLngLat([property.longitud, property.latitud])
        .setPopup(new maptilersdk.Popup().setHTML(
          `<h4>${property.titulo}</h4><p>${property.descripcion}</p><button onClick={() => handleMarkerClick(property)}>Details</button>`
        ))
        .addTo(map.current);
        markersRef.current.push(marker);
      }
    });
  }, [properties]);

  const handleMarkerClick = useCallback((property) => {
    setSelectedProperty(property);
    setShowModal(true);
  }, []);

  const handleWhatsAppShare = useCallback(() => {
    if (!selectedProperty) return;
    const message = `Check out this property: ${selectedProperty.titulo} - ${selectedProperty.descripcion}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }, [selectedProperty]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      {showModal && selectedProperty && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Property Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{selectedProperty.titulo}</h4>
            <p>{selectedProperty.descripcion}</p>
            <Button onClick={handleWhatsAppShare}>
              <FontAwesomeIcon icon={faShareAlt} /> Share on WhatsApp
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Map;
