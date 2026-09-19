import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Activity, Bell, Globe, User, LogOut, ChevronDown, Shield, RefreshCw } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, quickSwitchRole } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const rolesList = [
    { id: 'SUPER_ADMIN', name: 'Super Admin' },
    { id: 'DOCTOR', name: 'Doctor' },
    { id: 'NURSE', name: 'Nurse' },
    { id: 'RECEPTIONIST', name: 'Receptionist' },
    { id: 'BILLING', name: 'Billing Staff' },
    { id: 'LAB', name: 'Laboratory Staff' },
    { id: 'PHARMACIST', name: 'Pharmacist' },
  ];

  return (
    <header className="navbar" style={{
      height: '64px',
      background: 'white',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Brand Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '36px',
          height: '36px',
          background: 'linear-gradient(135deg, #0f766e 0%, #0284c7 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <Activity size={22} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
            ApexHealth <span style={{ color: '#0f766e', fontWeight: 600, fontSize: '0.85rem' }}>HMS Pro</span>
          </h1>
          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Enterprise Hospital System</span>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        
        {/* Quick Role Switcher */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', gap: '0.4rem', borderStyle: 'dashed', borderColor: '#0f766e' }}
            title="Switch demo role instantly"
          >
            <Shield size={14} color="#0f766e" />
            <span>Role: <strong style={{ color: '#0f766e' }}>{user?.role || 'Guest'}</strong></span>
            <RefreshCw size={12} />
          </button>

          {showRoleMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '110%',
              width: '200px',
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
              padding: '0.5rem 0',
              zIndex: 50
            }}>
              <div style={{ padding: '0.375rem 1rem', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Quick Role Switcher
              </div>
              {rolesList.map(r => (
                <button
                  key={r.id}
                  onClick={() => { quickSwitchRole(r.id); setShowRoleMenu(false); }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem 1rem',
                    background: user?.role === r.id ? '#ccfbf1' : 'none',
                    border: 'none',
                    fontSize: '0.8125rem',
                    color: user?.role === r.id ? '#0f766e' : '#334155',
                    cursor: 'pointer',
                    fontWeight: user?.role === r.id ? 700 : 400
                  }}
                >
                  {r.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', gap: '0.4rem' }}
          >
            <Globe size={14} />
            <span>{lang.toUpperCase()}</span>
            <ChevronDown size={12} />
          </button>

          {showLangMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '110%',
              width: '130px',
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
              padding: '0.25rem 0',
              zIndex: 50
            }}>
              <button onClick={() => { setLang('en'); setShowLangMenu(false); }} style={langItemStyle(lang === 'en')}>English</button>
              <button onClick={() => { setLang('ta'); setShowLangMenu(false); }} style={langItemStyle(lang === 'ta')}>தமிழ் (Tamil)</button>
              <button onClick={() => { setLang('hi'); setShowLangMenu(false); }} style={langItemStyle(lang === 'hi')}>हिंदी (Hindi)</button>
            </div>
          )}
        </div>

        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderLeft: '1px solid #e2e8f0', paddingLeft: '1rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#e0f2fe',
            color: '#0369a1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}>
            {user?.first_name ? user.first_name[0] : 'U'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a' }}>
              {user ? `${user.first_name} ${user.last_name}` : 'Guest User'}
            </span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{user?.department || 'Staff'}</span>
          </div>

          <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.4rem 0.6rem', color: '#ef4444' }} title={t('logout')}>
            <LogOut size={16} />
          </button>
        </div>

      </div>
    </header>
  );
};

const langItemStyle = (active) => ({
  width: '100%',
  textAlign: 'left',
  padding: '0.4rem 0.8rem',
  background: active ? '#f1f5f9' : 'none',
  border: 'none',
  fontSize: '0.8rem',
  cursor: 'pointer',
  fontWeight: active ? 700 : 400
});
