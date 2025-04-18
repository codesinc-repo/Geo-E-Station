import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const PropertyPDFContent = ({ property, recordData }) => {
  // Create an array of all available property images
  console.log(recordData,'recordData');
  const propertyImages = [
    property?.foto,
    property?.foto2,
    property?.foto3,
    property?.foto4,
    property?.foto5,
    property?.foto6
  ].filter(img => img); // Remove any null/undefined values
  const headerBackground = recordData && recordData.companyLogo !== null && recordData.companyLogo !== undefined
  ? `url(${recordData.companyLogo})`
  : "url('http://localhost:3000/static/media/logo-removebg-preview.e50dffebcc48fa6e7a1f.png')";
  return (
    <Container id="pdf-content" style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {/* Print Styles (unchanged) */}
      <style type="text/css" media="print">
        {`
          @page { 
            size: A4; 
            margin: 160px 1cm 1cm;  Q
           
            @top-left {
              content: "";
              background-image: ${headerBackground};
              width: 150px;
              height: 70px;
              background-repeat: no-repeat;
              background-size: contain;
              overflow:visible;
              margin-bottom:60px;
            }
             
            @top-center{
              content: "${property?.titulo}";
              font-size: 24px;
              font-weight: bold;
              margin-top: 60px;
            }
          }
          .display-6{
            display: none;
          }
          .card-img-top{
            margin:0px auto 30px;
          }
          .content{
            line-height: 1.5;
          }
          .additionl-information strong{
            margin-top: 10px;
            font-weight: normal;
          }
          .features{
            display: flex;
            flex-wrap: wrap;
          }
          .image-gallery {
            page-break-inside: avoid;
          }
          .gallery-image {
            page-break-inside: avoid;
            page-break-after: auto;
          }
        `}
      </style>

      {/* Property Header Section (unchanged) */}
      <Row>
        <Col>
          {property?.foto ? (
            <div style={{ marginBottom: "20px", marginTop: '0px' }}>
              <img
                src={property.foto}
                alt="Property"
                style={{ width: "100%", height: "auto", borderRadius: "5px" }}
              />
            </div>
          ) : (
            <p style={{ fontSize: "14px", color: "gray" }}>No image available</p>
          )}

          <p style={{ fontSize: "14px", marginBottom: "10px" }}>
            {property?.area ? `Total surface: ${property.area} m²` : "N/A"} /{" "}
            {property?.habitaciones ? `Bedrooms: ${property.habitaciones}` : "N/A"} /{" "}
            {property?.banos ? `Bathrooms: ${property.banos}` : "N/A"}
          </p>

          <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "20px" }}>
            Price: {property?.precio ? `${property.precio} €` : "N/A"}
          </p>
        </Col>
      </Row>

      {/* Original Property Content (unchanged) */}
      <Row>
        <Col>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>DESCRIPTION:</h2>
          <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
            {property?.descripcion || "No description available"}
          </p>
        </Col>
      </Row>

      {property && (
        <Row>
          <Col>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>FEATURES:</h2>
            <ul style={{ fontSize: "14px", lineHeight: "1.5" }}>
              <li>Private swimming pool</li>
              <li>Spacious garden area</li>
              <li>Modern design with high-quality finishes</li>
            </ul>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>LOCATION:</h2>
          <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
            {property?.municipio ? `${property.municipio}, ` : ""}
            {property?.provincia ? property.provincia : ""}
          </p>
        </Col>
      </Row>

      {/* Record Data Section */}
      {recordData && (
        <Row style={{ marginBottom: "20px", borderTop: "1px solid #eee", paddingTop: "15px" }}>
          <Col>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px", color: "#4caf50" }}>
              PROPERTY RECORD
            </h2>
            
            {/* Record Details in Two Columns */}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ flex: "1", minWidth: "250px", paddingRight: "15px" }}>
                <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                  <strong>Qualification:</strong> {recordData.qualification || "N/A"}
                </p>
                <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                  <strong>Client:</strong> {recordData.clientFirstName + " " + recordData.clientLastName || "N/A"}
                </p>
                <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                  <strong>Language:</strong> {recordData.language || "N/A"}
                </p>
              </div>
              <div style={{ flex: "1", minWidth: "250px" }}>
                <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                  <strong>Agent:</strong> {recordData.agentName  || "N/A"}
                </p>
                <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                  <strong>Mobile:</strong> {recordData.agentMobile || "N/A"}
                </p>
                <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                  <strong>Agency:</strong> {recordData.agencyName || "N/A"}
                </p>
              </div>
            </div>

            {/* Comments */}
            {recordData.comments && (
              <div style={{ 
                marginTop: "15px",
                backgroundColor: "#f9f9f9",
                padding: "15px",
                borderRadius: "5px"
              }}>
                <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>
                  Additional Comments:
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
                  {recordData.comments}
                </p>
              </div>
            )}

            {/* Generation Date */}
            <p style={{ 
              fontSize: "12px", 
              color: "#666", 
              textAlign: "right", 
              marginTop: "15px"
            }}>
              Generated on: {recordData.date || new Date().toLocaleDateString()}
            </p>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>CONTACT:</h2>
          {property?.telefono ? (
            <p style={{ fontSize: "14px" }}>
              <strong>Phone:</strong> {property.telefono}
            </p>
          ) : (
            <p style={{ fontSize: "14px", color: "gray" }}>No contact number available</p>
          )}
        </Col>
      </Row>

      {/* Image Gallery Section */}
      {propertyImages.length > 0 && (
        <Row className="image-gallery" style={{ marginTop: "30px" }}>
          <Col>
            <h2 style={{ 
              fontSize: "18px", 
              fontWeight: "bold", 
              marginBottom: "15px",
              borderTop: "1px solid #eee",
              paddingTop: "15px"
            }}>
              PROPERTY GALLERY
            </h2>
            <div style={{
              marginBottom: "20px"
            }}>
              {propertyImages.map((image, index) => (
                <div key={index} className="gallery-image" style={{
                  borderRadius: "5px",
                  overflow: "hidden"
                }}>
                  <img
                    src={image}
                    alt={`Property view ${index + 1}`}
                    style={{
                      width: "100%",
                      maxHeight: "300px",
                      objectFit: "contain",
                      display: "block"
                    }}
                  />
                 
                </div>
              ))}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PropertyPDFContent;