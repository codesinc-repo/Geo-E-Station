import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Pagination, ProgressBar,Form } from "react-bootstrap";
import TopBar from "../../components/TopBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import {  Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import "./propertieslist.css";
import AddPropertyModal from "./AddPropertyModal";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineShower,MdOutlineHomeWork } from "react-icons/md";
import { FaEnvelope, FaStar, FaTrash, FaShareAlt, FaPrint } from "react-icons/fa";
import { FaBed, FaBath,FaRulerCombined } from "react-icons/fa";

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const propertiesPerPage = 12;

  useEffect(() => {
    const role = localStorage.getItem("role");

    const fetchProperties = async () => {
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        if (progress >= 90) clearInterval(progressInterval);
        setLoadingProgress(progress);
      }, 100); // Simulate loading progress

      try {
        const response = await axios.get(
          "https://apis.geoestate.ai/api/Property/getPropertiesWithFoto"
        );
        setProperties(response.data);
        console.log(response.data,'all properties ');
        setTotalPages(Math.ceil(response.data.length / propertiesPerPage));
        setLoadingProgress(100); // Set to 100 when loading is complete
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        clearInterval(progressInterval);
      }
    };

    fetchProperties();
  }, []);


  console.log("properties",properties)
  const handleDeleteProperty = async (propertyId) => {
    try {
      const response = await axios.delete(
        `http://homevocation-001-site4.atempurl.com/api/Property/deleteProperty/${propertyId}`
      );
      console.log("Property Deleted:", response.data);
      alert("Property deleted successfully!");
    } catch (error) {
      console.error("Failed to delete property:", error);
      alert("Error deleting property. Please try again.");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClose = () => setSelectedProperty(null);

  const displayLocation = (property) => {
    return property.provincia && property.municipio
      ? `${property.provincia}, ${property.municipio}`
      : "Not available";
  };

  const paginationItems = () => {
    let items = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    if (currentPage > 1) {
      items.push(
        <Pagination.First key="first" onClick={() => handlePageChange(1)} />
      );
      items.push(
        <Pagination.Prev
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
        />
      );
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (currentPage < totalPages) {
      items.push(
        <Pagination.Next
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
        />
      );
      items.push(
        <Pagination.Last
          key="last"
          onClick={() => handlePageChange(totalPages)}
        />
      );
    }

    return items;
  };

  const handleAddProperty = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <>
      <TopBar />
      <div className="container mt-5">
        <h3 className="mb-4 text-center fw-bold">Properties List</h3>

        <AddPropertyModal
          show={showAddModal}
          handleClose={handleCloseAddModal}
        />
        {loadingProgress < 100 ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            <h4>Loading Properties...</h4>
            <div className="custom-progress-container">
              <ProgressBar
                animated
                now={loadingProgress}
                className="custom-progress-bar"
                label={
                  <span className="custom-progress-label">
                    {`${loadingProgress}%`}
                  </span>
                }
              />
            </div>
          </div>
        ) : (
          <>
            <div className="w-100 d-flex my-3">
              <Button
                variant="success"
                onClick={handleAddProperty}
                className="ms-auto me-3"
                style={{ backgroundColor: "var(--color-bg)" }}
              >
                Add Property
              </Button>
            </div>

            <div className="row">
              {properties
                .slice(
                  (currentPage - 1) * propertiesPerPage,
                  currentPage * propertiesPerPage
                )
                .map((property, index) => (
                  <div className="col-lg-6 col-md-6 mb-4">
      <div className="card shadow h-100">
        {/* Image Section */}
        <div className="position-relative">
          <img
            src={property.foto || "https://via.placeholder.com/400"} // Dummy Image
            alt="Property"
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover", width: "100%" }}
          />
        </div>

        {/* Property Info */}
        <div className="property-info p-3 ">
          <h5 className="mb-1">€{property.precio?.toLocaleString() || "435,000"}</h5>
          <p className="mb-0">Apartment for sale in {property.location || "Cabopino, Marbella"}</p>
        </div>

        {/* Details Section */}
        <div className="p-3">
          <div className="d-flex align-items-center gap-3 text-muted">
            <span><FaRulerCombined /> {property.size || "111"} m² Build</span>
            <span><FaBed /> {property.bedrooms || "2"} Bedrooms</span>
            <span><FaBath /> {property.bathrooms || "2"} Bathrooms</span>
            <span>{property.plotSize || "40"} m² Plot</span>
          </div>

          {/* Description */}
          <p className="mt-2 text-muted">
            {property.description
              ? property.description.length > 100
                ? `${property.description.substring(0, 100)}...`
                : property.description
              : "Exclusive Beachside Property: Perfect for both Investment and Luxury Private Living."}
            <Link to="#"> Read More</Link>
          </p>

          {/* Features */}
          <div className="d-flex flex-wrap gap-2">
            {(property.features || ["Pool", "Private Garden", "Air Conditioning", "Terrace/Balcony", "Heating"]).map((feature, index) => (
              <span key={index} className="badge bg-light text-dark">{feature}</span>
            ))}
          </div>
        </div>

        {/* Buttons Section */}
        <div className="d-flex justify-content-between align-items-center p-3">
                          <Button
                            style={{ backgroundColor: "#33db4a", border: "none" }}
                            onClick={() => setSelectedProperty(property)}
                          >
                            View Details
                          </Button>
                          <Link to="/UserPanel">
                            <Button style={{ backgroundColor: "#33db4a", border: "none" }}>
                              View in Map
                            </Button>
                          </Link>
                        </div>
      </div>
    </div>
                ))}
            </div>

          </>
        )}
        <Pagination className="justify-content-center mt-4 mb-4">
          {paginationItems()}
        </Pagination>
      </div>
       <style>
              {`
                .btn-close {
                  position: absolute;
                  top: 0;
                  right: 0;
                  background-color: white;
                  opacity: 1;
                }
              `}
            </style>
      {selectedProperty && (
   <Modal show={true} onHide={handleClose} size="xl" fullscreen="true">
   <Modal.Header closeButton className="position-sticky bg-white d-flex flex-column shadow-sm" style={{ top: "0", zIndex: "1" }}>
     <Modal.Title className="w-100 px-3">{selectedProperty.titulo || "Penthouse for sale in Marbella, Málaga"}</Modal.Title>
     <div className="d-flex justify-content-between w-100 px-3">
      <div className="left d-flex align-items-center gap-2">
        <span className="fw-bold">€ {selectedProperty.precio || "3,750,000"}</span>
        <span className=" d-flex align-items-center gap-1" > <MdOutlineHomeWork />{selectedProperty.area || ""} m²</span>
        <span className=" d-flex align-items-center gap-1"><IoBedOutline />{selectedProperty.habitaciones || ""}</span>
        <span className=" d-flex align-items-center gap-1"><MdOutlineShower />{selectedProperty.banos || ""}</span>
      </div>
     
      <div className="right d-flex  gap-1">
      <button className="btn btn-success rounded-0 py-1 fs-12 d-flex align-items-center gap-1">
        <FaEnvelope /> Contact
      </button>
      <button className="btn btn-success rounded-0 py-1 fs-12 d-flex align-items-center gap-1">
        <FaStar /> Save
      </button>
      <button className="btn btn-success rounded-0 py-1 fs-12 d-flex align-items-center gap-1">
        <FaTrash />
      </button>
      <button className="btn btn-success rounded-0 py-1 fs-12 d-flex align-items-center gap-1">
        <FaShareAlt />
      </button>
      <button className="btn btn-success rounded-0 py-1 fs-12 d-flex align-items-center gap-1">
        <FaPrint />
      </button>
    </div>
     </div>
   </Modal.Header>
 
   <Modal.Body>
    <div className="row">
     
      <div className="col-12 col-md-8">
       {/* Left Side: Property Details */}
       <div className="flex-fill" style={{ paddingRight: "20px" }}>
         {/* Property Image */}
         <img
           src={selectedProperty.foto || "https://via.placeholder.com/600x400"}
           alt="Featured"
           className="w-100"
           style={{ maxHeight: "70vh", width: "100%", borderRadius: "0px" }}
         />
 
         {/* Property Details */}
         <div className="mt-4">
           <h4>Description</h4>
           <p>
             {selectedProperty.descripcion ||
               "Experience the epitome of luxury living in this bright and spacious frontline duplex penthouse, beautifully redesigned and fully renovated to the highest standards. Nestled in the heart of Puerto Banús, this stunning property boasts panoramic views over the marina, offering a front-row seat to the sparkling sea and glamorous yachts."}
           </p>
 
           {/* Key Features */}
           <div className="mt-4">
             <h4>Key Features</h4>
             <ul>
               <li>
                 <strong>Price:</strong> €{selectedProperty.precio || ""}
               </li>
               <li>
                 <strong>Bathrooms:</strong> {selectedProperty.banos || ""}
               </li>
               <li>
                 <strong>Bedrooms:</strong> {selectedProperty.habitaciones || ""}
               </li>
               <li>
                 <strong>Area:</strong> {selectedProperty.area || ""} m²
               </li>
               <li>
                 <strong>Location:</strong>{" "}
                 {selectedProperty.ubicacion || ""}
               </li>
               <li>
                 <strong>Published Date:</strong>{" "}
                 {selectedProperty.fechaPublicacion
                   ? new Date(selectedProperty.fechaPublicacion).toLocaleDateString()
                   : "Not available"}
               </li>
             </ul>
           </div>
         </div>
       </div>
       </div>
       <div className="col-4 h-100 position-sticky" style={{ top: "80px" }}>
       {/* Right Side: Contact Form */}
       <div className="flex-fill" style={{ maxWidth: "400px" }}>
         <div
           style={{
             backgroundColor: "#f5f5f5",
             borderRadius: "10px",
             padding: "20px",
           }}
         >
           <h4>Contact the Advertiser</h4>
           <form
             onSubmit={(e) => {
               e.preventDefault();
               // Handle form submission here
               console.log("Form submitted");
             }}
           >
             <div className="mb-3">
               <label htmlFor="name">Your Name</label>
               <input
                 type="text"
                 id="name"
                 placeholder="Enter your name"
                 required
                 className="form-control"
               />
             </div>
             <div className="mb-3">
               <label htmlFor="email">Email</label>
               <input
                 type="email"
                 id="email"
                 placeholder="Enter your email"
                 required
                 className="form-control"
               />
             </div>
             <div className="mb-3">
               <label htmlFor="telephone">Telephone</label>
               <input
                 type="tel"
                 id="telephone"
                 placeholder="Your telephone number"
                 className="form-control"
               />
             </div>
             <button
               type="submit"
               className="btn btn-success w-100"
               style={{ backgroundColor: "#33db4a", border: "none" }}
             >
               Send Enquiry
             </button>
           </form>
         </div>
       </div>
     </div>
     </div>
     {/* Related Properties */}
     <h4 className="mt-4">Related Properties</h4>
     <div className="row">
       {properties.slice(0, 4).map((property, idx) => (
               <div className="col-lg-6 col-md-6 mb-4">
               <div className="card shadow h-100">
                 {/* Image Section */}
                 <div className="position-relative">
                   <img
                     src={property.foto || "https://via.placeholder.com/400"} // Dummy Image
                     alt="Property"
                     className="card-img-top"
                     style={{ height: "200px", objectFit: "cover", width: "100%" }}
                   />
                 </div>
         
                 {/* Property Info */}
                 <div className="property-info p-3 ">
                   <h5 className="mb-1">€{property.precio?.toLocaleString() || "435,000"}</h5>
                   <p className="mb-0">Apartment for sale in {property.location || "Cabopino, Marbella"}</p>
                 </div>
         
                 {/* Details Section */}
                 <div className="p-3">
                   <div className="d-flex align-items-center gap-3 text-muted">
                     <span><FaRulerCombined /> {property.size || "111"} m² Build</span>
                     <span><FaBed /> {property.bedrooms || "2"} Bedrooms</span>
                     <span><FaBath /> {property.bathrooms || "2"} Bathrooms</span>
                     <span>{property.plotSize || "40"} m² Plot</span>
                   </div>
         
                   {/* Description */}
                   <p className="mt-2 text-muted">
                     {property.description
                       ? property.description.length > 100
                         ? `${property.description.substring(0, 100)}...`
                         : property.description
                       : "Exclusive Beachside Property: Perfect for both Investment and Luxury Private Living."}
                     <Link to="#"> Read More</Link>
                   </p>
         
                   {/* Features */}
                   <div className="d-flex flex-wrap gap-2">
                     {(property.features || ["Pool", "Private Garden", "Air Conditioning", "Terrace/Balcony", "Heating"]).map((feature, index) => (
                       <span key={index} className="badge bg-light text-dark">{feature}</span>
                     ))}
                   </div>
                 </div>
         
                 {/* Buttons Section */}
                 <div className="d-flex justify-content-between align-items-center p-3">
                                   <Button
                                     style={{ backgroundColor: "#33db4a", border: "none" }}
                                     onClick={() => setSelectedProperty(property)}
                                   >
                                     View Details
                                   </Button>
                                   <Link to="/UserPanel">
                                     <Button style={{ backgroundColor: "#33db4a", border: "none" }}>
                                       View in Map
                                     </Button>
                                   </Link>
                                 </div>
               </div>
             </div>
       ))}
     </div>
   </Modal.Body>
 </Modal>
      )}
    </>
  );
};

export default PropertiesList;
