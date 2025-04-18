import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import "./agenthistory.css";

const AgentHistory = () => {
    return (
        <>
            <Sidebar />
            <Container className="history-ratings-container mt-5">
                <h3 className="text-center mb-5 fw-bold display-5">History and Ratings</h3>

                {/* History Section */}
                <section>
                    <h4 className='fw-semibold'>History</h4>
                    <div className="history-list" id="historyList">
                        <Row className="history-item">
                            <Col xs={10}>
                                <span>Viewed Expose: "Modern Apartment in Madrid" (10/25/2024)</span>
                            </Col>
                            <Col xs={2}>
                                <Button variant="success" style={{ backgroundColor: "var(--color-bg)" }} size="sm">Remove</Button>
                            </Col>
                        </Row>
                        <Row className="history-item mt-3">
                            <Col xs={10}>
                                <span>Viewed Expose: "Cozy Villa in Barcelona" (10/22/2024)</span>
                            </Col>
                            <Col xs={2}>
                                <Button variant="success" style={{ backgroundColor: "var(--color-bg)" }} size="sm">Remove</Button>
                            </Col>
                        </Row>
                    </div>
                </section>

                {/* Ratings Section */}
                <section className="mt-4">
                    <h4 className='fw-semibold'>Ratings</h4>
                    <div className="ratings-list" id="ratingsList">
                        <Row className="rating-item">
                            <Col xs={10}>
                                <span>"Modern Apartment in Madrid" - ⭐⭐⭐⭐⭐</span>
                            </Col>
                            <Col xs={2}>
                                <Button variant="success" style={{ backgroundColor: "var(--color-bg)" }} size="sm">Remove</Button>
                            </Col>
                        </Row>
                    </div>
                </section>

                {/* Download Button */}
                <section className="mt-4 text-center">
                    <Button variant="success" className="w-50" style={{ backgroundColor: "var(--color-bg)" }} id="downloadBtn">
                        Download History and Ratings
                    </Button>
                </section>
            </Container>
        </>
    );
}

export default AgentHistory;
