import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './PropertyOverview.css'; // Import the custom CSS file
import overviewImg from '../../assests/img/casas-prefabricadas-mallorca-lujo.jpg'; // Replace with your actual image

const PropertyOverview = ({property}) => {
  return (
    <Container fluid className="property-overview-section my-4">
      <Row className="align-items-center">
        {/* Left Column: Text Content */}
        <Col xs={12} md={6}>
          <h2 className="overview-title">Property Overview</h2>
          <p className="overview-description">
           {property.descripcion}
          </p>
          {/* <Button  className="btn-des">
            Learn More
          </Button> */}
        </Col>
        {/* Right Column: Image */}
        <Col xs={12} md={6} className="text-center">
          <img
            src={property.foto}
            alt="Property Overview"
            className="img-fluid overview-image"
          />
        </Col>
      </Row>
    </Container>
  );
};
export default PropertyOverview;
