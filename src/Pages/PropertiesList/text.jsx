import { Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5"; // Import Close Icon
import { Link } from "react-router-dom";

const PropertyList = ({ properties, currentPage, propertiesPerPage, handleDeleteProperty, setSelectedProperty, displayLocation }) => {
  return (
    <div className="row">
      {properties
        .slice(
          (currentPage - 1) * propertiesPerPage,
          currentPage * propertiesPerPage
        )
        .map((property, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow position-relative">
              
              {/* Close Button Positioned at Top Right */}
              <Button
                variant="none"
                onClick={() => handleDeleteProperty(property.idPropiedad)}
                className="position-absolute top-0 end-0 m-2 p-0"
                style={{
                  color: "red",
                  border: "none",
                  backgroundColor: "transparent",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IoClose size={24} />
              </Button>

              {/* Image with Full Coverage */}
              <img
                src={property.foto}
                alt="Property"
                className="card-img-top"
                style={{
                  height: "200px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />

              <div className="card-body">
                <h5 className="card-title text-truncate">{property.titulo}</h5>
                <p className="card-text">
                  <strong>Price:</strong> ${property.precio.toLocaleString()} <br />
                  <strong>Location:</strong> {displayLocation(property)}
                </p>
                <div className="d-flex justify-content-between align-items-center">
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
          </div>
        ))}
    </div>
  );
};

export default PropertyList;
