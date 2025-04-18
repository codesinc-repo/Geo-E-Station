import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';

const AgentAuthentication = () => {
    return (
        <Container fluid>
            <Sidebar />
            <Row>
                <Col className="d-flex justify-content-center align-items-center vh-100">
                    <Card className="shadow p-4 w-100" style={{ maxWidth: '800px' }}>
                        <Card.Body>
                            <h3 className="text-center mb-4">Request Administrator Authorization</h3>
                            <p className="text-center">
                                Submit requests for specific actions like marking properties or creating buyer profiles.
                            </p>
                            <section>
                                <h4>Actions</h4>
                                <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded mb-3 border border-1 border-success">
                                    <span>Mark properties on the map</span>
                                    <Button variant="success">Request Authorization</Button>
                                </div>
                                <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded mb-3 border border-1 border-success">
                                    <span>Create buyer profiles</span>
                                    <Button variant="success">Request Authorization</Button>
                                </div>
                                <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded border border-1 border-success">
                                    <span>Access restricted data</span>
                                    <Button variant="success">Request Authorization</Button>
                                </div>
                            </section>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AgentAuthentication;

