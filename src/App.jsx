import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { PatientDetails } from './pages/PatientDetails';
import { Doctors } from './pages/Doctors';
import { Appointments } from './pages/Appointments';
import { MedicalRecords } from './pages/MedicalRecords';
import { Prescriptions } from './pages/Prescriptions';
import { Laboratory } from './pages/Laboratory';
import { Pharmacy } from './pages/Pharmacy';
import { Billing } from './pages/Billing';
import { Insurance } from './pages/Insurance';
import { PatientMonitoring } from './pages/PatientMonitoring';
import { Reports } from './pages/Reports';
import { PreviousRecords } from './pages/PreviousRecords';
import { AuditLogs } from './pages/AuditLogs';
import { Settings } from './pages/Settings';
import { Forbidden, NotFound } from './pages/NotFound';

// Protected Route wrapper with role authorization check
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useAuth();

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role) && user?.role !== 'SUPER_ADMIN') {
    return <Forbidden />;
  }

  return children;
};

const MainLayout = ({ children }) => (
  <div className="app-container">
    <Sidebar />
    <div className="main-content">
      <Navbar />
      {children}
    </div>
  </div>
);

export function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Authenticated Routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout><Dashboard /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/patients" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST']}>
                <MainLayout><Patients /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/patients/:id" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST']}>
                <MainLayout><PatientDetails /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/doctors" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'RECEPTIONIST', 'DOCTOR']}>
                <MainLayout><Doctors /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/doctor-fees" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'BILLING', 'RECEPTIONIST']}>
                <MainLayout><Doctors /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/appointments" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST']}>
                <MainLayout><Appointments /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/medical-records" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'DOCTOR', 'NURSE']}>
                <MainLayout><MedicalRecords /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/prescriptions" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'DOCTOR', 'PHARMACIST']}>
                <MainLayout><Prescriptions /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/laboratory" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'LAB', 'DOCTOR']}>
                <MainLayout><Laboratory /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/pharmacy" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'PHARMACIST', 'DOCTOR']}>
                <MainLayout><Pharmacy /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/billing" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'BILLING']}>
                <MainLayout><Billing /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/insurance" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'BILLING']}>
                <MainLayout><Insurance /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/patient-monitoring" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'DOCTOR', 'NURSE']}>
                <MainLayout><PatientMonitoring /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/reports" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'BILLING', 'DOCTOR']}>
                <MainLayout><Reports /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/previous-records" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST']}>
                <MainLayout><PreviousRecords /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/audit-logs" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <MainLayout><AuditLogs /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/settings" element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <MainLayout><Settings /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
