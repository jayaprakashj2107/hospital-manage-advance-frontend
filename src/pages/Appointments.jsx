import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Modal } from '../components/Modal';
import { Calendar as CalendarIcon, Clock, User, CheckCircle, XCircle, AlertTriangle, Plus } from 'lucide-react';

export const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    patient: '',
    doctor: '',
    appointment_date: new Date().toISOString().split('T')[0],
    appointment_time: '10:00:00',
    appointment_type: 'Routine Checkup',
    reason: '',
    status: 'Scheduled'
  });

  const loadData = () => {
    setLoading(true);
    api.getAppointments()
      .then(res => {
        setAppointments(res.results || res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    api.getPatients().then(res => setPatients(res.results || res || [])).catch(() => {});
    api.getDoctors().then(res => setDoctors(res.results || res || [])).catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSchedule = (e) => {
    e.preventDefault();
    api.createAppointment(form)
      .then(() => {
        setIsModalOpen(false);
        loadData();
        alert('Appointment scheduled successfully!');
      })
      .catch(err => {
        alert(err.message || 'Scheduling Conflict: Doctor already has an appointment at this exact date & time.');
      });
  };

  const handleStatusUpdate = (id, newStatus) => {
    api.updateAppointmentStatus(id, newStatus)
      .then(() => loadData())
      .catch(err => alert(err.message));
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Appointment Management</h1>
          <p className="page-subtitle">Schedule, update status, and prevent doctor booking conflicts</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Schedule Appointment
        </button>
      </div>

      <div className="card table-container" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Appt ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Type</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>Loading appointments...</td></tr>
            ) : appointments.length === 0 ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No appointments scheduled.</td></tr>
            ) : (
              appointments.map(a => (
                <tr key={a.id}>
                  <td><strong style={{ color: '#0f766e' }}>{a.appointment_id}</strong></td>
                  <td style={{ fontWeight: 700 }}>{a.patient_name}</td>
                  <td>Dr. {a.doctor_name}</td>
                  <td>{a.appointment_date} at {a.appointment_time}</td>
                  <td><span className="badge badge-secondary">{a.appointment_type}</span></td>
                  <td>{a.reason || 'General Visit'}</td>
                  <td>
                    <span className={`badge ${
                      a.status === 'Completed' ? 'badge-success' :
                      a.status === 'Confirmed' ? 'badge-info' :
                      a.status === 'Cancelled' ? 'badge-danger' : 'badge-warning'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {a.status !== 'Completed' && (
                        <button onClick={() => handleStatusUpdate(a.id, 'Completed')} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}>
                          Mark Done
                        </button>
                      )}
                      {a.status !== 'Cancelled' && (
                        <button onClick={() => handleStatusUpdate(a.id, 'Cancelled')} className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Schedule Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule New Appointment">
        <form onSubmit={handleSchedule}>
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
                <option key={d.id} value={d.id}>Dr. {d.full_name} ({d.specialization})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Date *</label>
              <input type="date" className="form-control" required value={form.appointment_date} onChange={e => setForm({ ...form, appointment_date: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Time *</label>
              <input type="time" className="form-control" required value={form.appointment_time} onChange={e => setForm({ ...form, appointment_time: e.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Appointment Type</label>
            <select className="form-control" value={form.appointment_type} onChange={e => setForm({ ...form, appointment_type: e.target.value })}>
              <option value="Routine Checkup">Routine Checkup</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Emergency">Emergency</option>
              <option value="Specialist Consultation">Specialist Consultation</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Reason / Notes</label>
            <textarea className="form-control" rows="2" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder="Chief symptoms or reason for appointment" />
          </div>

          <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Schedule Appointment</button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
