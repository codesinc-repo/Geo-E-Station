import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, FormCheck } from "react-bootstrap";
import "./Filters.css";
import PropertyFilter from "./PropertyFilter";


const Filters = ({
  show,
  handleClose,
  property,
  updateProperties,
  filters,
  setFilters,
}) => {
  const [savedFilters, setSavedFilters] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);
  const [editFilterId, setEditFilterId] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [zones, setZones] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [calles, setCalles] = useState([]);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const fetchSavedFilters = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    try {
      const response = await fetch(`https://apis.geoestate.ai/api/UserFilter/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch saved filters');
      const data = await response.json();
      
      const transformedFilters = data.map(filter => ({
        id: filter.id,
        name: filter.filterName,
        filters: JSON.parse(filter.filterJson)
      }));
      
      setSavedFilters(transformedFilters);
    } catch (error) {
      console.error('Error fetching saved filters:', error);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await fetch("https://apis.geoestate.ai/api/filter-properties/provincias");
      if (!response.ok) throw new Error("Failed to fetch provinces");
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchZones = async (idProvincia) => {
    try {
      const response = await fetch(
        `https://apis.geoestate.ai/api/MapApi/zonas/${idProvincia}`
      );
      if (!response.ok) throw new Error("Failed to fetch zones");
      const data = await response.json();
      setZones(data);
    } catch (error) {
      console.error("Error fetching zones:", error);
    }
  };

  useEffect(() => {
    fetchSavedFilters();
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedFilterIndex >= 0 && savedFilters[selectedFilterIndex]) {
      setFilterName(savedFilters[selectedFilterIndex].name);
    } else {
      setFilterName("");
    }
  }, [selectedFilterIndex, savedFilters]);

  useEffect(() => {
    if (filters.province) {
      fetchZones(filters.province);
    } else {
      setZones([]);
    }
  }, [filters.province]);

  useEffect(() => {
    if (filters.zone && filters.province) {
      fetch(
        `https://apis.geoestate.ai/api/MapApi/municipios/${filters.province}?idZona=${filters.zone}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMunicipalities(data);
        })
        .catch((err) => console.error("Error fetching municipalities:", err));
    } else {
      setMunicipalities([]);
    }
  }, [filters.zone, filters.province]);

  useEffect(() => {
    if (filters.municipality && filters.province) {
      fetch(
        `https://apis.geoestate.ai/api/MapApi/calles/${filters.province}?idMunicipio=${filters.municipality}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCalles(data);
        })
        .catch((err) => console.error("Error fetching calles:", err));
    } else {
      setCalles([]);
    }
  }, [filters.municipality, filters.province]);

  const handleProvinceChange = (idProvincia) => {
    setFilters({
      ...filters,
      province: idProvincia,
      municipality: "",
      zone: "",
      calle: "",
    });
  };

  const handleSaveFilters = async () => {
    if (!filterName.trim()) {
      alert("Please enter a filter name");
      return;
    }
  
    if (isEditing && editFilterId) {
      await handleEditFilter();
      return;
    }
  
    const filterData = {
      userId: localStorage.getItem("user_id") || "",
      filterJson: JSON.stringify(filters),
      filterName: filterName
    };
  
    try {
      const response = await fetch('https://apis.geoestate.ai/api/UserFilter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filterData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save filters');
      }
      
      await fetchSavedFilters();
      setFilterName("");
      setShowSaveModal(false);
    } catch (error) {
      console.error('Error saving filters:', error);
    }
  };

  const handleEditFilter = async () => {
    if (!filterName.trim()) {
      alert("Please enter a filter name");
      return;
    }
  
    const userId = localStorage.getItem("user_id");
    if (!userId || !editFilterId) return;
  
    const filterData = {
      userId: userId,
      filterJson: JSON.stringify(filters),
      filterName: filterName
    };
  
    try {
      const response = await fetch(`https://apis.geoestate.ai/api/UserFilter/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filterData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update filter');
      }
      
      await fetchSavedFilters();
      setFilterName("");
      setShowSaveModal(false);
      setIsEditing(false);
      setSelectedFilterIndex(-1);
    } catch (error) {
      console.error('Error updating filter:', error);
    }
  };

  const handleDeleteFilter = async (filterId) => {
    try {
      // Get userId from wherever you store it (localStorage, context, etc.)
      const userId = localStorage.getItem('user_id'); // or from your state/context
      
      const response = await fetch(`https://apis.geoestate.ai/api/UserFilter/${filterId}/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete filter');
      }
  
      // Update UI after successful deletion
      setFilters(filters.filter(filter => filter.id !== filterId));
     
      
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (
      (id === "minPrice" ||
        id === "maxPrice" ||
        id === "minArea" ||
        id === "maxArea") &&
      value.trim() !== ""
    ) {
      setFilters((prevFilters) => ({ ...prevFilters, [id]: Number(value) }));
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, [id]: value }));
    }
  };

  const fetchProperties = async () => {
    const params = new URLSearchParams();

    const paramMapping = {
      version: "Version",
      sortBy: "SortBy",
      country: "Country",
      community: "Community",
      municipality: "Municipality",
      minPrice: "MinPrice",
      maxPrice: "MaxPrice",
      minArea: "MinArea",
      maxArea: "MaxArea",
      residential: "Residential",
      commercial: "Commercial",
      province: "Province",
      zone: "Zone",
      calle: "Calle"
    };

    Object.entries(filters).forEach(([key, value]) => {
      if ((value || value === 0) && paramMapping[key]) {
        params.append(paramMapping[key], value);
      }
    });

    try {
      const response = await fetch(
        `https://apis.geoestate.ai/api/FilterProperties?${params.toString()}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      updateProperties(data);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="modal-custom-bg">
          <Modal.Title className="text-white">Filter Properties</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-custom-bg">
         <PropertyFilter />
        </Modal.Body>
        <Modal.Footer className="modal-custom-bg">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isEditing ? (
            <>
              <Button variant="warning" onClick={() => setShowSaveModal(true)}>
                Edit Filter
              </Button>
              <Button variant="danger"  onClick={() => handleDeleteFilter(filters.id)}>
                Delete Filter
              </Button>
            </>
          ) : (
            <Button variant="dark" onClick={() => setShowSaveModal(true)}>
              Save Filters
            </Button>
          )}
          <Button variant="success" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)} centered>
        <Modal.Header closeButton className="modal-custom-bg">
          <Modal.Title className="text-white">
            {isEditing ? 'Edit Filter' : 'Save Current Filters'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-custom-bg">
          <Form.Group controlId="filterName">
            <Form.Label className="text-white">Filter Name</Form.Label>
            <Form.Control
              className="custom-modal-color"
              type="text"
              placeholder="Enter a name for your filter"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="modal-custom-bg">
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveFilters}>
            {isEditing ? 'Update' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Filters;