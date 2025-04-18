import React, { useState, useEffect } from 'react';
import './PropertyFilter.css';
import PriceRangeSlider from './PriceRangeSlider';
import axios from 'axios';

const PropertyFilter = ({ onSubmit, onFilterResults }) => {
  const [formData, setFormData] = useState({
    selectedCities: [],
    priceRange: { min: 0, max: 1000 },
    builtArea: { min: 0, max: 500 },
    plotArea: '',
    transactionType: "sale", // "sale" or "rent"
    rentFurnished: false,
    rentUnfurnished: false,
    propertyType: "",
    bedrooms: [],
    bathrooms: [],
    touristLicense: null, // true, false, or null
    viewOrientation: {
      seaView: false,
      mountainView: false,
      firstline: false
    },
    accessibility: null, // true, false, or null
    statusFilters: [],
    selectedProvince: "Select",
    islands: [],
    locationSearch: "",
    locations: [], // For selected locations
    sortBy: "date-desc", // Default sort by newest
    selectedLocations: [] // For checked locations in the dropdown
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for API data
  const [provinces, setProvinces] = useState([]);
  const [islands, setIslands] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [zones, setZones] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({});

  // Fetch provinces when component mounts
  useEffect(() => {
    fetchProvinces();
    fetchPropertyTypes();
  }, []);

  // Fetch provinces
  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://apis.geoestate.ai/api/filter-properties/provincias');
      
      // Transform the data to match the format expected by the component
      const formattedProvinces = response.data.map(provincia => ({
        name: provincia,
        items: [] // Will be populated when a province is selected
      }));
      
      setProvinces(formattedProvinces);
    } catch (err) {
      console.error('Error fetching provinces:', err);
      setError('Failed to fetch provinces. Please try again.');
    }
  };

  // Fetch property types
  const fetchPropertyTypes = async () => {
    try {
      const response = await axios.get('https://apis.geoestate.ai/api/filter-properties/tipos-inmueble');
      setPropertyTypes(response.data.map(item => item.Name));
    } catch (err) {
      console.error('Error fetching property types:', err);
    }
  };

  // Fetch islands for a selected province
  const fetchIslands = async (provinceName) => {
    try {
      const response = await axios.get(`https://apis.geoestate.ai/api/filter-properties/islands?provincia=${provinceName}`);
      
      // Format islands to match the component's expected structure
      const formattedIslands = response.data.map((item) => ({
        id: item.Id,
        name: item.Name,
        isSelected: item.IsSelected
      }));
      
      // Update the province in the provinces array
      const updatedProvinces = provinces.map(province => {
        if (province.name === provinceName) {
          return {
            ...province,
            items: formattedIslands
          };
        }
        return province;
      });
      
      setProvinces(updatedProvinces);
      setIslands(formattedIslands);
    } catch (err) {
      console.error('Error fetching islands:', err);
      setError('Failed to fetch islands. Please try again.');
    }
  };

  // Fetch municipalities for a selected island
  const fetchMunicipalities = async (island) => {
    try {
      const response = await axios.get(`https://apis.geoestate.ai/api/filter-properties/municipios?island=${island}`);
      setMunicipalities(response.data);
    } catch (err) {
      console.error('Error fetching municipalities:', err);
    }
  };

  // Fetch zones for a selected municipality
  const fetchZones = async (municipio) => {
    try {
      const response = await axios.get(`https://apis.geoestate.ai/api/filter-properties/zonas?municipio=${municipio}`);
      setZones(response.data);
    } catch (err) {
      console.error('Error fetching zones:', err);
    }
  };

  // Search for locations (autocomplete)
  const searchLocations = async (query) => {
    if (!query || query.length < 2) {
      setLocationSuggestions([]);
      return;
    }
    
    try {
      const response = await axios.get(`https://apis.geoestate.ai/api/filter-properties/location-suggestions?query=${query}`);
      
      // Group suggestions by municipality/zone
      const groupedSuggestions = [];
      const seen = new Set();
      
      response.data.forEach(location => {
        // Extract first part as the main category (municipality)
        const parts = location.split(' ');
        const mainCategory = parts[0].toUpperCase();
        
        if (!seen.has(mainCategory)) {
          seen.add(mainCategory);
          
          // Find all locations that start with this category
          const categoryItems = response.data
            .filter(item => item.startsWith(parts[0]))
            .map(item => ({
              name: item,
              isSelected: formData.selectedLocations.includes(item)
            }));
          
          groupedSuggestions.push({
            category: mainCategory,
            items: categoryItems
          });
        }
      });
      
      setLocationSuggestions(groupedSuggestions);
      setShowLocationDropdown(true);
    } catch (err) {
      console.error('Error searching locations:', err);
    }
  };

  // Handle location search input changes
  const handleLocationSearchChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, locationSearch: value }));
    searchLocations(value);
  };

  // Toggle location in selected locations
  const toggleLocationSelection = (location) => {
    setFormData(prev => {
      const currentSelections = [...prev.selectedLocations];
      const index = currentSelections.indexOf(location);
      
      if (index === -1) {
        currentSelections.push(location);
      } else {
        currentSelections.splice(index, 1);
      }
      
      // Update the location search field to show all selected locations
      const locationSearch = currentSelections.join(', ');
      
      return {
        ...prev,
        selectedLocations: currentSelections,
        locationSearch: locationSearch
      };
    });
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Function to build API URL based on form data - Updated to match backend API expectations
  const buildApiUrl = () => {
    const baseUrl = 'https://apis.geoestate.ai/api/filter-properties';
    
    // Start with required parameters
    let params = new URLSearchParams({
      Version: '1'
    });
    
    // Add sorting if specified
    if (formData.sortBy) {
      params.append('SortBy', formData.sortBy);
    }
    
    // Add locations if selected
    if (formData.selectedLocations.length > 0) {
      params.append('Locations', formData.selectedLocations.join(','));
    }
    
    // Add islands if selected
    if (formData.islands.length > 0) {
      const selectedIslands = provinces
        .flatMap(p => p.items)
        .filter(item => formData.islands.includes(item.id))
        .map(item => item.name);
      
      if (selectedIslands.length > 0) {
        params.append('Islands', selectedIslands.join(','));
      }
    }
    
    // Add property type if selected
    if (formData.propertyType) {
      params.append('PropertyTypes', formData.propertyType);
    }
    
    // Add area parameters if they exist
    if (formData.builtArea.min > 0) {
      params.append('MinArea', formData.builtArea.min);
    }
    
    if (formData.builtArea.max < 500) {
      params.append('MaxArea', formData.builtArea.max);
    }
    
    // Add price range if set
    if (formData.priceRange.min > 0) {
      params.append('MinPrice', formData.priceRange.min * 10000); // Convert to appropriate scale
    }
    
    if (formData.priceRange.max < 1000) {
      params.append('MaxPrice', formData.priceRange.max * 10000); // Convert to appropriate scale
    }
    
    // Add transaction type
    params.append('RentalType', formData.transactionType === 'sale' ? 'Sale' : 'Rent');
    
    // Add bedroom filters if selected
    if (formData.bedrooms.length > 0) {
      // Parse bedroom selection to get proper values for API
      const minBedrooms = formData.bedrooms.reduce((min, bed) => {
        const num = bed === "Studio (0)" ? 0 : parseInt(bed);
        return isNaN(num) ? min : Math.min(min, num);
      }, Infinity);
      
      if (minBedrooms !== Infinity) {
        params.append('MinBedrooms', minBedrooms);
      }
    }
    
    // Add bathroom filters if selected
    if (formData.bathrooms.includes("Swimming pool")) {
      params.append('HasPool', 'true');
    }
    
    // Add amenities from bathrooms selections (which contain more than just bathrooms)
    const amenities = formData.bathrooms.filter(item => 
      item !== "Swimming pool" && 
      ["Elevator", "Balcony/Terrace", "Garden", "Air conditioning", "Heating", "Furnished"].includes(item)
    );
    
    if (amenities.length > 0) {
      params.append('Amenities', amenities.join(','));
    }
    
    // Add city if selected
    if (formData.selectedCities.length > 0) {
      params.append('Municipality', formData.selectedCities.join(','));
    }
    
    // Add tourist license filter if selected
    if (formData.touristLicense !== null) {
      // Add a relevant parameter that might be supported in the backend
      params.append('HolidayLicense', formData.touristLicense ? 'Yes' : 'No');
    }
    
    // Add view orientation filters
    if (formData.viewOrientation.seaView) {
      params.append('SeaView', 'true');
    }
    
    if (formData.viewOrientation.mountainView) {
      params.append('MountainView', 'true');
    }
    
    if (formData.viewOrientation.firstline) {
      params.append('FrontLine', 'true');
    }
    
    // Add accessibility parameter if set
    if (formData.accessibility !== null) {
      params.append('Accessibility', formData.accessibility ? 'Yes' : 'No');
    }
    
    // Add rental specific filters
    if (formData.transactionType === 'rent') {
      if (formData.rentFurnished) {
        // Could be included in Amenities
        const currentAmenities = params.get('Amenities') || '';
        const updatedAmenities = currentAmenities ? `${currentAmenities},Furnished` : 'Furnished';
        params.set('Amenities', updatedAmenities);
      }
    }
    
    // Add pagination parameters
    params.append('PageNumber', '1');
    params.append('PageSize', '50');
    
    return `${baseUrl}?${params.toString()}`;
  };

  // Function to fetch properties based on filter criteria
  const fetchProperties = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const apiUrl = buildApiUrl();
      console.log('Fetching properties with URL:', apiUrl);
      
      const response = await axios.get(apiUrl);
      
      // Handle successful response
      console.log('API Response:', response.data);
      
      // Pass the results to parent component if callback exists
      if (onFilterResults) {
        onFilterResults(response.data);
      }
      
      setIsLoading(false);
      return response.data;
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to fetch properties. Please try again.');
      setIsLoading(false);
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCityChange = (city) => {
    setFormData(prev => ({
      ...prev,
      selectedCities: prev.selectedCities.includes(city)
        ? prev.selectedCities.filter(c => c !== city)
        : [...prev.selectedCities, city]
    }));
  };

  const handleRangeChange = (field, subField, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value
      }
    }));
  };

  const handleTransactionTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      transactionType: type,
      rentFurnished: false,
      rentUnfurnished: false
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleViewOrientationChange = (field) => {
    setFormData(prev => ({
      ...prev,
      viewOrientation: {
        ...prev.viewOrientation,
        [field]: !prev.viewOrientation[field]
      }
    }));
  };

  const handleStatusFilterChange = (id) => {
    setFormData(prev => {
      const newStatusFilters = prev.statusFilters.includes(id)
        ? prev.statusFilters.filter(item => item !== id)
        : [...prev.statusFilters, id];
      return { ...prev, statusFilters: newStatusFilters };
    });
  };

  const handleProvinceChange = (e) => {
    const provinceName = e.target.value;
    setFormData(prev => ({
      ...prev,
      selectedProvince: provinceName,
      islands: [] // Reset islands when province changes
    }));
    
    // Fetch islands for this province
    if (provinceName !== "Select") {
      fetchIslands(provinceName);
    }
  };

  const handleIslandChange = (islandId, islandName) => {
    setFormData(prev => {
      const newIslands = prev.islands.includes(islandId)
        ? prev.islands.filter(id => id !== islandId)
        : [...prev.islands, islandId];
        
      // If island is selected, fetch its municipalities
      if (!prev.islands.includes(islandId)) {
        fetchMunicipalities(islandName);
      }
      
      return { ...prev, islands: newIslands };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Call local onSubmit if provided
    if (onSubmit) {
      onSubmit(formData);
    }
    
    // Fetch properties from API
    const results = await fetchProperties();
    
    console.log("Form submitted with data:", formData);
    console.log("API results:", results);
  };

  const handleReset = () => {
    setFormData({
      selectedCities: [],
      priceRange: { min: 0, max: 1000 },
      builtArea: { min: 0, max: 500 },
      plotArea: '',
      transactionType: "sale",
      rentFurnished: false,
      rentUnfurnished: false,
      propertyType: "",
      bedrooms: [],
      bathrooms: [],
      touristLicense: null,
      viewOrientation: {
        seaView: false,
        mountainView: false,
        firstline: false
      },
      accessibility: null,
      statusFilters: [],
      selectedProvince: "Select",
      islands: [],
      locationSearch: "",
      locations: [],
      sortBy: "date-desc",
      selectedLocations: []
    });
    
    // Clear suggestions
    setLocationSuggestions([]);
    setShowLocationDropdown(false);
  };

  // Sample data for the locations dropdown (will be replaced with API data)
  const locationGroups = [
    {
      category: "ALARÓ",
      items: [
        { name: "Alaró", isSelected: false }
      ]
    },
    {
      category: "ALCUDIA",
      items: [
        { name: "Alcúdia", isSelected: false },
        { name: "Cielo de Bonaire", isSelected: false },
        { name: "Port d'Alcúdia", isSelected: false }
      ]
    },
    {
      category: "ALGAIDA",
      items: [
        { name: "Algaida", isSelected: false },
        { name: "Pina", isSelected: false }
      ]
    },
    {
      category: "ANDRATX",
      items: [
        { name: "Andratx", isSelected: false },
        { name: "Camp de Mar", isSelected: false },
        { name: "Port d'Andratx", isSelected: false },
        { name: "S'Arracó", isSelected: false },
        { name: "Sant Elm", isSelected: false }
      ]
    },
    {
      category: "ARIANY",
      items: [
        { name: "Ariany", isSelected: false }
      ]
    }
  ];

  // Get cities from the municipalities data if available, otherwise use default
  const cities = municipalities.length > 0 
    ? municipalities.map(m => m.Name) 
    : ['Palma', 'Alcuida', 'Sollor']; 
    
  const bedroomOptions = ["Studio (0)", "1", "2", "3+", "4+"];
  const bathroomOptions = ["Swimming pool", "Elevator", "Balcony/Terrace", "Garden", "Air conditioning", "Heating", "Furnished"];
  const statusFilters = [
    { id: 1, label: "New listings on the market (last 48 hours)", checked: false },
    { id: 2, label: "Price reduction", checked: false },
    { id: 3, label: "Bank-owned properties", checked: false },
    { id: 4, label: "Auction properties", checked: false },
    { id: 5, label: "Discounted properties", checked: false },
    { id: 6, label: "Private owners only", checked: false },
    { id: 7, label: "Cheapest price per m² investment", checked: false }
  ];

  return (
    <form className="property-filter-container filter-con" onSubmit={handleSubmit}>
      <div className='filter-header d-flex justify-content-between align-items-center'>
        <h1 className="filter-title">Property Filter</h1>
        <button type="button" className="btn reset-btn" onClick={handleReset}>
          Reset all
        </button>
      </div>
  
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
  
      {/* Location Search Field with dropdown similar to image */}
      <div className="mt-3 position-relative">
        <label className="text-muted section-label">Location/s (separated by comma)</label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="Search locations..."
            value={formData.locationSearch}
            onClick={() => setShowLocationDropdown(true)}
            onChange={handleLocationSearchChange}
            style={{backgroundColor: "#fff"}}
          />
          
          {/* Location suggestions dropdown - styled like the image */}
          {showLocationDropdown && (
            <div className="location-dropdown" style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              maxHeight: "350px", 
              overflowY: "auto",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              zIndex: 1000,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}>
              {(locationSuggestions.length > 0 ? locationSuggestions : locationGroups).map((group, groupIndex) => (
                <div key={groupIndex} className="location-group">
                  <div 
                    className="location-group-header" 
                    style={{
                      padding: "8px 15px",
                      backgroundColor: "#f8f9fa",
                      fontWeight: "bold",
                      borderBottom: "1px solid #eee"
                    }}
                  >
                    {group.category}
                  </div>
                  <div className="location-group-items">
                    {group.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex} 
                        className="location-item"
                        style={{
                          padding: "8px 15px",
                          paddingLeft: "30px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          borderBottom: "1px solid #eee"
                        }}
                        onClick={() => toggleLocationSelection(item.name)}
                      >
                        <input 
                          type="checkbox" 
                          checked={formData.selectedLocations.includes(item.name)} 
                          onChange={() => {}} 
                          style={{marginRight: "10px"}}
                        />
                        <span style={{color: formData.selectedLocations.includes(item.name) ? "#f90" : "#333"}}>
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  
      <div className="mt-3">
        <label className="text-muted section-label">Select province</label>
        <select 
          className="form-control" 
          value={formData.selectedProvince}
          onChange={handleProvinceChange}
        >
          <option value="Select">Select</option>
          {provinces.map((province, index) => (
            <option key={index} value={province.name}>{province.name}</option>
          ))}
        </select>
  
        {formData.selectedProvince !== "Select" && (
          <div className="ms-3 mt-2">
            <h6>{formData.selectedProvince}</h6>
            <div className="d-flex flex-column gap-2">
              {provinces
                .find(p => p.name === formData.selectedProvince)
                ?.items.map(island => (
                  <div key={island.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`island-${island.id}`}
                      checked={formData.islands.includes(island.id)}
                      onChange={() => handleIslandChange(island.id, island.name)}
                    />
                    <label className="form-check-label" htmlFor={`island-${island.id}`}>
                      {island.name}
                    </label>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="filter-section d-flex flex-wrap mt-3">
        <label className="section-label">Select city</label>
        <select 
          className="filter-dropdown" 
          name="city" 
          value={formData.selectedCities[0] || ""} 
          onChange={(e) => handleCityChange(e.target.value)}
        >
          <option value="">Select</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
  
      <div className="container mt-4">
        <label className="section-label filter-label">Transaction Type</label>
        <div className="btn-group transbtngroup">
          <button
            type="button"
            className={`btn transbtn ${formData.transactionType === "sale" ? "active" : ""}`}
            onClick={() => handleTransactionTypeChange("sale")}
          >
            For Sale
          </button>
          <button
            type="button"
            className={`btn transbtn ${formData.transactionType === "rent" ? "active" : ""}`}
            onClick={() => handleTransactionTypeChange("rent")}
          >
            For Rent
          </button>
        </div>
  
        {formData.transactionType === "rent" && (
          <div className="p-3 rounded bg-light d-flex gap-5 justify-content-center mt-3">
            <div className='d-flex column-gap-1 align-items-center'>
              <input 
                type='checkbox' 
                className='check'
                id='furnished'
                checked={formData.rentFurnished}
                onChange={() => handleCheckboxChange("rentFurnished", !formData.rentFurnished)}
              /> 
              <label htmlFor='furnished' className='fw-normal mb-1'>Furnished</label>
            </div>
            <div className='d-flex column-gap-1 align-items-center'>
              <input 
                type='checkbox' 
                className='check'
                id='unfurnished'
                checked={formData.rentUnfurnished}
                onChange={() => handleCheckboxChange("rentUnfurnished", !formData.rentUnfurnished)}
              /> 
              <label htmlFor="unfurnished" className='fw-normal mb-1'>Unfurnished</label>
            </div>
          </div>
        )}
      </div>
  
      <div className="divider"></div>
      
      <PriceRangeSlider 
        min={0}
        max={1000} // 10M€
        onChange={(range) => {
          setFormData(prev => ({
            ...prev,
            priceRange: {
              min: range.min,
              max: range.max
            }
          }));
        }}
        value={formData.priceRange}
      />
      
      <div className="divider"></div>
      
      <div className="filter-section">
        <h2 className="section-header">Built area</h2>
        <div className="range-input-container">
          <div className="range-input">
            <label>Min</label>
            <input
              type="number"
              value={formData.builtArea.min}
              onChange={(e) => handleRangeChange('builtArea', 'min', parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="range-input">
            <label>Max</label>
            <input
              type="number"
              value={formData.builtArea.max}
              onChange={(e) => handleRangeChange('builtArea', 'max', parseInt(e.target.value) || 500)}
            />
          </div>
        </div>
        <div className="range-values">
          <span>{formData.builtArea.min}m²</span>
          <span>{formData.builtArea.max}m²</span>
        </div>
      </div>
      
      <div className="divider"></div>
      
      <div className="filter-section">
        <h2 className="section-header">Plot area</h2>
        <input
          type="text"
          className="plot-area-input"
          value={formData.plotArea}
          onChange={(e) => handleChange({ target: { name: 'plotArea', value: e.target.value } })}
          placeholder="Enter plot area"
          name="plotArea"
        />
      </div>
  
      <div className="filter-section d-flex flex-wrap">
        <label className="section-label">Property Type</label>
        <select 
          className="filter-dropdown"
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {propertyTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select> 
      </div>
  
      <div className="mt-3">
        <h6 className="text-muted section-label">Bedrooms</h6>
        <div className="d-flex gap-2 flex-wrap">
          {bedroomOptions.map((option, index) => (
            <button
              type="button"
              key={index}
              className={`btn bedroom-btn btn-outline-primary ${formData.bedrooms.includes(option) ? "active" : ""}`}
              onClick={() => handleCheckboxChange(
                'bedrooms',
                formData.bedrooms.includes(option)
                  ? formData.bedrooms.filter(item => item !== option)
                  : [...formData.bedrooms, option]
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
  
      <div className="mt-3">
        <h6 className="text-muted section-label">Bathrooms & Amenities</h6>
        <div className="d-flex gap-2 flex-wrap">
          {bathroomOptions.map((option, index) => (
            <button
              type="button"
              key={index}
              className={`btn bedroom-btn btn-outline-primary ${formData.bathrooms.includes(option) ? "active" : ""}`}
              onClick={() => handleCheckboxChange(
                'bathrooms',
                formData.bathrooms.includes(option)
                  ? formData.bathrooms.filter(item => item !== option)
                  : [...formData.bathrooms, option]
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
  
      <div className="filter-section d-flex flex-wrap">
        <label className="section-label">Tourist License</label>
        <div className="p-3 d-flex gap-3 flex-wrap">
          <div className='d-flex align-items-center'>
            <input 
              type='checkbox' 
              className='checks'
              checked={formData.touristLicense === true}
              onChange={() => handleCheckboxChange('touristLicense', formData.touristLicense === true ? null : true)}
            /> 
            <label>Yes</label>
          </div>
          <div className='d-flex align-items-center'>
            <input 
              type='checkbox' 
              className='checks'
              checked={formData.touristLicense === false}
              onChange={() => handleCheckboxChange('touristLicense', formData.touristLicense === false ? null : false)}
            /> 
            <label>No</label>
          </div>
        </div>
      </div>
  
      <div className="filter-section d-flex flex-wrap">
        <label className="section-label">View/Orientation</label>
        <div className="p-3 d-flex gap-3 w-100 view-con">
          <div className='d-flex align-items-center box'>
            <input 
              type='checkbox' 
              className='checks'
              checked={formData.viewOrientation.seaView}
              onChange={() => handleViewOrientationChange('seaView')}
            /> 
            <label className='check-label'>Sea view</label>
          </div>
          <div className='d-flex align-items-center box'>
            <input 
              type='checkbox' 
              className='checks'
              checked={formData.viewOrientation.mountainView}
              onChange={() => handleViewOrientationChange('mountainView')}
            /> 
            <label className='check-label'>Mountain view</label>
          </div>
          <div className='d-flex align-items-center box'>
            <input 
              type='checkbox' 
              className='checks'
              checked={formData.viewOrientation.firstline}
              onChange={() => handleViewOrientationChange('firstline')}
            /> 
            <label className='check-label'>Firstline</label>
          </div>
        </div>
      </div>
  
      <div className="filter-section d-flex flex-wrap">
        <label className="section-label">Accessibility</label>
        <div className="p-3 d-flex gap-3 flex-wrap">
          <div className='d-flex align-items-center'>
            <input 
              type='checkbox' 
              className='checks'
              checked={formData.accessibility === true}
              onChange={() => handleCheckboxChange('accessibility', formData.accessibility === true ? null : true)}
            /> 
            <label>Yes</label>
          </div>
          <div className='d-flex align-items-center'>
            <input 
              type='checkbox' 
              className='checks'
              checked={formData.accessibility === false}
              onChange={() => handleCheckboxChange('accessibility', formData.accessibility === false ? null : false)}
            /> 
            <label>No</label>
          </div>
        </div>
      </div>
  
      <div className="mt-3">
        <h6 className="text-muted section-label">Status Filters</h6>
        <div className="d-flex flex-column gap-2">
          {statusFilters.map((filter) => (
            <div key={filter.id} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`filter-${filter.id}`}
                checked={formData.statusFilters.includes(filter.id)}
                onChange={() => handleStatusFilterChange(filter.id)}
              />
              <label className="form-check-label check-label" htmlFor={`filter-${filter.id}`}>
                {filter.label}
              </label>
            </div>
          ))}
        </div>
      </div>
  
      <div className="mt-4">
        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Apply Filters'}
        </button>
      </div>
    </form>
  );
};

export default PropertyFilter;