import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  Tab,
  Image,
} from "react-bootstrap";

const CompanyData = () => {
  return (
    <Container
      className="border border-success rounded bg-white p-4"
      style={{ height: "100vh" }}
    >
      <h3 className="text-dark fw-bold mb-4">Company Data</h3>
      <Tab.Container defaultActiveKey="company-data">
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="company-data">COMPANY DATA</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="extra-info-report">EXTRA INFO REPORT</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="company-data">
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formCompanyName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter company name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formPhoneNumber">
                    <Form.Label>Contact phone number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Contact email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formWebPage">
                    <Form.Label>Web page</Form.Label>
                    <Form.Control type="text" placeholder="Enter webpage URL" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <div className="text-center border border-dashed rounded p-3">
                    <p className="text-muted small">
                      Contact us to change the logo
                    </p>
                  </div>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formColor">
                    <Form.Label>Corporate color</Form.Label>
                    <Form.Control type="color" />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="success" type="submit">
                KEEP
              </Button>
            </Form>
          </Tab.Pane>
          <Tab.Pane eventKey="extra-info-report">
            <p>Extra information report content goes here...</p>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default CompanyData;
