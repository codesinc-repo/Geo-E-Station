import React from "react";
import { useNavigate } from "react-router-dom";
// import

const TestLogin = () => {
    const navigate = useNavigate();

    const handleLogin = (role, path) => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", role);
        alert(`Logged in as ${role}`);
        navigate(path);
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Test Role-Based Authorization</h1>
            <button onClick={() => handleLogin("buyer", "/UserPanel")} style={buttonStyle}>
                Login as Buyer
            </button>
            <button onClick={() => handleLogin("agent", "/AgentPanel")} style={buttonStyle}>
                Login as Agent
            </button>
            <button onClick={() => handleLogin("client", "/ClientPanel")} style={buttonStyle}>
                Login as Client
            </button>
            <button
                onClick={() => {
                    localStorage.clear();
                    alert("Logged out");
                }}
                style={{ ...buttonStyle, backgroundColor: "red" }}
            >
                Logout
            </button>
        </div>
    );
};

const buttonStyle = {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#33db4a",
    color: "white",
    border: "none",
    borderRadius: "5px",
};

export default TestLogin;
