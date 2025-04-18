import React, { createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const login = (role) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", role);
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
  };

  const getRole = () => localStorage.getItem("role");

  const isAuthenticated = () => localStorage.getItem("isAuthenticated") === "true";

  return (
    <UserContext.Provider value={{ login, logout, getRole, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
