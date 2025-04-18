import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Form,
  Tabs,
  Tab,
  Card,
  Row,
  Col,
  Alert
} from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("view");

  // Form state for creating a user
  const [formData, setFormData] = useState({
    Email: "",
    PhoneNumber: "",
    Password: "",
    RetypePassword: "",
    RoleId: "",
    ReturnUrl: "/" // Default value
  });

  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  // Fetch users and roles on component mount
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  // Fetch users from appUsers endpoint
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://apis.geoestate.ai/api/Users/appUsers");
      const data = await response.json();
      console.log("Fetched users:", data);
      setUsers(data);

      // Store mapping of email to userId in localStorage
      const userIdMap = {};
      data.forEach((user) => {
        userIdMap[user.email] = user.userId; // using userId from response
      });
      localStorage.setItem("userIds", JSON.stringify(userIdMap));
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  // Fetch roles for the dropdown
  const fetchRoles = async () => {
    try {
      const response = await axios.get("https://apis.geoestate.ai/api/Roles/GetRoles");
      console.log("Fetched roles:", response.data);
      setRoles(response.data);
    } catch (err) {
      console.error("Failed to fetch roles:", err);
    }
  };

  // Delete user using correct userId from localStorage
  const handleDeleteUser = async (email) => {
    console.log("Attempting to delete user with email:", email);

    const userIdMap = JSON.parse(localStorage.getItem("userIds")) || {};
    const userId = userIdMap[email];

    if (!userId) {
      toast.error("User ID not found for this email!");
      return;
    }

    console.log("User ID found:", userId);

    try {
      const response = await fetch(
        `https://apis.geoestate.ai/api/Users/deleteUser/${userId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete user. Status: ${response.status}`);
      }

      toast.success("User deleted successfully!");
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  // Create user (with role selection, retype password, etc.)
  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (formData.Password !== formData.RetypePassword) {
      setPasswordMismatchError(true);
      return;
    }
    setPasswordMismatchError(false);

    try {
      await axios.post("https://apis.geoestate.ai/api/UserRegister/register", formData);
      toast.success("User registered successfully!");
      fetchUsers(); // Refresh user list
      // Reset form fields
      setFormData({
        Email: "",
        PhoneNumber: "",
        Password: "",
        RetypePassword: "",
        RoleId: "",
        ReturnUrl: "/"
      });
      setRole("");
    } catch (err) {
      console.error("Error during signup:", err);
      setSubmissionError("There was an error during signup. Please try again.");
    }
  };

  // Handle changes for form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle changes for role dropdown
  const handleRoleChange = (e) => {
    const selectedRoleId = e.target.value;
    setRole(selectedRoleId);
    setFormData({ ...formData, RoleId: selectedRoleId });
  };

  return (
    <>
      <Sidebar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Container className="mt-4">
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
          {/* View Users Tab */}
          <Tab eventKey="view" title="View Users">
            <Card className="shadow p-3">
              <h4 className="text-success">User List</h4>
              <Table striped bordered hover className="shadow mt-3">
                <thead className="bg-success text-white">
                  <tr>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.email}>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber || "-"}</td>
                        <td>{user.roleName || "-"}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteUser(user.email)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </Tab>

          {/* Create User Tab */}
          <Tab eventKey="create" title="Create User">
            <Container className="my-5">
              <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                  {submissionError && <Alert variant="danger">{submissionError}</Alert>}
                  <Form onSubmit={handleCreateUser}>
                    <Form.Group className="mb-3" controlId="Email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="Email"
                        placeholder="Enter your email"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="PhoneNumber">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="PhoneNumber"
                        placeholder="Enter your phone number"
                        value={formData.PhoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="Password"
                        placeholder="Create a password"
                        value={formData.Password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="RetypePassword">
                      <Form.Label>Retype Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="RetypePassword"
                        placeholder="Retype your password"
                        value={formData.RetypePassword}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    {passwordMismatchError && (
                      <Alert variant="danger">
                        Passwords do not match. Please try again.
                      </Alert>
                    )}

                    {/* Role dropdown */}
                    <Form.Group className="mb-3" controlId="role">
                      <Form.Label>Role</Form.Label>
                      <Form.Select value={role} onChange={handleRoleChange} required>
                        <option value="" disabled>
                          Select a Role
                        </option>
                        {roles.length > 0 ? (
                          roles.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading roles...</option>
                        )}
                      </Form.Select>
                    </Form.Group>

                    <Button variant="success" type="submit" className="w-100 text-white">
                      Sign Up
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};


export default Users;
