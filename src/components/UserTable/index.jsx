import React, { useState } from "react";
import "./usertable.css"

const UserTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [users, setUsers] = useState([
    {
      state: "✔",
      email: "lilian.periodista@gmail.com",
      lastAccess: "23-11-2024",
      ratings: 36,
      individuals: 776,
      marketResearch: 0,
      tasks: 0,
      zones: 2,
    },
    {
      state: "✔",
      email: "hharc@gmail.com",
      lastAccess: "",
      ratings: 0,
      individuals: 0,
      marketResearch: 0,
      tasks: 0,
      zones: 0,
    },
  ]);

  const handleAddUser = () => {
    if (newUserEmail.trim() === "") return;
    const newUser = {
      state: "✔",
      email: newUserEmail,
      lastAccess: "",
      ratings: 0,
      individuals: 0,
      marketResearch: 0,
      tasks: 0,
      zones: 0,
    };
    setUsers([...users, newUser]);
    setNewUserEmail("");
    setIsModalOpen(false);
  };

  const handleDeleteUser = (index) => {
    setUsers(users.filter((_, idx) => idx !== index));
  };

  return (
    <div className="user-table-container">
      <h3 className="user-table-header">Users</h3>
      <p className="user-table-subtext">
        You have the possibility to create {3 - users.length} more users for free.
      </p>
      <table className="user-table">
        <thead>
          <tr>
            <th>State</th>
            <th>E-mail</th>
            <th>Last Access</th>
            <th>Ratings</th>
            <th>Individuals</th>
            <th>Market Research</th>
            <th>Tasks</th>
            <th>Zones</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.state}</td>
              <td>{user.email}</td>
              <td>{user.lastAccess}</td>
              <td>{user.ratings}</td>
              <td>{user.individuals}</td>
              <td>{user.marketResearch}</td>
              <td>{user.tasks}</td>
              <td>{user.zones}</td>
              <td>
                <span
                  className="action-delete"
                  onClick={() => handleDeleteUser(index)}
                >
                  ❌
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="create-user-button"
        onClick={() => setIsModalOpen(true)}
      >
        CREATE USER
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Create User</h4>
            <input
              type="email"
              placeholder="Enter Gmail"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="modal-input"
            />
            <div className="modal-actions">
              <button className="modal-add-button" onClick={handleAddUser}>
                Add User
              </button>
              <button
                className="modal-cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
