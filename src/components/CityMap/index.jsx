import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow, Data } from "@react-google-maps/api";
import axios from "axios";

const mapContainerStyle = {
    width: "100%",
    height: "100vh",
};

const initialCenter = {
    lat: 42.8805,  // Adjusted to center over Galicia, Spain
    lng: -8.54569,
};

const CityMap = ({ apiKey }) => {
    const [mapInstance, setMapInstance] = useState(null);
    const [mapCenter, setMapCenter] = useState(initialCenter);
    const [zoomLevel, setZoomLevel] = useState(8); // Adjusted for a closer initial view of Galicia
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [countryName, setCountryName] = useState("");

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get("/api/Property/getProperties");
                setProperties(response.data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };
        fetchProperties();
    }, []);

    useEffect(() => {
        if (mapInstance) {
            const loadGeoJsonData = async () => {
                const response = await fetch('https://api.biznetusa.com/public/countries.geojson');
                const data = await response.json();
                mapInstance.data.addGeoJson(data);
                mapInstance.data.setStyle({
                    fillColor: 'gray',
                    fillOpacity: 0.4,
                    strokeColor: 'black',
                    strokeWeight: 1,
                    strokeOpacity: 0.6,
                });

                mapInstance.data.addListener('click', (event) => {
                    const name = event.feature.getProperty('name');
                    setCountryName(name); // Update country name on click
                    const latLng = event.latLng;
                    setMapCenter({
                        lat: latLng.lat(),
                        lng: latLng.lng()
                    });
                    setZoomLevel(8); // Zoom in closer when a region is clicked
                    mapInstance.data.overrideStyle(event.feature, {
                        fillColor: 'blue',
                        strokeColor: 'blue',
                        strokeWeight: 2,
                    });
                });

                mapInstance.data.addListener('mouseover', (event) => {
                    mapInstance.data.overrideStyle(event.feature, {
                        fillColor: 'lightblue',
                        strokeColor: 'blue',
                        strokeWeight: 2,
                    });
                });

                mapInstance.data.addListener('mouseout', (event) => {
                    mapInstance.data.revertStyle();
                });
            };
            loadGeoJsonData();
        }
    }, [mapInstance]);

    const onLoad = map => setMapInstance(map);

    const handleMarkerClick = property => {
        setSelectedProperty(property);
        setMapCenter({ lat: property.latitude, lng: property.longitude });
    };

    return (
        <LoadScript googleMapsApiKey='AIzaSyD6BzBn_Tszpy0STtNSbtyyBp4ii2Ji55c'>
            <div style={{ marginTop: "50px", padding: "50px", background: "#f8f9fa", borderBottom: "1px solid #ccc" }}>
                <b>1,732 found | Spain | Galicia | Property for sale in Galicia</b>
                <button style={{ float: "right" }}>Create Alert</button>
            </div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={zoomLevel}
                onLoad={onLoad}
            >
                {properties.map(property => (
                    <Marker
                        key={property.id}
                        position={{ lat: property.latitude, lng: property.longitude }}
                        onClick={() => handleMarkerClick(property)}
                        icon={{
                            url: "path_to_custom_marker_icon", // Specify the path to your custom marker icon
                            scaledSize: new window.google.maps.Size(20, 20),
                        }}
                    />
                ))}
                {selectedProperty && (
                    <InfoWindow
                        position={{ lat: selectedProperty.latitude, lng: selectedProperty.longitude }}
                        onCloseClick={() => setSelectedProperty(null)}
                    >
                        <div>
                            <h4>{selectedProperty.name}</h4>
                            <p>{selectedProperty.description}</p>
                            <p><b>Price: </b>{selectedProperty.price}</p>
                        </div>
                    </InfoWindow>
                )}
                {countryName && (
                    <div style={{ position: "absolute", top: "10px", left: "10px", background: "white", padding: "6px", zIndex: 5 }}>
                        Country: {countryName}
                    </div>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default CityMap;
