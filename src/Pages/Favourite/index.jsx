import React from "react";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import image from "../../assests/img/3.jpg";

const FavoritesPage = () => {
  return (
    <>
      <Sidebar />
      <Container
        fluid
        style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Row className="mb-3 Favourite">
          <Col md={{ span: 10, offset: 1 }}>
            <h1 style={{ fontWeight: "bold", marginBottom: "10px" }}>
              Favourites
            </h1>
            <p style={{ color: "#6c757d", marginBottom: "20px" }}>
              Your favourite items will appear here.
            </p>
            <Button
              style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
              className="mb-3"
            >
              + Create Folder
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FavoritesPage;
