import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";

const ClientPage = () => {
    return (
        <>
            {/* Header Section */}
            <Sidebar />
            <header className="text-white text-center py-4 bg-success">
                <Container>
                    <h1>Works Under the Supervision of an Office Administrator</h1>
                </Container>
            </header>

            {/* Main Content */}
            <main className="my-5">
                <Container>
                    {/* Intro Section */}
                    <section className="text-center mb-5">
                        <p className="lead">
                            Explore the roles, skills, and services provided by professionals working under the guidance of an office administrator. These individuals ensure smooth and efficient office operations.
                        </p>
                    </section>

                    {/* Services Section */}
                    <section className="my-5">
                        <h2>Services Provided</h2>
                        <Row className="g-4">
                            <Col md={4}>
                                <Card className="shadow-sm">
                                    <Card.Body>
                                        <div className="icon mb-3">
                                            <i className="fa-solid fa-gear fa-2x"></i>
                                        </div>
                                        <Card.Title>Administrative Support</Card.Title>
                                        <Card.Text>
                                            Assisting senior staff with day-to-day administrative responsibilities.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="shadow-sm">
                                    <Card.Body>
                                        <div className="icon mb-3">
                                            <i className="fa-solid fa-user-group fa-2x"></i>
                                        </div>
                                        <Card.Title>Customer Interaction</Card.Title>
                                        <Card.Text>
                                            Handling inquiries via phone, email, and face-to-face communication.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="shadow-sm">
                                    <Card.Body>
                                        <div className="icon mb-3">
                                            <i className="fa-solid fa-calendar-day fa-2x"></i>
                                        </div>
                                        <Card.Title>Scheduling Assistance</Card.Title>
                                        <Card.Text>
                                            Coordinating appointments, meetings, and travel plans.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </section>
                </Container>
            </main>
        </>
    );
};

export default ClientPage;
