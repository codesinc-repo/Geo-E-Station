import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import logo from "../../assests/img/logo.png";
import { Link } from "react-router-dom";

const Signin5 = () => {
  const options = [
    {
      icon: "fa-medal",
      title: "Never",
      subtitle: "It's my first time",
      link: "/Signin6",
    },
    {
      icon: "fa-star",
      title: "A bit",
      subtitle: "I have some experience",
      link: "/Signin6",
    },
    {
      icon: "fa-trophy",
      title: "Many times",
      subtitle: "I know the program very well",
      link: "/Signin6",
    },
  ];

  return (
    <>
      <Container className="text-center my-3">
        <img
          src={logo}
          alt="Logo"
          style={{ width: 130, height: "auto", marginTop: 10 }}
        />
      </Container>

      <Container className="my-4">
        <Card className="shadow-sm p-4 text-center">
          <Card.Body>
            <h5 className="mb-4">Have you used GeoEstate?</h5>
            <Link to="/Signin6" style={{ textDecoration: "none" }}>
              <Row className="g-4 justify-content-center">
                {options.map((option, index) => (
                  <Col md={4} key={index}>
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
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Signin5;
