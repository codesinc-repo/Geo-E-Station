import React, { useEffect, useState } from "react";
import { Table, Button, Container, Form, Modal, Tabs, Tab, Card } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [activeTab, setActiveTab] = useState("view");
  const [formData, setFormData] = useState({ name: "" });
  const [editingRole, setEditingRole] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch Roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    fetch("https://apis.geoestate.ai/api/Roles/GetRoles")
      .then((response) => response.json())
      .then((data) => setRoles(data))
      .catch((err) => {
        console.error("Error fetching roles:", err);
        toast.error("Error fetching roles");
      });
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Create Role
  const handleCreateRole = (e) => {
    e.preventDefault();
    fetch("https://apis.geoestate.ai/api/Roles/CreateRole", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // CHANGED: Send the role name as a JSON string instead of an object.
      body: JSON.stringify(formData.name),
    })
      .then((response) =>
        response.text().then((text) => {
          if (!response.ok) {
            console.error("CreateRole error:", text);
            throw new Error(text || "Failed to create role");
          }
          return text;
        })
      )
      .then((text) => {
        console.log("CreateRole response:", text);
        fetchRoles();
        setFormData({ name: "" });
        toast.success("Role created successfully!");
      })
      .catch((error) => {
        console.error("Error creating role:", error);
        toast.error("Error creating role: " + error.message);
      });
  };

  // Handle Delete Role
  const handleDeleteRole = (roleId) => {
    fetch(`https://apis.geoestate.ai/api/Roles/DeleteRole/${roleId}`, {
      method: "DELETE",
    })
      .then((response) =>
        response.text().then((text) => {
          if (!response.ok) {
            console.error("DeleteRole error:", text);
            throw new Error(text || "Failed to delete role");
          }
          return text;
        })
      )
      .then((text) => {
        console.log("DeleteRole response:", text);
        fetchRoles();
        toast.success("Role deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting role:", error);
        toast.error("Error deleting role: " + error.message);
      });
  };

  // Handle Edit Role (open modal)
  const handleEditRole = (role) => {
    setEditingRole(role);
    setFormData({ name: role.name });
    setShowModal(true);
  };

  // Handle Update Role
  const handleUpdateRole = () => {
    if (!editingRole?.id) {
      toast.error("Invalid role data!");
      return;
    }
    fetch(`https://apis.geoestate.ai/api/Roles/EditRole/${editingRole.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // CHANGED: Send the role name as a JSON string instead of an object.
      body: JSON.stringify(formData.name),
    })
      .then((response) =>
        response.text().then((text) => {
          if (!response.ok) {
            console.error("EditRole error:", text);
            throw new Error(text || "Failed to update role");
          }
          return text;
        })
      )
      .then((text) => {
        console.log("EditRole response:", text);
        fetchRoles();
        setShowModal(false);
        toast.success("Role updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating role:", error);
        toast.error("Error updating role: " + error.message);
      });
  };

  return (
    <>
      <Sidebar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Container className="mt-4">
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
          <Tab eventKey="view" title="View Roles">
            <Card className="shadow p-3">
              <h4 className="text-success">Roles List</h4>
              <Table striped bordered hover className="shadow mt-3">
                <thead className="bg-success text-white">
                  <tr>
                    <th>ID</th>
                    <th>Role Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.length > 0 ? (
                    roles.map((role) => (
                      <tr key={role.id}>
                        <td>{role.id}</td>
                        <td>{role.name}</td>
                        <td>
                          <Button variant="warning" size="sm" onClick={() => handleEditRole(role)}>
                            Edit
                          </Button>{" "}
                          <Button variant="danger" size="sm" onClick={() => handleDeleteRole(role.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No roles found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </Tab>

          <Tab eventKey="create" title="Create Role">
            <Card className="shadow p-3">
              <h4 className="text-success text-center">Create Role</h4>
              <Form onSubmit={handleCreateRole}>
                <Form.Group className="mb-3">
                  <Form.Label>Role Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button variant="success" type="submit" className="w-100">
                  Create Role
                </Button>
              </Form>
            </Card>
          </Tab>
        </Tabs>
      </Container>

      {/* Edit Role Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdateRole} className="w-100">
              Update Role
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Roles;
