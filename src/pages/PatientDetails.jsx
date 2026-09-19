import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Modal } from '../components/Modal';
import { User, Phone, Mail, MapPin, Heart, Activity, FileText, Calendar, Shield, Edit3, Plus, ArrowLeft } from 'lucide-react';

export const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isVitalModalOpen, setIsVitalModalOpen] = useState(false);

  // Edit patient state
  const [editData, setEditData] = useState({});

  // Record vitals state
  const [vitalData, setVitalData] = useState({
    heart_rate: 75,
    bp_systolic: 120,
    bp_diastolic: 80,
    temperature: 98.6,
    spo2: 98,
    respiratory_rate: 16,
    status: 'NORMAL'
  });

  const loadData = () => {
    setLoading(true);
    api.getPatientById(id)
      .then(res => {
        setPatient(res);
        setEditData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    api.getPatientTimeline(id)
      .then(res => setTimeline(res))
      .catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleUpdatePatient = (e) => {
    e.preventDefault();
    api.updatePatient(id, editData)
      .then(() => {
        setIsEditModalOpen(false);
        loadData();
        alert('Patient updated successfully! Audit log entry recorded.');
      })
      .catch(err => alert(err.message));
  };

  const handleRecordVital = (e) => {
    e.preventDefault();
    api.recordVitals({ ...vitalData, patient: id })
      .then(() => {
        setIsVitalModalOpen(false);
        loadData();
        alert('Vital signs recorded!');
      })
      .catch(err => alert(err.message));
  };

  if (loading) return <div className="page-wrapper"><p>Loading patient profile...</p></div>;
  if (!patient) return <div className="page-wrapper"><p>Patient record not found.</p></div>;

  return (
    <div className="page-wrapper">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/patients" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
          <ArrowLeft size={16} /> Back to Patients List
        </Link>
      </div>

      {/* Header Profile Banner */}
      <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: '#0f766e',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              fontWeight: 800
            }}>
              {patient.first_name[0]}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>{patient.first_name} {patient.last_name}</h1>
                <span className="badge badge-info" style={{ fontSize: '0.85rem' }}>{patient.patient_id}</span>
                <span className="badge badge-success">{patient.blood_group}</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                {patient.age} Yrs old • {patient.gender} • Phone: <strong>{patient.phone}</strong> • Emergency: {patient.emergency_contact || 'None'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setIsVitalModalOpen(true)} className="btn btn-secondary">
              <Activity size={16} /> Record Vitals
            </button>
            <button onClick={() => setIsEditModalOpen(true)} className="btn btn-primary">
              <Edit3 size={16} /> Update Details
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
        <TabButton label="Overview & History" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
        <TabButton label="Medical Timeline (EMR)" active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} />
        <TabButton label="Vital Signs Log" active={activeTab === 'vitals'} onClick={() => setActiveTab('vitals')} />
        <TabButton label="Audit Trail" active={activeTab === 'audit'} onClick={() => setActiveTab('audit')} />
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>Clinical Profile</h3>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>Allergies:</strong> {patient.allergies || 'None recorded'}</p>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>Medical History:</strong> {patient.medical_history || 'No prior chronic conditions recorded'}</p>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>Assigned Doctor:</strong> {patient.assigned_doctor_name || 'Unassigned'}</p>
            <p style={{ fontSize: '0.875rem' }}><strong>Address:</strong> {patient.address || 'N/A'}</p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>Latest Vital Signs</h3>
            {patient.latest_vitals ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <VitalBadge title="Heart Rate" val={`${patient.latest_vitals.heart_rate} BPM`} />
                <VitalBadge title="Blood Pressure" val={`${patient.latest_vitals.bp_systolic}/${patient.latest_vitals.bp_diastolic} mmHg`} />
                <VitalBadge title="SpO₂ Level" val={`${patient.latest_vitals.spo2}%`} />
                <VitalBadge title="Temperature" val={`${patient.latest_vitals.temperature} °F`} />
              </div>
            ) : (
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>No vitals recorded today.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Electronic Medical Record Timeline</h3>
          {timeline.length === 0 ? (
            <p style={{ color: '#64748b' }}>No EMR visits recorded yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '2px solid #0f766e', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
              {timeline.map((item, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-1.95rem', top: '0', width: '14px', height: '14px', borderRadius: '50%', background: '#0f766e', border: '3px solid white' }} />
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f766e' }}>{item.visit_date} • {item.record_id}</div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>Diagnosis: {item.diagnosis}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.25rem' }}>Chief Complaint: {item.chief_complaint}</p>
                  <p style={{ fontSize: '0.85rem', color: '#475569' }}>Treatment Plan: {item.treatment_plan}</p>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Attending Doctor: {item.doctor_name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="card table-container" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Changed By</th>
                <th>Field Changed</th>
                <th>Old Value</th>
                <th>New Value</th>
              </tr>
            </thead>
            <tbody>
              {(patient.audit_logs || []).length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '1.5rem', color: '#64748b' }}>No updates logged yet.</td></tr>
              ) : (
                patient.audit_logs.map((log, idx) => (
                  <tr key={idx}>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                    <td><strong>{log.changed_by_name || 'System'}</strong></td>
                    <td><code>{log.field_changed}</code></td>
                    <td style={{ color: '#ef4444' }}>{log.old_value || 'Empty'}</td>
                    <td style={{ color: '#16a34a' }}>{log.new_value}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Patient Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Update Patient Information">
        <form onSubmit={handleUpdatePatient}>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-control" value={editData.phone || ''} onChange={e => setEditData({ ...editData, phone: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={editData.email || ''} onChange={e => setEditData({ ...editData, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" value={editData.address || ''} onChange={e => setEditData({ ...editData, address: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Emergency Contact</label>
            <input type="text" className="form-control" value={editData.emergency_contact || ''} onChange={e => setEditData({ ...editData, emergency_contact: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Allergies</label>
            <input type="text" className="form-control" value={editData.allergies || ''} onChange={e => setEditData({ ...editData, allergies: e.target.value })} />
          </div>
          <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes & Audit</button>
          </div>
        </form>
      </Modal>

      {/* Record Vitals Modal */}
      <Modal isOpen={isVitalModalOpen} onClose={() => setIsVitalModalOpen(false)} title="Record Vital Signs">
        <form onSubmit={handleRecordVital}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Heart Rate (BPM)</label>
              <input type="number" className="form-control" value={vitalData.heart_rate} onChange={e => setVitalData({ ...vitalData, heart_rate: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Systolic BP (mmHg)</label>
              <input type="number" className="form-control" value={vitalData.bp_systolic} onChange={e => setVitalData({ ...vitalData, bp_systolic: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Diastolic BP (mmHg)</label>
              <input type="number" className="form-control" value={vitalData.bp_diastolic} onChange={e => setVitalData({ ...vitalData, bp_diastolic: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Temperature (°F)</label>
              <input type="number" step="0.1" className="form-control" value={vitalData.temperature} onChange={e => setVitalData({ ...vitalData, temperature: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">SpO₂ (%)</label>
              <input type="number" className="form-control" value={vitalData.spo2} onChange={e => setVitalData({ ...vitalData, spo2: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Telemetry Status</label>
              <select className="form-control" value={vitalData.status} onChange={e => setVitalData({ ...vitalData, status: e.target.value })}>
                <option value="NORMAL">Normal</option>
                <option value="ATTENTION">Attention Required</option>
                <option value="CRITICAL">Critical Alert</option>
              </select>
            </div>
          </div>
          <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
            <button type="button" onClick={() => setIsVitalModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Vital Signs</button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

const TabButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '0.75rem 1.25rem',
      background: 'none',
      border: 'none',
      borderBottom: active ? '3px solid #0f766e' : '3px solid transparent',
      fontSize: '0.875rem',
      fontWeight: active ? 700 : 500,
      color: active ? '#0f766e' : '#64748b',
      cursor: 'pointer'
    }}
  >
    {label}
  </button>
);

const VitalBadge = ({ title, val }) => (
  <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{title}</div>
    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>{val}</div>
  </div>
);
