import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase'; // Import your authentication service

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    // Add other authentication functions (login, logout, etc.) here if needed
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
