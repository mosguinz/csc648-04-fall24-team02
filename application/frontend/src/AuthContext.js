import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(''); // Add username state

  const login = (user) => {
    setIsAuthenticated(true);
    setUsername(user); // Set the username when logging in
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(''); // Clear the username when logging out
    window.location.href = '/SignIn'; // Redirect to the sign-in page after logging out
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};