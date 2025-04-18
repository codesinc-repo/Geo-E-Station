import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaShareAlt, FaWhatsapp, FaInfoCircle, FaCheck } from "react-icons/fa";

const ShareSheetModal = () => {
  const [show, setShow] = useState(false);
  const [shareWhatsApp, setShareWhatsApp] = useState(false);
  const [saveTemplate, setSaveTemplate] = useState(false);
  const [messageText, setMessageText] = useState("Hola [nombre],");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleToggleWhatsApp = () => setShareWhatsApp(!shareWhatsApp);

  // Calculate message length
  const messageLength = messageText ? messageText.length : 0;
  const maxLength = 300;

  return (
    <>
      {/* Button to Open Modal */}
      <Button 
        onClick={handleShow} 
        className="rounded-pill px-4 py-2 d-flex align-items-center gap-2"
        style={{
          backgroundColor: "#22c44a",
          border: "none", 
          marginTop: "5px",
          boxShadow: "0 2px 6px rgba(34, 196, 74, 0.25)",
          transition: "all 0.2s ease"
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#1eb341"}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#22c44a"}
      >
        <FaShareAlt /> Share Sheet
      </Button>

      {/* Modal */}
      <Modal 
        show={show} 
        onHide={handleClose} 
        centered 
        size="md"
        backdrop="static"
        className="share-sheet-modal"
      >
        <Modal.Header 
          closeButton 
          className="border-0 pb-0"
          style={{ padding: "1.25rem 1.5rem 0.5rem" }}
        >
          <Modal.Title 
            className="d-flex flex-column"
            style={{ fontSize: "1.25rem" }}
          >
            <span className="fw-bold">Share Property Sheet</span>
            <span className="text-muted" style={{ fontSize: "0.9rem", fontWeight: "normal" }}>
              Center - C. Cervantes
            </span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          <Form>
            {/* Language Dropdown */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold d-flex align-items-center gap-2">
                Language
              </Form.Label>
              <Form.Select 
                className="form-select"
                style={{
                  padding: "0.625rem 1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #dee2e6",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  fontSize: "1rem"
                }}
              >
                <option>Spanish</option>
                <option>English</option>
                <option>French</option>
                <option>German</option>
              </Form.Select>
            </Form.Group>

            {/* Data to Display - Toggle Switches */}
            <Form.Group 
              className="mb-4"
              style={{
                padding: "1.25rem",
                borderRadius: "0.75rem",
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef"
              }}
            >
              <Form.Label className="fw-semibold d-flex align-items-center gap-2 mb-3">
                Data to be displayed on the tab
                <FaInfoCircle style={{ color: "#6c757d", fontSize: "0.875rem" }} />
              </Form.Label>
              
              {[
                "Agent data",
                "Qualification",
                "Price",
                "Address",
                "Historical",
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="d-flex align-items-center justify-content-between py-2"
                  style={{ 
                    borderBottom: index !== 4 ? "1px solid #e9ecef" : "none"
                  }}
                >
                  <label className="form-check-label" style={{ color: "#495057" }}>{item}</label>
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      defaultChecked 
                      style={{ 
                        width: "2.5rem", 
                        height: "1.25rem",
                        cursor: "pointer"
                      }} 
                    />
                  </div>
                </div>
              ))}
            </Form.Group>

            {/* WhatsApp Toggle */}
            <Form.Group 
              className="mb-4"
              style={{
                padding: "1.25rem",
                borderRadius: "0.75rem",
                border: "1px solid #e9ecef",
                backgroundColor: shareWhatsApp ? "#f0fdf0" : "#f8f9fa",
                transition: "background-color 0.3s ease"
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <FaWhatsapp style={{ color: "#25D366", fontSize: "1.25rem" }} />
                  <Form.Label className="fw-semibold mb-0" style={{ color: "#495057" }}>
                    Share on WhatsApp
                  </Form.Label>
                </div>
                <Form.Check
                  type="switch"
                  id="whatsapp-toggle"
                  checked={shareWhatsApp}
                  onChange={handleToggleWhatsApp}
                  style={{ 
                    width: "2.5rem", 
                    height: "1.25rem" 
                  }}
                />
              </div>

              {/* Conditional Fields for WhatsApp */}
              {shareWhatsApp && (
                <div 
                  className="mt-3 pt-3"
                  style={{ borderTop: "1px solid #e9ecef" }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Phone</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="+34" 
                      style={{
                        padding: "0.625rem 1rem",
                        borderRadius: "0.5rem",
                        border: "1px solid #dee2e6",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <Form.Label className="fw-semibold mb-0">Message text</Form.Label>
                      <small className={messageLength > maxLength ? "text-danger" : "text-muted"}>
                        {messageLength} / {maxLength}
                      </small>
                    </div>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      maxLength={maxLength}
                      style={{
                        padding: "0.625rem 1rem",
                        borderRadius: "0.5rem",
                        border: "1px solid #dee2e6",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                        resize: "none"
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="d-flex align-items-center">
                    <Form.Check
                      type="checkbox"
                      id="save-template"
                      checked={saveTemplate}
                      onChange={() => setSaveTemplate(!saveTemplate)}
                      label="Save as template"
                      style={{ cursor: "pointer" }}
                    />
                  </Form.Group>
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer 
          className="border-0 px-4 pb-4 pt-0"
        >
          <Button 
            variant="success" 
            className="w-100 py-2 d-flex align-items-center justify-content-center gap-2"
            onClick={handleClose}
            style={{
              backgroundColor: "#22c44a",
              border: "none",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 6px rgba(34, 196, 74, 0.25)",
              fontSize: "1rem",
              fontWeight: "500",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#1eb341"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#22c44a"}
          >
            <FaCheck /> Create Share Sheet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShareSheetModal;