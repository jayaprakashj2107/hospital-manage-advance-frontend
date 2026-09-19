import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Modal } from '../components/Modal';
import { UserCheck, DollarSign, Phone, Mail, Award, Clock, Plus } from 'lucide-react';

export const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [fees, setFees] = useState([]);
  const [activeTab, setActiveTab] = useState('directory');
  const [loading, setLoading] = useState(true);
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);

  // New fee form
  const [feeForm, setFeeForm] = useState({
    doctor: '',
    consultation_type: 'General Consultation',
    consultation_fee: 500.00,
    follow_up_fee: 300.00,
    emergency_fee: 1000.00,
    status: 'Active'
  });

  const loadData = () => {
    setLoading(true);
    api.getDoctors()
      .then(res => {
        setDoctors(res.results || res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    api.getDoctorFees()
      .then(res => setFees(res.results || res || []))
      .catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddFee = (e) => {
    e.preventDefault();
    api.createDoctorFee(feeForm)
      .then(() => {
        setIsFeeModalOpen(false);
        loadData();
        alert('Doctor consultation fee updated!');
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Doctor Management & Consultation Fees</h1>
          <p className="page-subtitle">Medical specialists, departments, availability & fee structures</p>
        </div>
        {activeTab === 'fees' && (
          <button onClick={() => setIsFeeModalOpen(true)} className="btn btn-primary">
            <Plus size={16} /> Configure Doctor Fee
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('directory')}
          style={{ padding: '0.75rem 1.25rem', background: 'none', border: 'none', borderBottom: activeTab === 'directory' ? '3px solid #0f766e' : 'none', fontWeight: 700, color: activeTab === 'directory' ? '#0f766e' : '#64748b', cursor: 'pointer' }}
        >
          Doctor Directory
        </button>
        <button
          onClick={() => setActiveTab('fees')}
          style={{ padding: '0.75rem 1.25rem', background: 'none', border: 'none', borderBottom: activeTab === 'fees' ? '3px solid #0f766e' : 'none', fontWeight: 700, color: activeTab === 'fees' ? '#0f766e' : '#64748b', cursor: 'pointer' }}
        >
          Doctor Fees Structure
        </button>
      </div>

      {/* Doctor Directory Grid */}
      {activeTab === 'directory' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {doctors.map(d => (
            <div key={d.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    Dr
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Dr. {d.full_name}</h3>
                    <span className="badge badge-info">{d.specialization}</span>
                  </div>
                </div>
                <span className="badge badge-success">{d.availability_status}</span>
              </div>

              <div style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.35rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
                <div>Department: <strong>{d.department_name || 'General Medicine'}</strong></div>
                <div>Experience: <strong>{d.experience_years} Years</strong></div>
                <div>Standard Fee: <strong>${d.consultation_fee}</strong></div>
                <div>Contact: {d.phone} • {d.email}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Doctor Fees Table */}
      {activeTab === 'fees' && (
        <div className="card table-container" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Consultation Type</th>
                <th>Standard Fee ($)</th>
                <th>Follow-up Fee ($)</th>
                <th>Emergency Fee ($)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fees.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No fee structures created yet.</td></tr>
              ) : (
                fees.map(f => (
                  <tr key={f.id}>
                    <td style={{ fontWeight: 700 }}>Dr. {f.doctor_name || 'Doctor'}</td>
                    <td>Consultation Specialist</td>
                    <td>{f.consultation_type}</td>
                    <td><strong>${f.consultation_fee}</strong></td>
                    <td>${f.follow_up_fee}</td>
                    <td>${f.emergency_fee}</td>
                    <td><span className="badge badge-success">{f.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Fee Modal */}
      <Modal isOpen={isFeeModalOpen} onClose={() => setIsFeeModalOpen(false)} title="Configure Doctor Fee">
        <form onSubmit={handleAddFee}>
          <div className="form-group">
            <label className="form-label">Select Doctor</label>
            <select className="form-control" required value={feeForm.doctor} onChange={e => setFeeForm({ ...feeForm, doctor: e.target.value })}>
              <option value="">Choose Doctor</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>Dr. {d.full_name} ({d.specialization})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Consultation Fee ($)</label>
              <input type="number" className="form-control" value={feeForm.consultation_fee} onChange={e => setFeeForm({ ...feeForm, consultation_fee: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Follow-up Fee ($)</label>
              <input type="number" className="form-control" value={feeForm.follow_up_fee} onChange={e => setFeeForm({ ...feeForm, follow_up_fee: e.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Emergency Fee ($)</label>
            <input type="number" className="form-control" value={feeForm.emergency_fee} onChange={e => setFeeForm({ ...feeForm, emergency_fee: e.target.value })} />
          </div>

          <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
            <button type="button" onClick={() => setIsFeeModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Fee Structure</button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
