import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  ListGroup,
  Offcanvas,
} from "react-bootstrap";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filters from "../../components/Filters";
import "./topbar.css";
import { Link, useLocation } from "react-router-dom";
import { FaFilter } from "react-icons/fa6";

const TopBar = ({ properties, updateProperties }) => {
  const [zones, setZones] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [calles, setCalles] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const [filters, setFilters] = useState({
    version: "",
    sortBy: "",
    country: "",
    community: "",
    municipality: "",
    province: "",
    zone: "",
    city: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    residential: "",
    commercial: "",
    calle: "",
  });

  const [showSidebar, setShowSidebar] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [language, setLanguage] = useState("Select Language");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [maxPrice, setMaxPrice] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [selectedColor, setSelectedColor] = useState("white");

  const prices = [];
  const areas = [];
  for (let area = 50; area <= 5000; area += 50) {
    areas.push(`${area} sqm`);
  }
  for (let price = 100000; price <= 3100000; price += 50000) {
    prices.push(`$${price.toLocaleString()}`);
  }

  const location = useLocation();
  console.log(location.pathname.split("/")[1]);

  const fetchProvinces = async () => {
    try {
      const response = await fetch(
        "https://apis.geoestate.ai/api/MapApi/zonas"
      );
      if (!response.ok) throw new Error("Failed to fetch provinces");
      const data = await response.json();
      console.log("Provinces API Response:", data);
      setProvinces(data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchZones = async (idProvincia) => {
    try {
      const response = await fetch(
        `https://apis.geoestate.ai/api/MapApi/zonas/${idProvincia}`
      );
      if (!response.ok) throw new Error("Failed to fetch zones");
      const data = await response.json();
      console.log("Zones API Response:", data);
      setZones(data);
    } catch (error) {
      console.error("Error fetching zones:", error);
    }
  };

  useEffect(() => {
    if (filters.province) {
      fetchZones(filters.province);
      setFilters((prev) => ({
        ...prev,
        zone: "",
        municipality: "",
        calle: "",
      }));
      setMunicipalities([]);
      setCalles([]);
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
          console.log("Municipalities API Response:", data);
          setMunicipalities(data);
          setFilters((prev) => ({ ...prev, municipality: "", calle: "" }));
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
          console.log("Calles API Response:", data);
          setCalles(data);
          setFilters((prev) => ({ ...prev, calle: "" }));
        })
        .catch((err) => console.error("Error fetching calles:", err));
    } else {
      setCalles([]);
    }
  }, [filters.municipality, filters.province]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleProvinceChange = (idProvincia) => {
    setFilters({
      ...filters,
      province: idProvincia,
      municipality: "",
      zone: "",
      calle: "",
    });
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    localStorage.setItem("selectedColor", color);
    window.dispatchEvent(new Event("storage"));
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filteredProperties = properties.filter((property) => {
        const titleMatch = property.titulo
          ? property.titulo.toLowerCase().includes(value.toLowerCase())
          : false;
        const zoneMatch = property.zona
          ? property.zona.toLowerCase().includes(value.toLowerCase())
          : false;
        const descriptionMatch = property.descripcion
          ? property.descripcion.toLowerCase().includes(value.toLowerCase())
          : false;
        const municipalityMatch = property.municipio
          ? property.municipio.toLowerCase().includes(value.toLowerCase())
          : false;
        return titleMatch || zoneMatch || descriptionMatch || municipalityMatch;
      });
      console.log(filteredProperties.slice(0, 3));
      setSuggestions(filteredProperties);
    } else {
      setSuggestions([]);
    }
  };

  const handleMaxPriceChange = (price) => {
    setMaxPrice(price);
    setFilters((prevFilters) => ({
      ...prevFilters,
      maxPrice: price.replace(/\D/g, ""),
    }));
  };

  const handleMaxAreaChange = (area) => {
    setMaxArea(area);
    setFilters((prevFilters) => ({
      ...prevFilters,
      maxArea: area.replace(/\D/g, ""),
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      version: "",
      sortBy: "",
      country: "",
      community: "",
      municipality: "",
      province: "",
      zone: "",
      city: "",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
      residential: "",
      commercial: "",
      calle: "",
    });
    setMaxPrice("");
    setMaxArea("");
    setSearchTerm("");
    setSuggestions([]);
    updateProperties([]);
  };

  const handleSelectSuggestion = (property) => {
    updateProperties([property]);
    setSuggestions([]);
    setSearchTerm("");
  };

  const fetchProperties = async () => {
    const params = new URLSearchParams({
      ...filters,
      maxPrice: maxPrice.replace(/\D/g, ""),
      municipality: filters.municipality || "",
      province: filters.province || "",
      city: filters.city || "",
    });
    try {
      const response = await fetch(
        `https://apis.geoestate.ai/api/FilterProperties?${params.toString()}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      updateProperties(data);
    } catch (error) {
      console.error("Failed  to fetch properties::", error);
    }
  };

  useEffect(() => {
    if (maxPrice || maxArea) {
      fetchProperties();
    }
  }, [maxPrice, maxArea]);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="p-3 py-4 px-md-5 "
        style={{
          zIndex: "100",
          backgroundColor: "var(--color-bg)",
          boxShadow: "none",
          marginLeft:"20px",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        <Navbar.Toggle
          aria-controls="navbar-side"
          onClick={() => setShowSidebar(true)}
        />
        <Navbar.Collapse id="navbar-side">
          <Nav className="formcontrolfor me-auto w-100 d-flex flex-column flex-lg-row align-items-center">
            <Form className="d-flex flex-column flex-md-row w-100 mb-3 mb-lg-0 align-items-start align-items-md-center">
              <FormControl
                type="text"
                placeholder="Search location..."
                className="mr-sm-2 search-map rounded-1 mb-2 mb-md-0"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button
                variant="outline-light"
                className="rounded-1 mb-2 mb-md-0 mx-md-2"
                style={{ backgroundColor: "var(--color-bg)" }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
              <Button
                variant="outline-light"
                className="rounded-1 mb-2 mb-md-0"
                style={{ backgroundColor: "var(--color-bg)" }}
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
              {suggestions.length > 0 && (
                <ListGroup
                  className="position-absolute w-100"
                  style={{ top: "100%", left: "0", zIndex: 1050, maxWidth: "300px" }}
                >
                  {suggestions.slice(0, 3).map((suggestion, index) => (
                    <ListGroup.Item
                      key={index}
                      onClick={() => handleSelectSuggestion(suggestion)}
                    >
                      {suggestion.titulo} - {suggestion.zona}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Form>
          </Nav>

          <div className="formcontrolfor d-flex flex-column flex-md-row justify-content-end align-items-start align-items-md-center w-100">
            <Button
              variant="outline-light"
              className="rounded-1 mx-2 my-1"
              style={{ backgroundColor: "var(--color-bg)" }}
              onClick={() => setShowFilter((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faFilter} /> Filter
            </Button>

           

            <div className="d-flex flex-column flex-lg-row my-1">
           

              <Dropdown className="mx-2 my-1">
                <Dropdown.Toggle
                  variant="outline-light"
                  id="dropdown-color"
                  className="rounded-1"
                  style={{ backgroundColor: "var(--color-bg)" }}
                >
                  Color
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleColorChange("red")}>
                    Red
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleColorChange("blue")}>
                    Blue
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleColorChange("green")}>
                    Green
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleColorChange("yellow")}>
                    Yellow
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown onSelect={handleLanguageChange} className="mx-2 my-1">
                <Dropdown.Toggle
                  variant="outline-light"
                  id="language-dropdown"
                  className="rounded-1"
                  style={{ backgroundColor: "var(--color-bg)" }}
                >
                  {language}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="en">English</Dropdown.Item>
                  <Dropdown.Item eventKey="es">Spanish</Dropdown.Item>
                  <Dropdown.Item eventKey="fr">French</Dropdown.Item>
                  <Dropdown.Item eventKey="de">German</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Button
                variant="outline-light"
                className="rounded-1 my-1"
                style={{ backgroundColor: "var(--color-bg)" }}
              >
                <Link
                  to={
                    !location.pathname.includes("PropertiesList")
                      ? `/${location.pathname.split("/")[1]}/PropertiesList`
                      : `/${location.pathname.split("/")[1]}`
                  }
                  className="d-flex flex-row align-items-center gap-1 text-decoration-none"
                >
                  <i
                    className={
                      !location.pathname.includes("PropertiesList")
                        ? "fas fa-chart-area"
                        : "fa-solid fa-map"
                    }
                  ></i>
                  <p className="text-nowrap m-0">
                    {!location.pathname.includes("PropertiesList")
                      ? "List Section"
                      : "Map View"}
                  </p>
                </Link>
              </Button>
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>

      <Filters
        show={showFilter}
        handleClose={() => setShowFilter(false)}
        property={properties}
        updateProperties={updateProperties}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
};

export default TopBar;
