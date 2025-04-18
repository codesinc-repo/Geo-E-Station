import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CompanyDetailsModal = ({ show, handleClose, onSave, id }) => {
    const [companyDetails, setCompanyDetails] = useState({
        logo: null,
        name: "",
        address: "",
        phone: "",
        email: "",
    });

    const handlePDFfile = async (uId) => {
        try {
            const res = await axios.get("https://apis.geoestate.ai/api/Exposes/GetPdfFile", { params: { userId: uId, productId: id } })
            console.log(res.data)
        } catch (err) {
            console.error('Failed to fetch pdf file', err);
        }
    }

    const convertBase64 = (e) => {
        const file = companyDetails.logo;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCompanyDetails(p => ({ ...p, logo: reader.result }))
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmission = async () => {
        const storedId = localStorage.getItem('user_id');
        try {
            const formData = new FormData();
            formData.append("userId", storedId);
            formData.append("productId", id);
            formData.append("companyName", companyDetails.name);
            formData.append("companyAddress", companyDetails.address);
            formData.append("phoneNumber", companyDetails.phone);
            formData.append("email", companyDetails.email);
            convertBase64();
            const dataToSend = {
                userId: storedId,
                productId: id,
                companyName: companyDetails.name,
                companyAddress: companyDetails.address,
                phoneNumber: companyDetails.phone,
                email: companyDetails.email,
                // companyLogo: companyDetails.logo
                pdfPath: ""
            }

            if (companyDetails.logo) {
                formData.append("companyLogo", companyDetails.logo);
            } else {
                formData.append("companyLogo", "");
            }
            formData.append("pdfPath", "");

            const response = await axios.post("https://apis.geoestate.ai/api/Exposes", dataToSend);
            console.log("Form submitted successfully:", response.data);
            handlePDFfile(storedId)
            onSave(companyDetails);
            handleClose();
        } catch (err) {
            console.error("Failed to submit Form:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompanyDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogoChange = (e) => {
        setCompanyDetails((prev) => ({
            ...prev,
            logo: e.target.files[0],
        }));
    };

    // If you want to use a simple JSON payload instead of FormData,
    // comment out the FormData section above and use:
    /*
    const payload = {
      userId: 0,
      productId: 0,
      companyName: companyDetails.name,
      companyAddress: companyDetails.address,
      phoneNumber: companyDetails.phone,
      email: companyDetails.email,
      companyLogo: companyDetails.logo ? "logo_as_string_or_url" : "",
      pdfPath: ""
    };
    await axios.post("https://apis.geoestate.ai/api/Exposes", payload);
    */

    const handleSubmit = () => {
        handleFormSubmission();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enter Company Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="companyName">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={companyDetails.name}
                            onChange={handleInputChange}
                            placeholder="Enter company name"
                        />
                    </Form.Group>
                    <Form.Group controlId="companyAddress">
                        <Form.Label>Company Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={companyDetails.address}
                            onChange={handleInputChange}
                            placeholder="Enter company address"
                        />
                    </Form.Group>
                    <Form.Group controlId="companyPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={companyDetails.phone}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
                        />
                    </Form.Group>
                    <Form.Group controlId="companyEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={companyDetails.email}
                            onChange={handleInputChange}
                            placeholder="Enter email"
                        />
                    </Form.Group>
                    <Form.Group controlId="companyLogo">
                        <Form.Label>Company Logo</Form.Label>
                        <Form.Control type="file" onChange={handleLogoChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CompanyDetailsModal;

