import React, { useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImgLogo from "../../assests/img/logo.png"; // Your logo image

const CustomNavbar = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      } else if (window.google && window.google.translate) {
        window.googleTranslateElementInit();
      }
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr,de,es,it", // Add more languages if needed
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm fixed-top py-3">
      <Container>

        <Navbar.Brand href="/">
          <img src={ImgLogo} alt="Logo" style={{ height: "75px" }} />
        </Navbar.Brand>


        <Navbar.Toggle aria-controls="navbarNav" />


        <Navbar.Collapse id="navbarNav">
          <Nav className="mx-auto fs-5 ">
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


          <div className="d-flex align-items-center">

            <div
              id="google_translate_element"
              style={{
                display: "inline-block",
              }}
            ></div>


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
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
