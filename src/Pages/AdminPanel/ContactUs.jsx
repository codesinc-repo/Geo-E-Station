import React, { useEffect, useState } from "react";
import { Table, Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";

const ContactUs = () => {
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    useEffect(() => {
        fetch("https://apis.geoestate.ai/api/ContactUs")
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error("Error fetching contact messages:", error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://apis.geoestate.ai/api/ContactUs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                alert("Message sent successfully!");
                setMessages([...messages, data]);
                setFormData({ name: "", email: "", message: "" });
            })
            .catch(error => console.error("Error sending message:", error));
    };

    return (
        <>
            <Sidebar />
            <Container fluid className="mt-4">
                <Row className="justify-content-center">
                    <Col lg={10}>
                        

                        {/* Contact Messages Card */}
                        <Card className="shadow">
                            <Card.Header className="bg-success text-white">
                                <h4>Contact Messages</h4>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover responsive>
                                    <thead className="bg-success text-white">
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {messages.length > 0 ? (
                                            messages.map((msg) => (
                                                <tr key={msg.id}>
                                                    <td>{msg.id}</td>
                                                    <td>{msg.name}</td>
                                                    <td>{msg.email}</td>
                                                    <td>{msg.message}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">
                                                    No messages yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ContactUs;
