import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import logo from "../../assests/img/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    retypepassword: "",
    roleId: "",
    returnUrl: "/"
  });
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "https://apis.geoestate.ai/api/Roles/GetRoles"
        );
        console.log("Fetched Roles:", response.data);
        setRoles(response.data);
      } catch (err) {
        console.error("Failed to fetch roles:", err);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    const selectedRoleId = e.target.value;
    setRole(selectedRoleId);
    setFormData({ ...formData, roleId: selectedRoleId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.retypepassword) {
      setPasswordMismatchError(true);
      return;
    }
    setPasswordMismatchError(false);

    console.log("Final form data:", formData);

    // Define role-to-route mapping.
    // Ensure that the role ids match those provided by your API.
    const roleRedirectMap = {
      // Example: If the agent role id is "8c6f6855-9b8c-479b-8605-e603735c5f53"
      "649ad2bb-09ee-47a2-852f-eb6b352f5693": { roleName: "agent", path: "/AgentPanel" },
      // Redirect for client role
      "e5ce57bb-b3cf-48cf-bc9d-df1747c961f3": { roleName: "client", path: "/ClientPanel" },
      // Redirect for buyer role
      "44e059e8-8142-4964-b110-c0a32b7ed660": { roleName: "buyer", path: "/UserPanel" }
      // Add additional role mappings if needed (e.g., for SuperAdmin or Seller)
    };

    try {
      const response = await axios.post(
        "https://apis.geoestate.ai/api/UserRegister/register",
        formData
      );
      
      // Redirect based on role mapping
      if (roleRedirectMap[role]) {
        localStorage.setItem("role", roleRedirectMap[role].roleName);
        navigate(roleRedirectMap[role].path);
      } else {
        // Fallback redirection if role is not found in the mapping
        localStorage.setItem("role", "buyer");
        navigate("/UserPanel");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setSubmissionError("There was an error during signup. Please try again.");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="GeoEstate Logo"
              style={{ width: "150px", height: "auto" }}
            />
            <h2 className="mt-3">SignUp Here</h2>
          </div>

          {submissionError && <Alert variant="danger">{submissionError}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Create a password"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="retypepassword">
              <Form.Label>Retype Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Retype your password"
                name="retypepassword"
                onChange={handleChange}
                required
              />
            </Form.Group>

            {passwordMismatchError && (
              <Alert variant="danger">
                Passwords do not match. Please try again.
              </Alert>
            )}

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
  );
};

export default Signup;
