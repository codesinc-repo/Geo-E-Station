import React, { useState } from "react";

function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        privacy: false,
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);
    const [error, setError] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === "checkbox" ? checked : value,
        });
    };

    // Form validation
    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            setError("All fields are required.");
            return false;
        }
        if (!formData.privacy) {
            setError("You must accept the privacy policies.");
            return false;
        }
        setError(null);
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setResponseMessage(null);

        try {
            const response = await fetch("https://apis.geoestate.ai/api/ContactUs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage("Your message has been sent successfully!");
                setFormData({ name: "", email: "", phone: "", message: "", privacy: false });
            } else {
                setError(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setError("Failed to send the message. Please check your connection.");
        }

        setLoading(false);
    };

    return (
        <div className="parent-contact">
            <section id="contact" className="Geo-State-Contact-section my-5 container">
                <h1 className="text-center Geo-State-Contact-hero-h1">Contact Us</h1>
                <div className="row p-4">
                    <div className="col-md-6 pe-md-4">
                        <h2 className="fs-4 fw-semibold text-secondary Geo-State-Contact-h2">Contact Us</h2>
                        <p className="text-muted mt-2 w-75">
                            If you're interested in our real estate software, send a message through the form, and one of our sales agents will get in touch with you.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-12">
                                <label htmlFor="name" className="form-label text-secondary Geo-State-Contact-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control Geo-State-Contact-form-control"
                                    id="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="email" className="form-label text-secondary Geo-State-Contact-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control Geo-State-Contact-form-control"
                                    id="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="phone" className="form-label text-secondary Geo-State-Contact-label">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    className="form-control Geo-State-Contact-form-control"
                                    id="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="message" className="form-label text-secondary Geo-State-Contact-label">
                                    Message
                                </label>
                                <textarea
                                    className="form-control Geo-State-Contact-form-control"
                                    id="message"
                                    rows={3}
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12 d-flex">
                                <input
                                    type="checkbox"
                                    className="form-check-input me-2"
                                    id="privacy"
                                    checked={formData.privacy}
                                    onChange={handleChange}
                                />
                                <label htmlFor="privacy" className="form-check-label text-muted">
                                    I have read and accept the site's privacy policies
                                </label>
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                            {responseMessage && <p className="text-success">{responseMessage}</p>}
                            <div className="col-12">
                                <button
                                    type="submit"
                                    className="btn btn-primary border-0 Geo-State-Contact-btn-form-contact w-100 h-100 rounded-5"
                                    disabled={loading}
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ContactUs;
