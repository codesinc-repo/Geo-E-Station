import React, { useEffect, useState } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";

const AgentAllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://homevocation-001-site4.atempurl.com/api/Users/appUsers"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Sidebar />
      <Container className="mt-5">
        <h3 className="text-center mb-4">All Users</h3>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Loading...</p>
          </div>
        ) : users.length > 0 ? (
          <Table  striped bordered hover responsive >
            <thead>
              <tr >
                <th className="bg-success text-white">#</th>
                <th className="bg-success text-white">Email</th>
                <th className="bg-success text-white">Avatar</th>
                <th className="bg-success text-white">Avatar Name</th>
                <th className="bg-success text-white">Avatar Path</th>
                <th className="bg-success text-white">Company ID</th>
                <th className="bg-success text-white">Company</th>
                <th className="bg-success text-white">User Name</th>
                <th className="bg-success text-white">Normalized User Name</th>
                <th className="bg-success text-white">Email Confirmed</th>
                <th className="bg-success text-white">Phone Number</th>
                <th className="bg-success text-white">Phone Confirmed</th>
                <th className="bg-success text-white">Two Factor Enabled</th>
                <th className="bg-success text-white">Lockout Enabled</th>
                <th className="bg-success text-white">Access Failed Count</th>
                <th className="bg-success text-white">ID</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.avatar ? (
                      <img src={user.avatar} alt="Avatar" width={50} />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{user.avatarName || "N/A"}</td>
                  <td>{user.avatarPath || "N/A"}</td>
                  <td>{user.idEmpresa || "N/A"}</td>
                  <td>{user.empresa || "N/A"}</td>
                  <td>{user.userName}</td>
                  <td>{user.normalizedUserName}</td>
                  <td>{user.emailConfirmed ? "Yes" : "No"}</td>
                  <td>{user.phoneNumber || "N/A"}</td>
                  <td>{user.phoneNumberConfirmed ? "Yes" : "No"}</td>
                  <td>{user.twoFactorEnabled ? "Yes" : "No"}</td>
                  <td>{user.lockoutEnabled ? "Yes" : "No"}</td>
                  <td>{user.accessFailedCount}</td>
                  <td>{user.id}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center">No users found.</p>
        )}
      </Container>
    </>
  );
};

export default AgentAllUser;
