import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Activity, Heart, Thermometer, ShieldAlert, Zap, RefreshCw } from 'lucide-react';

export const PatientMonitoring = () => {
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(true);

  const fetchVitals = () => {
    api.getVitals()
      .then(res => {
        setVitals(res.results || res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchVitals();
    // Simulate real-time telemetry pulse updates
    const interval = setInterval(() => {
      if (simulating) {
        setVitals(prev => prev.map(v => ({
          ...v,
          heart_rate: Math.max(60, Math.min(130, v.heart_rate + Math.floor(Math.random() * 5 - 2))),
          spo2: Math.max(90, Math.min(100, v.spo2 + Math.floor(Math.random() * 3 - 1)))
        })));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [simulating]);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1 className="page-title">Patient Telemetry & Vital Signs Monitoring</h1>
            <span className="badge badge-warning" style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}>
              <Zap size={14} style={{ marginRight: '4px' }} /> Demo / Simulated Data
            </span>
          </div>
          <p className="page-subtitle">Real-time vital signs monitoring panel for clinical staff review</p>
        </div>

        <button 
          onClick={() => setSimulating(!simulating)} 
          className={`btn ${simulating ? 'btn-primary' : 'btn-secondary'}`}
        >
          <RefreshCw size={16} className={simulating ? 'spin' : ''} />
          {simulating ? 'Live Pulse Stream Active' : 'Resume Telemetry Stream'}
        </button>
      </div>

      {/* Safety Notice Banner */}
      <div style={{
        background: '#e0f2fe',
        border: '1px solid #bae6fd',
        borderRadius: '10px',
        padding: '0.875rem 1.25rem',
        marginBottom: '1.5rem',
        fontSize: '0.85rem',
        color: '#0369a1'
      }}>
        <strong>Healthcare Safety Notice:</strong> This telemetry dashboard presents simulated real-time telemetry indicators.
        System alerts require direct professional clinical review and do not replace independent healthcare diagnosis.
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {loading ? (
          <p>Loading patient telemetry...</p>
        ) : vitals.length === 0 ? (
          <p>No vital signs records logged.</p>
        ) : (
          vitals.map(v => (
            <div key={v.id} className="card" style={{
              borderLeft: `5px solid ${
                v.status === 'CRITICAL' ? '#ef4444' :
                v.status === 'ATTENTION' ? '#f59e0b' : '#10b981'
              }`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                    Patient: {v.patient_name || `ID #${v.patient}`}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Last update: {new Date(v.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <span className={`badge ${
                  v.status === 'CRITICAL' ? 'badge-danger' :
                  v.status === 'ATTENTION' ? 'badge-warning' : 'badge-success'
                }`}>
                  {v.status}
                </span>
              </div>

              {/* Grid Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', background: '#f8fafc', padding: '0.875rem', borderRadius: '8px' }}>
                <MetricBox title="Heart Rate" val={`${v.heart_rate} BPM`} icon={Heart} color="#ef4444" />
                <MetricBox title="Blood Pressure" val={`${v.bp_systolic}/${v.bp_diastolic}`} icon={Activity} color="#0284c7" />
                <MetricBox title="SpO₂ Oxygen" val={`${v.spo2}%`} icon={Zap} color="#10b981" />
                <MetricBox title="Temp (°F)" val={`${v.temperature}`} icon={Thermometer} color="#f59e0b" />
                <MetricBox title="Resp Rate" val={`${v.respiratory_rate}/m`} icon={Activity} color="#6366f1" />
                <MetricBox title="Nurse Recorded" val={v.recorded_by_name || 'Joy'} icon={Activity} color="#64748b" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const MetricBox = ({ title, val, icon: Icon, color }) => (
  <div>
    <div style={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
      <Icon size={12} color={color} /> {title}
    </div>
    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
      {val}
    </div>
  </div>
);
