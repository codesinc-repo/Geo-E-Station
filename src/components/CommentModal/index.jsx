import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";

const CommentModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="form-label">Comment text</label>
        <textarea
          className="form-control"
          placeholder="Write your comment"
          rows="3"
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success"  onClick={handleClose}>
        <FaPaperPlane /> Send
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;
