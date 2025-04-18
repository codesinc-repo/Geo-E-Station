import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";

// Replace these with your actual images
import testimonial1 from "../../assests/img/testimonial1.png";
import testimonial2 from "../../assests/img/testimonial2.png";
import testimonial3 from "../../assests/img/testimonial3.png";
import testimonial4 from "../../assests/img/testimonial1.png";
import testimonial5 from "../../assests/img/testimonial1.png";

const Testimonial = () => {
    // Style for the testimonial card
    const cardStyle = {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        margin: "10px",
        // textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
    };

    // Circular profile image
    const imageStyle = {
        borderRadius: "50%",
        width: "105px",
        height: "30px",
        objectFit: "cover",
        margin: "0 auto",
    };

    // Testimonials data array
    const testimonials = [
        {
            img: testimonial1,
            name: "They Heal Alone",
            role: "Real Estate Agent",
            message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        },
        {
            img: testimonial2,
            name: "Samantha Bloom",
            role: "Marketing Director",
            message:
                "Their attention to detail and responsive customer support stood out the most. Highly recommended!",
        },
        {
            img: testimonial3,
            name: "Michael Brown",
            role: "CEO, Brown Logistics",
            message:
                "I was thoroughly impressed by their professional approach and the timely delivery of services.",
        },
        {
            img: testimonial4,
            name: "David Smith",
            role: "Operations Manager",
            message:
                "Their innovative solutions have dramatically increased our operational efficiency.",
        },
        {
            img: testimonial5,
            name: "Linda Johnson",
            role: "Product Manager",
            message:
                "Fantastic results! They went above and beyond to ensure everything was perfect.",
        },
    ];

    return (
        <section className="testimonials" style={{ backgroundColor: "#f8f9fa" }}>
            <Container>
                <h2 className="text-center pt-5 fw-bold">Testimonials</h2>
                <Carousel indicators={false} controls={true} interval={5000} className="pb-5">
                    {[0, 3].map((startIndex) => (
                        <Carousel.Item key={startIndex}>
                            <Row className="d-flex justify-content-center align-items-stretch">
                                {testimonials.slice(startIndex, startIndex + 3).map((testimonial, idx) => (
                                    <Col
                                        key={idx}
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        className="mb-4 d-flex align-items-stretch"
                                    >
                                        <div style={cardStyle}>
                                            {/* Top Section: Image, Name, Stars, Role */}
                                            <div className="d-flex flex-row  ">



                                                <div>
                                                    <img
                                                        src={testimonial.img}
                                                        alt={`Client ${idx + startIndex + 1}`}
                                                        style={imageStyle}

                                                    />
                                                </div>
                                                <div className="d-flex flex-column ms-4">
                                                    <h5 className="mt-3 mb-1 fw-bold">{testimonial.name}</h5>
                                                    {/* Star Rating (static 5 stars) */}
                                                    <div className="">
                                                        {[...Array(5)].map((_, starIdx) => (
                                                            <span
                                                                key={starIdx}
                                                                style={{ color: "#FFA500", fontSize: "1.1rem" }}
                                                            >
                                                                &#9733;
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="testimonial-role text-muted ">
                                                        {testimonial.role}
                                                    </div>
                                                </div>

                                            </div>

                                            {/* Bottom Section: Testimonial Text */}
                                            <p style={{ color: "#333" }}>{testimonial.message}</p>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    );
};

export default Testimonial;
