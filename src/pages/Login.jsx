import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Activity, ShieldCheck, User, Lock, ArrowRight, Sparkles } from 'lucide-react';

export const Login = () => {
  const { login, quickSwitchRole } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      quickSwitchRole('SUPER_ADMIN');
    } else {
      quickSwitchRole('DOCTOR');
    }
  };

  const roles = [
    { id: 'SUPER_ADMIN', label: 'Super Admin', desc: 'Full System Access', icon: '👑' },
    { id: 'DOCTOR', label: 'Doctor', desc: 'EMR, Diagnosis & Vitals', icon: '👨‍⚕️' },
    { id: 'NURSE', label: 'Nurse', desc: 'Vitals & Care Notes', icon: '👩‍⚕️' },
    { id: 'RECEPTIONIST', label: 'Receptionist', desc: 'Patient Reg & Appts', icon: '📋' },
    { id: 'BILLING', label: 'Billing Staff', desc: 'Bills, Payments & Claims', icon: '💳' },
    { id: 'LAB', label: 'Lab Staff', desc: 'Lab Tests & Results', icon: '🔬' },
    { id: 'PHARMACIST', label: 'Pharmacist', desc: 'Medicines & Dispensing', icon: '💊' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #0f766e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '1000px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        overflow: 'hidden'
      }}>
        {/* Left Side: Credentials Form */}
        <div style={{ padding: '3rem 2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              background: '#0f766e',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Activity size={26} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>ApexHealth HMS</h2>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Hospital Management System</span>
            </div>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Account Sign In</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>Enter credentials or select a quick demo role below.</p>

          {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username / Email</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  className="form-control" 
                  style={{ paddingLeft: '2.5rem' }} 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username" 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                <input 
                  type="password" 
                  className="form-control" 
                  style={{ paddingLeft: '2.5rem' }} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  required 
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem', fontSize: '0.95rem', marginTop: '1rem' }}>
              Sign In to System <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* Right Side: Quick Role Login Cards */}
        <div style={{
          background: '#f8fafc',
          borderLeft: '1px solid #e2e8f0',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#0f766e' }}>
            <Sparkles size={20} />
            <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Quick Demo Role Picker</h4>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>
            One-click authentication to test role-based access control (RBAC):
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '380px', overflowY: 'auto' }}>
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => quickSwitchRole(r.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  padding: '0.75rem 1rem',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#0f766e'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'none'; }}
              >
                <span style={{ fontSize: '1.5rem' }}>{r.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>{r.label}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{r.desc}</div>
                </div>
                <ArrowRight size={16} color="#0f766e" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
