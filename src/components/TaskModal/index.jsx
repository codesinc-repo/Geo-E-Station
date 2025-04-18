import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";

const TaskModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>Center - C. Cervantes</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Assign To */}
        <Form.Group className="mb-3">
          <Form.Label>Assign to</Form.Label>
          <Form.Select>
            <option>geoestate.ai@gmail.com</option>
            <option>example@gmail.com</option>
          </Form.Select>
        </Form.Group>

        {/* Date Picker */}
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <div className="d-flex align-items-center border p-2 rounded">
            <Form.Control type="datetime-local" className="border-0 flex-grow-1" />
            <FaCalendarAlt className="text-muted ms-2" />
          </div>
        </Form.Group>

        {/* Task Title */}
        <Form.Group className="mb-3">
          <Form.Label>Task title</Form.Label>
          <Form.Control type="text" placeholder="Write a title" />
        </Form.Group>

        {/* Comments */}
        <Form.Group className="mb-3">
          <Form.Label>Comments</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Write your notes" />
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <Button variant="light" className="text-muted" disabled>✅ Complete</Button>
          <Button variant="light" className="text-muted" disabled>✏ Edit</Button>
          <Button variant="light" className="text-muted" disabled>📜 Historical</Button>
          <Button variant="light" className="text-muted" disabled>🗑 Eliminate</Button>
        </div>
      </Modal.Body>

      {/* Footer with KEEP button */}
      <Modal.Footer>
        <Button style={{ backgroundColor: "#E6A400", borderColor: "#E6A400" }} onClick={handleClose}>
          KEEP
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
