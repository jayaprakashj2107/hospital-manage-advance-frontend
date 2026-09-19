import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('hms_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [token, setToken] = useState(() => localStorage.getItem('hms_token') || null);
  const [loading, setLoading] = useState(false);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('hms_user', JSON.stringify(userData));
    localStorage.setItem('hms_token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('hms_user');
    localStorage.removeItem('hms_token');
  };

  // Perform REAL API Login for Quick Role Switching
  const quickSwitchRole = (role) => {
    const roleCreds = {
      SUPER_ADMIN: { username: 'admin', password: 'admin123' },
      DOCTOR: { username: 'dr_smith', password: 'doctor123' },
      NURSE: { username: 'nurse_joy', password: 'nurse123' },
      RECEPTIONIST: { username: 'receptionist_sam', password: 'recept123' },
      BILLING: { username: 'billing_bob', password: 'billing123' },
      LAB: { username: 'lab_linda', password: 'lab123' },
      PHARMACIST: { username: 'pharm_peter', password: 'pharm123' },
    };

    const creds = roleCreds[role] || roleCreds['SUPER_ADMIN'];
    setLoading(true);

    api.login(creds)
      .then(res => {
        login(res.user, res.access);
        setLoading(false);
      })
      .catch(err => {
        console.warn("API Login fallback for role", role, err);
        const roleMap = {
          SUPER_ADMIN: { username: 'admin', role: 'SUPER_ADMIN', first_name: 'Super', last_name: 'Admin', department: 'Administration' },
          DOCTOR: { username: 'dr_smith', role: 'DOCTOR', first_name: 'Robert', last_name: 'Smith', department: 'Cardiology' },
          NURSE: { username: 'nurse_joy', role: 'NURSE', first_name: 'Joy', last_name: 'Miller', department: 'Nursing' },
          RECEPTIONIST: { username: 'receptionist_sam', role: 'RECEPTIONIST', first_name: 'Sam', last_name: 'Davis', department: 'Reception' },
          BILLING: { username: 'billing_bob', role: 'BILLING', first_name: 'Bob', last_name: 'Taylor', department: 'Billing' },
          LAB: { username: 'lab_linda', role: 'LAB', first_name: 'Linda', last_name: 'White', department: 'Laboratory' },
          PHARMACIST: { username: 'pharm_peter', role: 'PHARMACIST', first_name: 'Peter', last_name: 'Parker', department: 'Pharmacy' },
        };
        login(roleMap[role] || roleMap['SUPER_ADMIN'], 'demo-jwt-token');
        setLoading(false);
      });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, quickSwitchRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
