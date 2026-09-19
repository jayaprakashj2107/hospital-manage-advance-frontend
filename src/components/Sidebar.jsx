import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  FileText,
  Pill,
  FlaskConical,
  CreditCard,
  ShieldCheck,
  Activity,
  BarChart3,
  History,
  Settings,
  Shield
} from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const userRole = user?.role || 'SUPER_ADMIN';

  const navItems = [
    { path: '/dashboard', label: t('dashboard'), icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'BILLING', 'LAB', 'PHARMACIST'] },
    { path: '/patients', label: t('patients'), icon: Users, roles: ['SUPER_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'] },
    { path: '/doctors', label: t('doctors'), icon: UserCheck, roles: ['SUPER_ADMIN', 'RECEPTIONIST', 'DOCTOR'] },
    { path: '/appointments', label: t('appointments'), icon: Calendar, roles: ['SUPER_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'] },
    { path: '/doctor-fees', label: t('doctorFees'), icon: DollarSign, roles: ['SUPER_ADMIN', 'BILLING', 'RECEPTIONIST'] },
    { path: '/medical-records', label: t('medicalRecords'), icon: FileText, roles: ['SUPER_ADMIN', 'DOCTOR', 'NURSE'] },
    { path: '/prescriptions', label: t('prescriptions'), icon: Pill, roles: ['SUPER_ADMIN', 'DOCTOR', 'PHARMACIST'] },
    { path: '/laboratory', label: t('laboratory'), icon: FlaskConical, roles: ['SUPER_ADMIN', 'LAB', 'DOCTOR'] },
    { path: '/pharmacy', label: t('pharmacy'), icon: Pill, roles: ['SUPER_ADMIN', 'PHARMACIST', 'DOCTOR'] },
    { path: '/billing', label: t('billing'), icon: CreditCard, roles: ['SUPER_ADMIN', 'BILLING'] },
    { path: '/insurance', label: t('insurance'), icon: ShieldCheck, roles: ['SUPER_ADMIN', 'BILLING'] },
    { path: '/patient-monitoring', label: t('monitoring'), icon: Activity, roles: ['SUPER_ADMIN', 'DOCTOR', 'NURSE'] },
    { path: '/reports', label: t('reports'), icon: BarChart3, roles: ['SUPER_ADMIN', 'BILLING', 'DOCTOR'] },
    { path: '/previous-records', label: t('previousRecords'), icon: History, roles: ['SUPER_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'] },
    { path: '/audit-logs', label: 'Audit Logs', icon: Shield, roles: ['SUPER_ADMIN'] },
    { path: '/settings', label: t('settings'), icon: Settings, roles: ['SUPER_ADMIN'] },
  ];

  const visibleNav = navItems.filter(item => item.roles.includes(userRole) || userRole === 'SUPER_ADMIN');

  return (
    <aside style={{
      width: '240px',
      background: '#0f172a',
      color: '#94a3b8',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #1e293b',
      flexShrink: 0
    }}>
      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #1e293b', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Main Navigation
      </div>

      <nav style={{ flex: 1, padding: '0.75rem 0.5rem', overflowY: 'auto' }}>
        {visibleNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.625rem 0.875rem',
                margin: '0.125rem 0',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#ffffff' : '#94a3b8',
                background: isActive ? '#0f766e' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.15s ease'
              })}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Role Footer */}
      <div style={{ padding: '1rem', borderTop: '1px solid #1e293b', background: '#0b1329', fontSize: '0.75rem' }}>
        <div style={{ color: '#64748b', fontSize: '0.7rem' }}>Logged in Role:</div>
        <div style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '0.85rem', marginTop: '0.1rem' }}>
          {userRole}
        </div>
      </div>
    </aside>
  );
};
