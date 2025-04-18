import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import logo from "../../assests/img/logo.png";
import { Link } from "react-router-dom";

const Signin4 = () => {
  const options = [
    { icon: "fa-home", text: "Real Estate Agent", link: "/Signinuse" },
    { icon: "fa-user-tie", text: "Manager", link: "/Signinuse" },
    { icon: "fa-building", text: "Coordinator/Broker", link: "/Signinuse" },
    { icon: "fa-ellipsis-h", text: "Other", link: "/Signinuse" },
  ];

  return (
    <>
      <Container className="text-center">
        <img
          src={logo}
          alt="Logo"
          style={{ width: 120, height: "auto", marginTop: 20 }}
        />
      </Container>

      <Container className="my-4">
        <Link to="/Signinuse" style={{ textDecoration: "none" }}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <h3 className="survey-title mb-4 text-center">
                What is your position in the company?
              </h3>
              <Row className="g-4">
                {options.map((option, index) => (
                  <Col md={6} key={index}>
                    <Card
                      className="text-center p-3 border border-success h-100 survey-option"
                      style={{ cursor: "pointer" }}
                      as="a"
                      href={option.link}
                    >
                      <Card.Body>
                        <i
                          className={`fas ${option.icon} fa-3x text-success mb-3`}
                        ></i>
                        <Card.Text className="text-dark">
                          {option.text}
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

export default Signin4;
