import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import logo from "../../assests/img/logo.png";
import { Link } from "react-router-dom";

const Signin6 = () => {
  const options = [
    {
      icon: "fa-user-check",
      title: "I'll pay for them",
      subtitle: "I am responsible for paying for these services.",
      link: "/UserPanel",
    },
    {
      icon: "fa-user-tie",
      title: "Someone else",
      subtitle: "Another person is responsible for payment.",
      link: "/UserPanel",
    },
  ];

  return (
    <>
      <Container className="text-center my-3">
        <img
          src={logo}
          alt="Logo"
          style={{ width: 120, height: "auto", marginTop: 10 }}
        />
      </Container>

      <Container className="my-4">
        <Link to="/UserPanel" style={{ textDecoration: "none" }}>
          <Card className="shadow-sm p-4 text-center">
            <Card.Body>
              <h5 className="mb-4">
                Who pays for these types of applications at your real estate
                agency?
              </h5>
              <Row className="g-4 justify-content-center">
                {options.map((option, index) => (
                  <Col md={6} key={index}>
                    <Card
                      className="text-center p-3 border border-success h-100"
                      style={{ cursor: "pointer" }}
                      as="a"
                      href={option.link}
                    >
                      <Card.Body>
                        <i
                          className={`fas ${option.icon} fa-3x text-success mb-3`}
                        ></i>
                        <Card.Title className="text-dark">
                          {option.title}
                        </Card.Title>
                        <Card.Text className="text-muted">
                          {option.subtitle}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Link>
      </Container>
    </>
  );
};

export default Signin6;
