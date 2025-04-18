import React from 'react';
import { Button, Card, Col, Container, ListGroup, Modal, Row } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';

const AgentBuyer = () => {
    return (
        <>
            <Sidebar />
            <Container fluid>
                <Row>
                    <Col md={9} className="py-4 mx-auto">
                        <Card className="shadow">
                            <Card.Body>
                                <h3 className="text-center mb-4">Buyer Manager</h3>
                                <p className="text-center">
                                    Manage buyers with limited authority. Perform actions like viewing profiles, assigning tasks, and tracking activities.
                                </p>
                                <section>
                                    <h4>Responsibilities</h4>
                                    <ListGroup className="mb-3">
                                        <ListGroup.Item>View and manage buyer profiles.</ListGroup.Item>
                                        <ListGroup.Item>Assign notifications and tasks to agents.</ListGroup.Item>
                                        <ListGroup.Item>Track property interests and buyer activities.</ListGroup.Item>
                                    </ListGroup>
                                    <Button variant="success" style={{ backgroundColor: "var(--color-bg)" }} className="w-100">Add Responsibility</Button>
                                </section>
                                <section className="mt-4">
                                    <h4>Actions</h4>
                                    <Row className="g-2">
                                        <Col>
                                            <Button variant="success" style={{ backgroundColor: "var(--color-bg)" }} className="w-100" data-bs-toggle="modal" data-bs-target="#buyersModal">
                                                View Buyers
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button variant="success" style={{ backgroundColor: "var(--color-bg)" }} className="w-100" data-bs-toggle="modal" data-bs-target="#tasksModal">
                                                Assign Tasks
                                            </Button>
                                        </Col>
                                    </Row>
                                </section>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Modal id="buyersModal">
                    <Modal.Header closeButton>
                        <Modal.Title>Buyer Profiles</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            <li>Buyer 1: John Doe</li>
                            <li>Buyer 2: Jane Smith</li>
                            <li>Buyer 3: Alex Johnson</li>
                        </ul>
                    </Modal.Body>
                </Modal>
                <Modal id="tasksModal">
                    <Modal.Header closeButton>
                        <Modal.Title>Assign Tasks</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Assign notifications or tasks to agents:</p>
                        <ul>
                            <li>Task 1: Notify buyer about new properties</li>
                            <li>Task 2: Set up meetings with agents</li>
                        </ul>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
};

export default AgentBuyer;

