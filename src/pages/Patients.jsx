import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Modal } from '../components/Modal';
import { Search, UserPlus, Eye, Phone, Calendar, AlertCircle } from 'lucide-react';

export const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New patient registration form state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '1990-01-01',
    age: 36,
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    emergency_contact: '',
    blood_group: 'O+',
    allergies: 'None',
    medical_history: '',
    assigned_doctor: ''
  });

  const fetchPatients = (query = '') => {
    setLoading(true);
    api.getPatients(query)
      .then(res => {
        setPatients(res.results || res || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPatients();
    api.getDoctors().then(res => setDoctors(res.results || res || [])).catch(() => {});
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    fetchPatients(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    api.createPatient(formData)
      .then(() => {
        setIsModalOpen(false);
        fetchPatients();
        alert('Patient registered successfully!');
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Patient Management</h1>
          <p className="page-subtitle">Search, register, and manage patient records across departments</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <UserPlus size={18} /> Register New Patient
        </button>
      </div>

      {/* Search Bar */}
      <div className="card" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
          <input
            type="text"
            className="form-control"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search by Patient ID (e.g. PAT-2026-00101), Name, or Phone..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-container card" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Full Name</th>
              <th>Age / Gender</th>
              <th>Phone Number</th>
              <th>Blood Group</th>
              <th>Assigned Doctor</th>
              <th>Registered Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>Loading patient database...</td></tr>
            ) : patients.length === 0 ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No patient records found.</td></tr>
            ) : (
              patients.map(p => (
                <tr key={p.id}>
                  <td><strong style={{ color: '#0f766e' }}>{p.patient_id}</strong></td>
                  <td style={{ fontWeight: 700 }}>{p.first_name} {p.last_name}</td>
                  <td>{p.age} Yrs / {p.gender}</td>
                  <td>{p.phone}</td>
                  <td><span className="badge badge-info">{p.blood_group || 'N/A'}</span></td>
                  <td>{p.assigned_doctor_name || 'Unassigned'}</td>
                  <td>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/patients/${p.id}`} className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                      <Eye size={14} /> View Record
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Registration Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Patient">
        <form onSubmit={handleRegister}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input type="text" className="form-control" required value={formData.first_name} onChange={e => setFormData({ ...formData, first_name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input type="text" className="form-control" required value={formData.last_name} onChange={e => setFormData({ ...formData, last_name: e.target.value })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input type="date" className="form-control" value={formData.date_of_birth} onChange={e => setFormData({ ...formData, date_of_birth: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Age</label>
              <input type="number" className="form-control" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select className="form-control" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input type="text" className="form-control" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Emergency Contact</label>
              <input type="text" className="form-control" placeholder="Name & Phone" value={formData.emergency_contact} onChange={e => setFormData({ ...formData, emergency_contact: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select className="form-control" value={formData.blood_group} onChange={e => setFormData({ ...formData, blood_group: e.target.value })}>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Known Allergies</label>
            <input type="text" className="form-control" placeholder="e.g. Penicillin, Peanuts" value={formData.allergies} onChange={e => setFormData({ ...formData, allergies: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Assign Primary Doctor</label>
            <select className="form-control" value={formData.assigned_doctor} onChange={e => setFormData({ ...formData, assigned_doctor: e.target.value })}>
              <option value="">Select Doctor</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>Dr. {d.full_name} ({d.specialization})</option>
              ))}
            </select>
          </div>

          <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Register Patient</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
