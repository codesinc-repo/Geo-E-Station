import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

export default function AddPropertyModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    Amenities: "",
    Area: 0,
    Banos: 0,
    Descripcion: "",
    Detalle: "",
    Direccion: "",
    FechaPublicacion: new Date().toISOString(),
    Foto: "",
    Foto2: "",
    Foto3: "",
    Foto4: "",
    Foto5: "",
    Foto6: "",
    Fuente: "",
    Habitaciones: 0,
    IdOrigen: null,
    IdPropiedad: 0,
    Latitud: 0,
    Longitud: 0,
    Municipio: "",
    Piscina: false,
    Planta: 1,
    Precio: 0,
    Provincia: "",
    Telefono: "",
    Tipo: 1, // 1 for Sale, 2 for Rent
    TipoInmueble: "Vivienda",
    Titulo: "",
    URL: "",
    Verificado: false,
    Zona: "",
  });

  const [success, setSuccess] = useState(false); // Toggler for success message

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://homevocation-001-site4.atempurl.com/api/Property/createProperty",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccess(true); // Show success message
        setTimeout(() => setSuccess(false), 3000); // Hide after 3 seconds
        setFormData({
          Amenities: "",
          Area: 0,
          Banos: 0,
          Descripcion: "",
          Detalle: "",
          Direccion: "",
          FechaPublicacion: new Date().toISOString(),
          Foto: "",
          Foto2: "",
          Foto3: "",
          Foto4: "",
          Foto5: "",
          Foto6: "",
          Fuente: "",
          Habitaciones: 0,
          IdOrigen: null,
          IdPropiedad: 0,
          Latitud: 0,
          Longitud: 0,
          Municipio: "",
          Piscina: false,
          Planta: 1,
          Precio: 0,
          Provincia: "",
          Telefono: "",
          Tipo: 1,
          TipoInmueble: "Vivienda",
          Titulo: "",
          URL: "",
          Verificado: false,
          Zona: "",
        });
        handleClose(); // Close modal
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success && (
          <Alert variant="success">Property added successfully!</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="Titulo"
              value={formData.Titulo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter URL"
              name="URL"
              value={formData.URL}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Main Photo URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter main photo URL"
              name="Foto"
              value={formData.Foto}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {[2, 3, 4, 5, 6].map((num) => (
            <Form.Group key={num} className="mb-3">
              <Form.Label>Photo {num} URL</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter photo ${num} URL`}
                name={`Foto${num}`}
                value={formData[`Foto${num}`]}
                onChange={handleChange}
              />
            </Form.Group>
          ))}
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="Precio"
              value={formData.Precio}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Area (sq ft)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter area"
              name="Area"
              value={formData.Area}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              name="Descripcion"
              value={formData.Descripcion}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Detail</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter detail"
              name="Detalle"
              value={formData.Detalle}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter latitude"
              name="Latitud"
              value={formData.Latitud}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter longitude"
              name="Longitud"
              value={formData.Longitud}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Province</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter province"
              name="Provincia"
              value={formData.Provincia}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Municipality</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter municipality"
              name="Municipio"
              value={formData.Municipio}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Source</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter source"
              name="Fuente"
              value={formData.Fuente}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Zone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter zone"
              name="Zona"
              value={formData.Zona}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amenities</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter amenities"
              name="Amenities"
              value={formData.Amenities}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Swimming Pool</Form.Label>
            <Form.Check
              type="checkbox"
              label="Has Swimming Pool"
              name="Piscina"
              checked={formData.Piscina}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Verified</Form.Label>
            <Form.Check
              type="checkbox"
              label="Is Verified"
              name="Verificado"
              checked={formData.Verificado}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
