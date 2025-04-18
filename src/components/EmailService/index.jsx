import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import { jsPDF } from 'jspdf';

const EmailModal = ({ property, show, handleClose }) => {
    const [recipientName, setRecipientName] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');

    if (!property) {
        // Optionally, you can handle the null case explicitly, e.g., render nothing or a placeholder
        return null; // or return some placeholder component
    }

    const sendEmailWithPDF = () => {
        const pdf = new jsPDF();
        const lineHeight = 10;
        let line = 120; // Adjust based on your image's height

        pdf.text(20, line, `Property Title: ${property.titulo || 'N/A'}`);
        line += lineHeight;
        pdf.text(20, line, `Description: ${property.descripcion || 'N/A'}`);
        line += lineHeight;
        pdf.text(20, line, `Latitude: ${property.latitud || 'N/A'}`);
        line += lineHeight;
        pdf.text(20, line, `Longitude: ${property.longitud || 'N/A'}`);
        pdf.addPage(); // Optional, in case your content doesn't fit on one page

        const emailParams = {
            to_name: recipientName,
            to_email: recipientEmail,
            message_html: `Please find the details of the property: ${property.titulo}`,
            // Below, add the property details directly as parameters
            titulo: property.titulo,
            descripcion: property.descripcion,
            latitud: property.latitud,
            longitud: property.longitud,
            foto: property.foto
        };
        

        emailjs.send('service_xkozmig', 'template_sxasl2x', emailParams, 'iqyYH3JDSTwMARoRq')
            .then((response) => {
                alert('Email sent successfully!');
                handleClose(); // Close the modal after sending the email
            }, (error) => {
                alert('Failed to send email. Check console for details.');
                console.error('Failed to send email:', error);
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Send Property Details via Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img
                    src={property.foto || "https://via.placeholder.com/200"}
                    alt="Property"
                    style={{ width: "100%", height: "auto", marginBottom: "10px" }}
                />
                <Form>
                    <Form.Group className="mb-3" controlId="recipientName">
                        <Form.Label>Recipient's Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter recipient's name"
                            value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="recipientEmail">
                        <Form.Label>Recipient's Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter recipient's email"
                            value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={sendEmailWithPDF}>
                    Send Email
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EmailModal;
