import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import simg1 from "../../assests/img/simg1.jpg";
import simg2 from "../../assests/img/simg2.jpg";
import simg3 from "../../assests/img/simg3.jpg";
import "./swiper.css"; // If you have additional custom styles

const SwiperImage = () => {
  return (
    <>

      <style>
        {`
          /* Hide the carousel indicators (the dots) */
          .carousel-indicators {
            display: none;
          }

          /* Make the previous/next arrows invisible by default */
          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }

          /* Show arrows when hovering over the carousel */
          .carousel:hover .carousel-control-prev-icon,
          .carousel:hover .carousel-control-next-icon {
            opacity: 1;
          }
        `}
      </style>

      <section className="py-5">
        <Container fluid>
          <Row className="mt-5">
            <Col xs={12}>

              <Carousel controls indicators={false} interval={3000} variant="dark">

                {/* Slide #1 */}
                <Carousel.Item>
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={simg1}
                      alt="Slide 1"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                    <img
                      src={simg2}
                      alt="Slide 2"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                    <img
                      src={simg3}
                      alt="Slide 3"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                    <img
                      src={simg1}
                      alt="Slide 1"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                    <img
                      src={simg2}
                      alt="Slide 2"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                  </div>
                </Carousel.Item>

                {/* Slide #2 */}
                <Carousel.Item>
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={simg2}
                      alt="Slide 1"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                    <img
                      src={simg3}
                      alt="Slide 2"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                    <img
                      src={simg1}
                      alt="Slide 3"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                    <img
                      src={simg3}
                      alt="Slide 2"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                    <img
                      src={simg2}
                      alt="Slide 2"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                  </div>
                </Carousel.Item>

                {/* Slide #3 */}
                <Carousel.Item>
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={simg3}
                      alt="Slide 1"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                    <img
                      src={simg1}
                      alt="Slide 2"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                    <img
                      src={simg3}
                      alt="Slide 1"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                    <img
                      src={simg2}
                      alt="Slide 2"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                    <img
                      src={simg2}
                      alt="Slide 3"
                      className="mx-5"
                      style={{ width: "300px", objectFit: "cover" }}
                    />
                  </div>

                </Carousel.Item>

              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SwiperImage;
