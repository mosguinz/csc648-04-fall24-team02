import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const logout = () => {
    setIsAuthenticated(false); 
    setUsername(''); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, username, setUsername, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
