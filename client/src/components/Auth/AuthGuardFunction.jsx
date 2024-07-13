import React, { createContext, useContext, useState } from 'react';

// Create an AuthContext to manage authentication state
const AuthContext = createContext(null);

export const AuthGuardFunction = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to sign up a user
  const signUp = (userData) => {
    setUser(userData);
  };

  // Function to log in a user
  const login = (userData) => {
    setUser(userData);
  };

  // Function to log out a user
  const logout = () => {
    setUser(null);
  };

  const updateUser = (newUser) => {
    setUser(newUser);
  };
  
  // Provide the authentication state and functions to child components
  return (
    <AuthContext.Provider value={{ user, signUp, login, logout ,updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
