import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Form,
  Modal,
  Tabs,
  Tab,
  Card,
  Pagination,
  Row,
  Col,
} from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Pagination helper that shows: Prev [1] 2 3 ... N Next
 */
function buildPaginationItems(currentPage, totalPages, onPageChange) {
  const items = [];

  // Previous
  items.push(
    <Pagination.Prev
      key="prev"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    />
  );

  if (totalPages <= 5) {
    // If few pages, show them all
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  } else {
    // Always show page 1
    items.push(
      <Pagination.Item
        key={1}
        active={1 === currentPage}
        onClick={() => onPageChange(1)}
      >
        1
      </Pagination.Item>
    );

    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (startPage < 2) {
      startPage = 2;
      endPage = 3;
    }
    if (endPage > totalPages - 1) {
      endPage = totalPages - 1;
      startPage = totalPages - 2;
    }

    // Ellipsis after 1?
    if (startPage > 2) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    }

    // Middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Ellipsis before last page?
    if (endPage < totalPages - 1) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    }

    // Last page
    items.push(
      <Pagination.Item
        key={totalPages}
        active={totalPages === currentPage}
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );
  }

  // Next
  items.push(
    <Pagination.Next
      key="next"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    />
  );

  return items;
}

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [activeTab, setActiveTab] = useState("view");
  const [formData, setFormData] = useState({
    idPropiedad: 0,
    idOrigen: "",
    titulo: "",
    url: "",
    foto: "",
    precio: 0,
    detalle: "",
    descripcion: "",
    direccion: "",
    fuente: "",
    habitaciones: 0,
    telefono: "",
    banos: 0,
    piscina: false,
    area: 0,
    planta: 0,
    fechaPublicacion: new Date().toISOString(),
    activo: true,
    verificado: true,
    latitud: 0,
    longitud: 0,
    tipo: 0,
    provincia: "",
    municipio: "",
    zona: "",
    tipoInmueble: "",
    amenities: "",
  });
  const [editingProperty, setEditingProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 10;

  useEffect(() => {
    fetchProperties();
  }, []);

  // Fetch Properties
  const fetchProperties = async () => {
    try {
      const response = await fetch(
        "https://apis.geoestate.ai/api/Property/getProperties"
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching properties:", errorText);
        throw new Error(errorText || "Failed to fetch properties");
      }
      const data = await response.json();
      setProperties(data);
      setCurrentPage(1); // reset to first page
    } catch (error) {
      toast.error("Error fetching properties");
      console.error(error);
    }
  };

  // Convert certain fields to number/boolean
  const parseFieldValue = (fieldName, value) => {
    if (["piscina", "activo", "verificado"].includes(fieldName)) {
      return value === "true";
    }
    if (
      [
        "idPropiedad",
        "precio",
        "habitaciones",
        "banos",
        "area",
        "planta",
        "latitud",
        "longitud",
        "tipo",
      ].includes(fieldName)
    ) {
      return Number(value);
    }
    return value;
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // If it's a date field, build an ISO date
    if (name === "fechaPublicacion" && type === "date") {
      const isoString = value ? value + "T00:00:00" : new Date().toISOString();
      setFormData((prev) => ({ ...prev, fechaPublicacion: isoString }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: parseFieldValue(name, value),
    }));
  };

  // Handle file input change for "foto"
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // CREATE
  const handleCreateProperty = async (e) => {
    e.preventDefault();
    try {
      // The API expects a payload: { "property": { ...fields } }
      const payload = { property: formData };

      const response = await fetch(
        "https://apis.geoestate.ai/api/Property/createProperty",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const responseText = await response.text();
      if (!response.ok) {
        console.error("Create property error:", responseText);
        throw new Error(responseText || "Failed to create property");
      }
      toast.success("Property created successfully!");
      resetForm();
      fetchProperties();
    } catch (error) {
      toast.error("Error creating property");
      console.error(error);
    }
  };

  // DELETE
  const handleDeleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      const response = await fetch(
        `https://apis.geoestate.ai/api/Property/deleteProperty/${id}`,
        { method: "DELETE" }
      );
      const responseText = await response.text();
      if (!response.ok) {
        console.error("Delete property error:", responseText);
        throw new Error(responseText || "Failed to delete property");
      }
      toast.success("Property deleted successfully!");
      fetchProperties();
    } catch (error) {
      toast.error("Error deleting property");
      console.error(error);
    }
  };

  // EDIT
  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setFormData(property);
    setShowModal(true);
  };

  // UPDATE
  const handleUpdateProperty = async () => {
    if (!editingProperty?.idPropiedad) {
      toast.error("Invalid property data!");
      return;
    }
    try {
      // The API expects a payload: { "property": { ...fields } }
      const payload = { property: formData };

      console.log("Updating property with payload:", payload);
      const response = await fetch(
        `https://apis.geoestate.ai/api/Property/updateProperty/${editingProperty.idPropiedad}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const responseText = await response.text();
      if (!response.ok) {
        console.error("Update property error:", responseText);
        throw new Error(responseText || "Failed to update property");
      }
      toast.success("Property updated successfully!");
      setShowModal(false);
      fetchProperties();
    } catch (error) {
      toast.error("Error updating property");
      console.error(error);
    }
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      idPropiedad: 0,
      idOrigen: "",
      titulo: "",
      url: "",
      foto: "",
      precio: 0,
      detalle: "",
      descripcion: "",
      direccion: "",
      fuente: "",
      habitaciones: 0,
      telefono: "",
      banos: 0,
      piscina: false,
      area: 0,
      planta: 0,
      fechaPublicacion: new Date().toISOString(),
      activo: true,
      verificado: true,
      latitud: 0,
      longitud: 0,
      tipo: 0,
      provincia: "",
      municipio: "",
      zona: "",
      tipoInmueble: "",
      amenities: "",
    });
  };

  // PAGINATION
  const totalPages = Math.max(1, Math.ceil(properties.length / propertiesPerPage));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  if (safePage !== currentPage) {
    setCurrentPage(safePage);
  }
  const startIndex = (safePage - 1) * propertiesPerPage;
  const displayedProperties = properties.slice(startIndex, startIndex + propertiesPerPage);

  return (
    <>
      <Sidebar />
      {/* ToastContainer so we see success/error toasts */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Container className="mt-4">
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
          {/* VIEW PROPERTIES */}
          <Tab eventKey="view" title="View Properties">
            <Card className="shadow p-3">
              <h4 className="text-success">Properties List</h4>
              <Table striped bordered hover className="shadow mt-3 text-center">
                <thead className="bg-success text-white">
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Location</th>
                    <th>Rooms</th>
                    <th>Bathrooms</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProperties.length > 0 ? (
                    displayedProperties.map((property) => (
                      <tr key={property.idPropiedad}>
                        <td>{property.idPropiedad}</td>
                        <td>{property.titulo}</td>
                        <td>${property.precio}</td>
                        <td>{property.direccion}</td>
                        <td>{property.habitaciones}</td>
                        <td>{property.banos}</td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleEditProperty(property)}
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteProperty(property.idPropiedad)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No properties found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {/* PAGINATION */}
              <Pagination className="justify-content-center">
                {buildPaginationItems(safePage, totalPages, setCurrentPage)}
              </Pagination>
            </Card>
          </Tab>

          {/* CREATE PROPERTY */}
          <Tab eventKey="create" title="Create Property">
            <Card className="shadow p-3">
              <h4 className="text-success text-center">Create Property</h4>
              <Form onSubmit={handleCreateProperty}>
                {Object.keys(formData).map((key) => {
                  if (key === "fechaPublicacion") {
                    const dateOnly = formData.fechaPublicacion.substring(0, 10);
                    return (
                      <Form.Group className="mb-3" key={key}>
                        <Form.Label>{key}</Form.Label>
                        <Form.Control
                          type="date"
                          name={key}
                          value={dateOnly}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    );
                  }
                  if (["piscina", "activo", "verificado"].includes(key)) {
                    return (
                      <Form.Group className="mb-3" key={key}>
                        <Form.Check
                          type="checkbox"
                          label={key}
                          name={key}
                          checked={!!formData[key]}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              [key]: e.target.checked,
                            }))
                          }
                        />
                      </Form.Group>
                    );
                  }
                  // For the "foto" field, render a file input block
                  if (key === "foto") {
                    return (
                      <Form.Group className="mb-3" key={key}>
                        <Form.Label>{key}</Form.Label>
                        <Form.Control
                          type="file"
                          name={key}
                          onChange={handleFileChange}
                          required
                        />
                      </Form.Group>
                    );
                  }
                  return (
                    <Form.Group className="mb-3" key={key}>
                      <Form.Label>{key}</Form.Label>
                      <Form.Control
                        type={
                          ["precio", "banos", "habitaciones", "area", "planta", "idPropiedad"].includes(
                            key
                          )
                            ? "number"
                            : "text"
                        }
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  );
                })}
                <Button variant="success" type="submit" className="w-100">
                  Create Property
                </Button>
              </Form>
            </Card>
          </Tab>
        </Tabs>
      </Container>

      {/* EDIT PROPERTY MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(formData).map((key) => {
              if (key === "fechaPublicacion") {
                const dateOnly = formData.fechaPublicacion.substring(0, 10);
                return (
                  <Form.Group className="mb-3" key={key}>
                    <Form.Label>{key}</Form.Label>
                    <Form.Control
                      type="date"
                      name={key}
                      value={dateOnly}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                );
              }
              if (["piscina", "activo", "verificado"].includes(key)) {
                return (
                  <Form.Group className="mb-3" key={key}>
                    <Form.Check
                      type="checkbox"
                      label={key}
                      name={key}
                      checked={!!formData[key]}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [key]: e.target.checked,
                        }))
                      }
                    />
                  </Form.Group>
                );
              }
              // For editing, if key is "foto", also render a file input block
              if (key === "foto") {
                return (
                  <Form.Group className="mb-3" key={key}>
                    <Form.Label>{key}</Form.Label>
                    <Form.Control
                      type="file"
                      name={key}
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                );
              }
              return (
                <Form.Group className="mb-3" key={key}>
                  <Form.Label>{key}</Form.Label>
                  <Form.Control
                    type={
                      ["precio", "banos", "habitaciones", "area", "planta", "idPropiedad"].includes(key)
                        ? "number"
                        : "text"
                    }
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              );
            })}
            <Button variant="primary" onClick={handleUpdateProperty} className="w-100">
              Update Property
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Properties;
