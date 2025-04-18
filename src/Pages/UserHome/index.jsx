import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import "./UserHome.css";

const Appreciate = () => {
  const [searchOption, setSearchOption] = useState("Address");
  const [inputValue, setInputValue] = useState("");

  const handleOptionChange = (e) => {
    setSearchOption(e.target.value);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAppreciate = () => {
    console.log(`Searching by ${searchOption}: ${inputValue}`);
  };

  const handleClean = () => {
    setInputValue("");
  };

  return (
    <div className="d-flex UserHome">
      <Sidebar style={{ position: "static" }} />
      <Container className="mt-5 ms-auto">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <h2>Appreciate</h2>
            <p>Search for the property using any of the following options:</p>
            <Form>
              <div className="mb-3">
                <Form.Check
                  type="radio"
                  label="Address"
                  name="searchOption"
                  value="Address"
                  checked={searchOption === "Address"}
                  onChange={handleOptionChange}
                  id="radio-address"
                />
                <Form.Check
                  type="radio"
                  label="Cadastral reference"
                  name="searchOption"
                  value="Cadastral reference"
                  checked={searchOption === "Cadastral reference"}
                  onChange={handleOptionChange}
                  id="radio-cadastral"
                />
              </div>
              <Form.Group className="mb-3">
                <Form.Label>
                  {searchOption === "Address"
                    ? "Street and property number"
                    : "Cadastral reference"}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={
                    searchOption === "Address"
                      ? "Enter the street and number"
                      : "Enter the cadastral reference"
                  }
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button
                variant="secondary"
                className="mr-2"
                onClick={handleClean}
              >
                Clean
              </Button>
              <Button
                variant="success"
                style={{ backgroundColor: "var(--color-bg)" }}
                onClick={handleAppreciate}
              >
                Appreciate
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Appreciate;
