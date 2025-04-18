import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./QuickAssessment.css"; // We'll place custom styles here

const QuickAssessment = ({ property }) => {
  return (
    <Container fluid className="quick-assessment-section my-4">
      <Row>
        {/* Left Column: Title and Button */}
        <Col xs={12} md={8} className="mb-3 mb-md-0">
          <h5 className="mb-0">Quick assessment</h5>
        </Col>
        <Col xs={12} md={4} className="text-md-end">
          <Button className="fw-bold btn-des">Generate Valuation Report</Button>
        </Col>
      </Row>

      <Row className="mt-3">
        {/* Middle Column: Colored Bar + Labels */}
        <Col xs={12} md={8} className="mb-4 mb-md-0">
          {/* Color Bar Wrapper */}
          <div className="position-relative color-bar-container">
            {/* Three color segments */}
            <div className="color-segment segment-green"></div>
            <div className="color-segment segment-orange"></div>
            <div className="color-segment segment-red"></div>

            {/* Pointer for the 5th assessment */}
            <div className="bar-pointer position-absolute text-center">
              <div className="pointer-label">Price of the 5th assessment</div>
              <div className="pointer-line"></div>
            </div>
          </div>

          {/* Labels under the bar */}
          <div className="d-flex justify-content-between mt-2">
            <small>
              <strong>Sale price €{(property.precio * 0.9).toFixed(0)}</strong>
              <br />
              {(property.area * 0.9).toFixed(0)} ft²
            </small>
            <small>
              <strong>Sale unlikely €{(property.precio * 1).toFixed(0)}</strong>
              <br />
              {(property.area * 1).toFixed(0)} ft²
            </small>
            <small>
              <strong>Off market €{(property.precio * 1.1).toFixed(0)}</strong>
              <br />
              {(property.area * 1.1).toFixed(0)} ft²
            </small>
          </div>
        </Col>

        {/* Right Column: Property History */}
        <Col xs={12} md={4}>
          <div className="property-history-box p-3">
            <h6 className="fw-bold mb-3">Property history</h6>
            <p className="mb-1">
              {new Date(property.fechaPublicacion).toLocaleDateString()}
            </p>
            <p className="mb-1">
              High in portal <strong>${property.precio}</strong>
            </p>
            <p className="mb-0">Portal: {property.provincia}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default QuickAssessment;
