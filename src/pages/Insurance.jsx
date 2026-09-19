import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Modal } from '../components/Modal';
import { ShieldCheck, Plus, CheckCircle2, XCircle } from 'lucide-react';

export const Insurance = () => {
  const [claims, setClaims] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    patient: '',
    provider_name: 'BlueShield Health Insurance',
    policy_number: 'POL-991820',
    claim_number: 'CLM-88390',
    claim_amount: 950.00,
    status: 'Submitted',
    remarks: 'Pre-authorization attached.'
  });

  const loadData = () => {
    setLoading(true);
    api.getClaims()
      .then(res => {
        setClaims(res.results || res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    api.getPatients().then(res => setPatients(res.results || res || [])).catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    api.createClaim(form)
      .then(() => {
        setIsModalOpen(false);
        loadData();
        alert('Insurance claim submitted successfully!');
      })
      .catch(err => alert(err.message));
  };

  const handleUpdateStatus = (id, newStatus, approvedAmt) => {
    api.updateClaimStatus(id, newStatus, approvedAmt)
      .then(() => loadData())
      .catch(err => alert(err.message));
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Insurance Claims Management</h1>
          <p className="page-subtitle">Track policy verification, claim submissions & insurer reimbursement status</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Submit Insurance Claim
        </button>
      </div>

      <div className="card table-container" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Patient</th>
              <th>Provider</th>
              <th>Policy #</th>
              <th>Claim Amount</th>
              <th>Approved Amount</th>
              <th>Status</th>
              <th>Workflow Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>Loading insurance claims...</td></tr>
            ) : claims.length === 0 ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No claims found.</td></tr>
            ) : (
              claims.map(c => (
                <tr key={c.id}>
                  <td><strong style={{ color: '#0f766e' }}>{c.claim_id}</strong></td>
                  <td style={{ fontWeight: 700 }}>{c.patient_name}</td>
                  <td>{c.provider_name}</td>
                  <td><code>{c.policy_number}</code></td>
                  <td><strong>${parseFloat(c.claim_amount).toFixed(2)}</strong></td>
                  <td style={{ color: '#16a34a' }}>${parseFloat(c.approved_amount).toFixed(2)}</td>
                  <td>
                    <span className={`badge ${
                      c.status === 'Approved' ? 'badge-success' :
                      c.status === 'Submitted' || c.status === 'Under Review' ? 'badge-info' : 'badge-danger'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {c.status !== 'Approved' && (
                        <button onClick={() => handleUpdateStatus(c.id, 'Approved', c.claim_amount)} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}>
                          Approve
                        </button>
                      )}
                      {c.status !== 'Rejected' && (
                        <button onClick={() => handleUpdateStatus(c.id, 'Rejected', 0)} className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}>
                          Reject
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

      {/* New Claim Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Submit Insurance Claim">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Patient *</label>
            <select className="form-control" required value={form.patient} onChange={e => setForm({ ...form, patient: e.target.value })}>
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.patient_id} - {p.first_name} {p.last_name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Provider Name *</label>
              <input type="text" className="form-control" required value={form.provider_name} onChange={e => setForm({ ...form, provider_name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Policy Number *</label>
              <input type="text" className="form-control" required value={form.policy_number} onChange={e => setForm({ ...form, policy_number: e.target.value })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Claim Number</label>
              <input type="text" className="form-control" value={form.claim_number} onChange={e => setForm({ ...form, claim_number: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Claim Amount ($) *</label>
              <input type="number" step="0.01" className="form-control" required value={form.claim_amount} onChange={e => setForm({ ...form, claim_amount: e.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Remarks</label>
            <textarea className="form-control" rows="2" value={form.remarks} onChange={e => setForm({ ...form, remarks: e.target.value })} />
          </div>

          <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Claim</button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
