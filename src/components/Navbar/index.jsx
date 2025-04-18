import React from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImgLogo from "../../assests/img/logo.png"; // Your logo image
import "./Navbar.css";
import SpanishFlag from "../../assests/img/French.svg";
import EnglishFlag from "../../assests/img/English.svg";
import FrenchFlag from "../../assests/img/French.svg";


const CustomNavbar = () => {
  return (
   
    <Navbar expand="lg" bg="white" className="shadow-sm  py-3">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">
          <img src={ImgLogo} alt="Logo" style={{ height: "75px" }} />
        </Navbar.Brand>

        {/* Mobile Toggler */}
        <Navbar.Toggle aria-controls="navbarNav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="navbarNav">
          <Nav className="mx-auto fs-5">
            {["Home", "Price", "Company", "Blog", "Contact"].map((item) => (
              <Nav.Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link-underline"
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>

          {/* Right-Aligned Section */}
          <div className="d-flex flex-column flex-md-row align-items-md-center row-gap-2 mt-2 mt-md-0">
            {/* Google Translate Widget - Custom Styled */}
            <style>
    {`
      .VIpgJd-ZVi9od-xl07Ob-lTBxed,.goog-te-gadget-simple {
        display: flex !important;
      }
     
    `}
  </style>
            <div className="translate-wrapper d-flex me-2">
              <div 
                id="google_translate_element"
                style={{
                  display: "inline-block",
                }}
              ></div>
            </div>

            {/* Login/Sign Up Buttons */}
            <Link to="/Sign">
              <Button variant="outline-dark" className="rounded-pill ms-3">
                Login
              </Button>
            </Link>
            <Link to="/Signup">
              <Button variant="outline-success" className="rounded-pill ms-2">
                Sign Up
              </Button>
            </Link>

            <NavDropdown
              id="language-dropdown"
              // The 'title' is what you see before clicking (the flag + caret)
              title={
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {/* Flag image for the current language */}
                  <img
                    src={SpanishFlag}
                    alt="Spanish Flag"
                    style={{ width: "20px" }}
                  />
                  {/* The dropdown caret is appended automatically by NavDropdown */}
                </span>
              }
              className="ms-3"
            >
              {/* Dropdown Items */}
              <NavDropdown.Item>
                <img
                  src={EnglishFlag}
                  alt="English Flag"
                  style={{ width: "20px", marginRight: "8px" }}
                />

              </NavDropdown.Item>

              <NavDropdown.Item>
                <img
                  src={SpanishFlag}
                  alt="Spanish Flag"
                  style={{ width: "20px", marginRight: "8px" , marginTop: "5px"}}
                />

              </NavDropdown.Item>


            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
