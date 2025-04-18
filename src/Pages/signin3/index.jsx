import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Signin3 = () => {
  const options = [
    {
      icon: "fa-play",
      text: "I've seen it on YouTube",
      link: "/Signinposition",
    },
    { icon: "fa-search", text: "Searching on Google", link: "/Signinposition" },
    {
      icon: "fa-share-alt",
      text: "I've seen it on Facebook or Instagram",
      link: "/Signinposition",
    },
    {
      icon: "fa-comment-alt",
      text: "It has been recommended to me",
      link: "/Signinposition",
    },
    { icon: "fa-phone", text: "An agent called me", link: "/Signinposition" },
    { icon: "fa-envelope", text: "By mail", link: "/Signinposition" },
    {
      icon: "fa-map-marker-alt",
      text: "Outdoor Advertisement",
      link: "/Signinposition",
    },
    { icon: "fa-tv", text: "Television Ad", link: "/Signinposition" },
    { icon: "fa-newspaper", text: "Newspaper Ad", link: "/Signinposition" },
    {
      icon: "fa-star",
      text: "Heard from a Celebrity",
      link: "/Signinposition",
    },
    { icon: "fa-bullhorn", text: "Radio Ad", link: "/Signinposition" },
    { icon: "fa-users", text: "Community Event", link: "/Signinposition" },
  ];

  return (
    <Container
      className="p-4 border border-success rounded"
      style={{ maxWidth: "1200px", margin: "50px auto" }}
    >
      <h3 className="mb-4 font-weight-bold text-center">
        How did you first discover GeoEState?
      </h3>
      <Row className="g-3">
        {options.map((option, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              className="h-100 text-center p-3 border border-success"
              style={{ cursor: "pointer" }}
              as="a"
              href={option.link}
            >
              <Card.Body>
                <i className={`fas ${option.icon} fa-3x text-success mb-3`}></i>
                <Card.Text style={{ color: "inherit" }}>
                  {option.text}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Signin3;
