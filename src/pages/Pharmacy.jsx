import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Modal } from '../components/Modal';
import { Pill, Plus, AlertTriangle, CheckCircle, PackageCheck } from 'lucide-react';

export const Pharmacy = () => {
  const [medicines, setMedicines] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDispenseModalOpen, setIsDispenseModalOpen] = useState(false);
  const [selectedMed, setSelectedMed] = useState(null);

  // Add Medicine Form
  const [medForm, setMedForm] = useState({
    name: '',
    category: 'General Tablet',
    batch_number: 'B2026-099',
    stock_quantity: 100,
    min_stock_alert: 20,
    unit_price: 15.00,
    expiry_date: '2027-12-31',
    manufacturer: 'PharmaCorp'
  });

  // Dispense Form
  const [dispenseForm, setDispenseForm] = useState({
    patient_id: '',
    quantity: 1
  });

  const loadData = () => {
    setLoading(true);
    api.getMedicines()
      .then(res => {
        setMedicines(res.results || res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    api.getPatients().then(res => setPatients(res.results || res || [])).catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddMedicine = (e) => {
    e.preventDefault();
    api.createMedicine(medForm)
      .then(() => {
        setIsAddModalOpen(false);
        loadData();
        alert('Medicine added to inventory!');
      })
      .catch(err => alert(err.message));
  };

  const handleDispense = (e) => {
    e.preventDefault();
    if (!selectedMed) return;

    api.dispenseMedicine(selectedMed.id, dispenseForm)
      .then(() => {
        setIsDispenseModalOpen(false);
        loadData();
        alert(`Dispensed ${dispenseForm.quantity} x ${selectedMed.name} successfully! Inventory updated.`);
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Pharmacy Management</h1>
          <p className="page-subtitle">Medicine inventory, batch tracking, stock alerts & dispensing</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Add Medicine to Stock
        </button>
      </div>

      <div className="card table-container" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Medicine ID</th>
              <th>Name & Category</th>
              <th>Batch #</th>
              <th>Stock Quantity</th>
              <th>Unit Price ($)</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>Loading pharmacy stock...</td></tr>
            ) : medicines.length === 0 ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No medicines found.</td></tr>
            ) : (
              medicines.map(m => (
                <tr key={m.id}>
                  <td><strong style={{ color: '#0f766e' }}>{m.medicine_id}</strong></td>
                  <td style={{ fontWeight: 700 }}>{m.name} <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>({m.category})</span></td>
                  <td><code>{m.batch_number}</code></td>
                  <td><strong>{m.stock_quantity} Units</strong></td>
                  <td>${parseFloat(m.unit_price).toFixed(2)}</td>
                  <td>{m.expiry_date}</td>
                  <td>
                    <span className={`badge ${
                      m.status === 'In Stock' ? 'badge-success' :
                      m.status === 'Low Stock' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => { setSelectedMed(m); setIsDispenseModalOpen(true); }}
                      className="btn btn-secondary"
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                      disabled={m.stock_quantity <= 0}
                    >
                      <PackageCheck size={14} /> Dispense
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Medicine Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Medicine to Inventory">
        <form onSubmit={handleAddMedicine}>
          <div className="form-group">
            <label className="form-label">Medicine Name *</label>
            <input type="text" className="form-control" required value={medForm.name} onChange={e => setMedForm({ ...medForm, name: e.target.value })} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input type="text" className="form-control" value={medForm.category} onChange={e => setMedForm({ ...medForm, category: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Batch Number *</label>
              <input type="text" className="form-control" required value={medForm.batch_number} onChange={e => setMedForm({ ...medForm, batch_number: e.target.value })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Stock Quantity</label>
              <input type="number" className="form-control" value={medForm.stock_quantity} onChange={e => setMedForm({ ...medForm, stock_quantity: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Min Stock Alert</label>
              <input type="number" className="form-control" value={medForm.min_stock_alert} onChange={e => setMedForm({ ...medForm, min_stock_alert: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Unit Price ($)</label>
              <input type="number" step="0.01" className="form-control" value={medForm.unit_price} onChange={e => setMedForm({ ...medForm, unit_price: e.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Expiry Date *</label>
            <input type="date" className="form-control" required value={medForm.expiry_date} onChange={e => setMedForm({ ...medForm, expiry_date: e.target.value })} />
          </div>

          <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Save to Stock</button>
          </div>
        </form>
      </Modal>

      {/* Dispense Modal */}
      <Modal isOpen={isDispenseModalOpen} onClose={() => setIsDispenseModalOpen(false)} title={`Dispense Medicine: ${selectedMed?.name}`}>
        <form onSubmit={handleDispense}>
          <div className="form-group">
            <label className="form-label">Patient *</label>
            <select className="form-control" required value={dispenseForm.patient_id} onChange={e => setDispenseForm({ ...dispenseForm, patient_id: e.target.value })}>
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.patient_id} - {p.first_name} {p.last_name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Quantity to Dispense (Available: {selectedMed?.stock_quantity})</label>
            <input type="number" className="form-control" min="1" max={selectedMed?.stock_quantity} value={dispenseForm.quantity} onChange={e => setDispenseForm({ ...dispenseForm, quantity: e.target.value })} />
          </div>

          <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
            <button type="button" onClick={() => setIsDispenseModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Confirm Dispensing</button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
