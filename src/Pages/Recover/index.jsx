import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import logo from "../../assests/img/logo.png";

const Recover = () => {
  return (
    <Container className="my-5">
      {/* Language Selector */}
      <Row className="justify-content-end mb-3">
        <Col xs="auto">
          <Form.Select
            style={{ width: "150px" }}
            defaultValue="Spanish"
            className="form-select"
          >
            <option value="Spanish">Spanish</option>
            <option value="English">English</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Logo */}
      <Row className="justify-content-center">
        <Col xs="auto">
          <img
            src={logo}
            alt="GeoEstate Logo"
            className="img-fluid"
            style={{ maxWidth: "150px", height: "auto" }}
          />
        </Col>
      </Row>

      {/* Form Container */}
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={6}>
          <div className="text-center">
            <h2 className="mb-3">Recover Password</h2>
            <p className="text-muted">
              Enter your email below and we will send you instructions on how to
              reset your password.
            </p>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Enter your e-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                required
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="w-100 mb-3 text-white"
            >
              Recover Password
            </Button>
          </Form>
          <div className="text-center">
            <Link to="/Sign" className="text-decoration-none text-secondary">
              Return
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Recover;
