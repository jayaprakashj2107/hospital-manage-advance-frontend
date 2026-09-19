import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const Forbidden = () => (
  <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
    <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
      <ShieldAlert size={48} />
    </div>
    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>403 - Access Denied</h1>
    <p style={{ color: '#64748b', maxWidth: '450px', marginBottom: '1.5rem' }}>
      You are not authorized to view this hospital module with your current user role. Please contact your system administrator.
    </p>
    <Link to="/dashboard" className="btn btn-primary">
      <ArrowLeft size={16} /> Return to Dashboard
    </Link>
  </div>
);

export const NotFound = () => (
  <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
    <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#0f766e', marginBottom: '0.5rem' }}>404</h1>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Page Not Found</h2>
    <p style={{ color: '#64748b', maxWidth: '450px', marginBottom: '1.5rem' }}>
      The requested page or medical resource could not be found.
    </p>
    <Link to="/dashboard" className="btn btn-primary">
      <ArrowLeft size={16} /> Return to Dashboard
    </Link>
  </div>
);
