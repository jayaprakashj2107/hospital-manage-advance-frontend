import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Modal } from '../components/Modal';
import { FileText, Plus, User, Stethoscope, Clock, ShieldCheck } from 'lucide-react';

export const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    patient: '',
    doctor: '',
    visit_date: new Date().toISOString().split('T')[0],
    chief_complaint: '',
    symptoms: '',
    diagnosis: '',
    clinical_notes: '',
    treatment_plan: '',
    follow_up_date: ''
  });

  const loadData = () => {
    setLoading(true);
    api.getMedicalRecords()
      .then(res => {
        setRecords(res.results || res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    api.getPatients().then(res => setPatients(res.results || res || [])).catch(() => {});
    api.getDoctors().then(res => setDoctors(res.results || res || [])).catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    api.createMedicalRecord(form)
      .then(() => {
        setIsModalOpen(false);
        loadData();
        alert('EMR Clinical record saved!');
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Electronic Medical Records (EMR)</h1>
          <p className="page-subtitle">Patient clinical notes, diagnoses, treatment plans & visit history</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Record New EMR Diagnosis
        </button>
      </div>

      <div className="card table-container" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Record ID</th>
              <th>Visit Date</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Diagnosis</th>
              <th>Chief Complaint</th>
              <th>Treatment Plan</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>Loading EMR records...</td></tr>
            ) : records.length === 0 ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No EMR diagnoses recorded.</td></tr>
            ) : (
              records.map(r => (
                <tr key={r.id}>
                  <td><strong style={{ color: '#0f766e' }}>{r.record_id}</strong></td>
                  <td>{r.visit_date}</td>
                  <td style={{ fontWeight: 700 }}>{r.patient_name} ({r.patient_id_num})</td>
                  <td>Dr. {r.doctor_name}</td>
                  <td><span className="badge badge-info">{r.diagnosis}</span></td>
                  <td>{r.chief_complaint}</td>
                  <td>{r.treatment_plan || 'N/A'}</td>
                  <td><span className="badge badge-secondary">v{r.version}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* New EMR Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Patient Diagnosis & EMR">
        <form onSubmit={handleCreate}>
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
              <label className="form-label">Attending Doctor *</label>
              <select className="form-control" required value={form.doctor} onChange={e => setForm({ ...form, doctor: e.target.value })}>
                <option value="">Select Doctor</option>
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>Dr. {d.full_name} ({d.specialization})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Chief Complaint *</label>
            <input type="text" className="form-control" required placeholder="e.g. Severe headache, persistent cough" value={form.chief_complaint} onChange={e => setForm({ ...form, chief_complaint: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Symptoms</label>
            <input type="text" className="form-control" placeholder="Observed symptoms" value={form.symptoms} onChange={e => setForm({ ...form, symptoms: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Diagnosis *</label>
            <input type="text" className="form-control" required placeholder="Clinical diagnosis" value={form.diagnosis} onChange={e => setForm({ ...form, diagnosis: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Clinical Notes</label>
            <textarea className="form-control" rows="2" placeholder="Examination details & doctor observations" value={form.clinical_notes} onChange={e => setForm({ ...form, clinical_notes: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Treatment Plan</label>
            <textarea className="form-control" rows="2" placeholder="Recommended medications, rest, or lifestyle adjustments" value={form.treatment_plan} onChange={e => setForm({ ...form, treatment_plan: e.target.value })} />
          </div>

          <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Save EMR Diagnosis Record</button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
