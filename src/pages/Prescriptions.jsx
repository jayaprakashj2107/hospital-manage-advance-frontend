import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Modal } from '../components/Modal';
import { Pill, Plus, User, CheckCircle2 } from 'lucide-react';

export const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    patient: '',
    doctor: '',
    notes: 'Take after meals.',
    medicine_name: 'Amlodipine 5mg',
    dosage: '5mg',
    frequency: 'Once daily',
    duration: '14 Days'
  });

  const loadData = () => {
    setLoading(true);
    api.getPrescriptions()
      .then(res => {
        setPrescriptions(res.results || res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    api.getPatients().then(res => setPatients(res.results || res || [])).catch(() => {});
    api.getDoctors().then(res => setDoctors(res.results || res || [])).catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleIssue = (e) => {
    e.preventDefault();
    api.createPrescription({
      patient: form.patient,
      doctor: form.doctor,
      notes: form.notes
    }).then(res => {
      // Add medicine item
      api.apiFetch(`/prescriptions/${res.id}/add-item/`, {
        method: 'POST',
        body: JSON.stringify({
          medicine_name: form.medicine_name,
          dosage: form.dosage,
          frequency: form.frequency,
          duration: form.duration
        })
      }).then(() => {
        setIsModalOpen(false);
        loadData();
        alert('Prescription issued successfully!');
      });
    }).catch(err => alert(err.message));
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Prescription Management</h1>
          <p className="page-subtitle">Electronic prescriptions, medicine dosage, frequency & pharmacy status</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Issue New Prescription
        </button>
      </div>

      <div className="card table-container" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>RX ID</th>
              <th>Date</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Prescribed Medicines</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Loading prescriptions...</td></tr>
            ) : prescriptions.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No prescriptions found.</td></tr>
            ) : (
              prescriptions.map(p => (
                <tr key={p.id}>
                  <td><strong style={{ color: '#0f766e' }}>{p.prescription_id}</strong></td>
                  <td>{p.prescription_date}</td>
                  <td style={{ fontWeight: 700 }}>{p.patient_name}</td>
                  <td>Dr. {p.doctor_name}</td>
                  <td>
                    {(p.items || []).map((item, idx) => (
                      <div key={idx} style={{ fontSize: '0.85rem' }}>
                        • <strong>{item.medicine_name}</strong> ({item.dosage}) - {item.frequency} for {item.duration}
                      </div>
                    ))}
                  </td>
                  <td><span className="badge badge-success">{p.status}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Issue RX Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Issue New Prescription">
        <form onSubmit={handleIssue}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Patient *</label>
              <select className="form-control" required value={form.patient} onChange={e => setForm({ ...form, patient: e.target.value })}>
                <option value="">Select Patient</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.patient_id} - {p.first_name} {p.last_name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Doctor *</label>
              <select className="form-control" required value={form.doctor} onChange={e => setForm({ ...form, doctor: e.target.value })}>
                <option value="">Select Doctor</option>
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>Dr. {d.full_name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Medicine Name *</label>
            <input type="text" className="form-control" required value={form.medicine_name} onChange={e => setForm({ ...form, medicine_name: e.target.value })} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Dosage</label>
              <input type="text" className="form-control" value={form.dosage} onChange={e => setForm({ ...form, dosage: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Frequency</label>
              <input type="text" className="form-control" value={form.frequency} onChange={e => setForm({ ...form, frequency: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Duration</label>
              <input type="text" className="form-control" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
            </div>
          </div>

          <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Issue Prescription</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
