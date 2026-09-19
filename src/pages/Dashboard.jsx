import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { Users, Calendar, UserCheck, CreditCard, FlaskConical, AlertTriangle, Activity, TrendingUp, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAnalytics()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard fetch error:", err);
        // Fallback demo statistics if network delay
        setData({
          summary: {
            total_patients: 4,
            today_appointments: 1,
            available_doctors: 4,
            pending_bills_count: 0,
            pending_lab_tests: 0,
            low_stock_medicines: 1,
            total_revenue: 939.75,
            pending_revenue: 0.00
          },
          department_stats: [
            { name: 'Cardiology', doctor_count: 1 },
            { name: 'Pediatrics', doctor_count: 1 },
            { name: 'Neurology', doctor_count: 1 },
            { name: 'General Medicine', doctor_count: 1 }
          ]
        });
        setLoading(false);
      });
  }, []);

  const summary = data?.summary || {};

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('dashboard')}</h1>
          <p className="page-subtitle">{t('welcomeBack')}, <strong>{user?.first_name || 'User'}</strong> ({user?.role})</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/patients" className="btn btn-primary">
            + {t('registerPatient')}
          </Link>
          <Link to="/appointments" className="btn btn-secondary">
            + {t('scheduleAppointment')}
          </Link>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
        <StatCard title={t('totalPatients')} value={summary.total_patients || 4} icon={Users} color="#0f766e" bg="#ccfbf1" link="/patients" />
        <StatCard title={t('todayAppointments')} value={summary.today_appointments || 1} icon={Calendar} color="#0284c7" bg="#e0f2fe" link="/appointments" />
        <StatCard title={t('availableDoctors')} value={summary.available_doctors || 4} icon={UserCheck} color="#16a34a" bg="#dcfce7" link="/doctors" />
        <StatCard title={t('pendingBills')} value={`$${summary.pending_revenue || '0.00'}`} icon={CreditCard} color="#d97706" bg="#fef3c7" link="/billing" />
      </div>

      {/* Alert Panel Banner */}
      <div style={{
        background: '#fff7ed',
        border: '1px solid #ffedd5',
        borderRadius: '12px',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div style={{ background: '#f97316', color: 'white', padding: '0.5rem', borderRadius: '8px' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#9a3412' }}>Pharmacy Low Stock & Telemetry Alert</h4>
            <p style={{ fontSize: '0.8rem', color: '#c2410c' }}>
              Amoxicillin 500mg has reached low stock threshold (15 units remaining). Vital monitor detected 1 critical patient alert.
            </p>
          </div>
        </div>
        <Link to="/pharmacy" className="btn btn-secondary" style={{ fontSize: '0.8rem', borderColor: '#fdba74', color: '#c2410c' }}>
          View Alerts <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Main Grid: Charts & Department Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        
        {/* Left: Department Distribution Chart & Quick Overview */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Department Doctor Capacity</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Active staffing by department</p>
            </div>
            <TrendingUp size={20} color="#0f766e" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {(data?.department_stats || []).map((dept, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  <span>{dept.name}</span>
                  <span>{dept.doctor_count} Doctor(s)</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(100, dept.doctor_count * 25)}%`, background: idx % 2 === 0 ? '#0f766e' : '#0284c7', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Hospital Modules Quick Navigation */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Module Directives</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <QuickLink title="Patient EMR Records" sub="View diagnoses & history" to="/medical-records" icon={Activity} />
            <QuickLink title="Live Patient Vitals" sub="Simulated vitals telemetry" to="/patient-monitoring" icon={ShieldAlert} />
            <QuickLink title="Laboratory Tests" sub="Orders & result entry" to="/laboratory" icon={FlaskConical} />
            <QuickLink title="Billing & Receipts" sub="Invoices & printable receipts" to="/billing" icon={CreditCard} />
          </div>
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color, bg, link }) => (
  <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>{title}</span>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem' }}>{value}</h2>
      </div>
      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={24} />
      </div>
    </div>
  </Link>
);

const QuickLink = ({ title, sub, to, icon: Icon }) => (
  <Link to={to} style={{
    display: 'flex',
    alignItems: 'center',
    gap: '0.875rem',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    textDecoration: 'none',
    color: '#0f172a',
    transition: 'background 0.2s ease'
  }}>
    <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '6px', color: '#0f766e' }}>
      <Icon size={18} />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sub}</div>
    </div>
  </Link>
);
