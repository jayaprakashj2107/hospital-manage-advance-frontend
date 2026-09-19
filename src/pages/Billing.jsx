import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Modal } from '../components/Modal';
import { PrintableReceipt } from '../components/PrintableReceipt';
import { CreditCard, Plus, Printer, DollarSign, CheckCircle2 } from 'lucide-react';

export const Billing = () => {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [receiptBill, setReceiptBill] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);

  // New Bill Form
  const [billForm, setBillForm] = useState({
    patient: '',
    doctor: '',
    consultation_charge: 500.00,
    laboratory_charge: 150.00,
    pharmacy_charge: 45.00,
    other_charge: 0.00,
    discount: 25.00,
    tax_percent: 5.00,
    paid_amount: 0.00
  });

  // Payment Form
  const [paymentForm, setPaymentForm] = useState({
    amount: 0.00,
    payment_method: 'Card',
    transaction_id: 'TXN-' + Math.floor(100000 + Math.random() * 900000)
  });

  const loadData = () => {
    setLoading(true);
    api.getBills()
      .then(res => {
        setBills(res.results || res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    api.getPatients().then(res => setPatients(res.results || res || [])).catch(() => {});
    api.getDoctors().then(res => setDoctors(res.results || res || [])).catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleGenerateBill = (e) => {
    e.preventDefault();
    api.createBill(billForm)
      .then(() => {
        setIsBillModalOpen(false);
        loadData();
        alert('Patient bill generated with calculated totals!');
      })
      .catch(err => alert(err.message));
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!selectedBill) return;

    api.addPayment(selectedBill.id, paymentForm)
      .then(() => {
        setIsPaymentModalOpen(false);
        loadData();
        alert('Payment recorded successfully!');
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Billing & Payments</h1>
          <p className="page-subtitle">Patient bill generation, itemized charges, payments & printable receipts</p>
        </div>
        <button onClick={() => setIsBillModalOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Generate Patient Bill
        </button>
      </div>

      <div className="card table-container" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Bill #</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Total Amount</th>
              <th>Paid Amount</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>Loading billing records...</td></tr>
            ) : bills.length === 0 ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No bills found.</td></tr>
            ) : (
              bills.map(b => (
                <tr key={b.id}>
                  <td><strong style={{ color: '#0f766e' }}>{b.bill_number}</strong></td>
                  <td style={{ fontWeight: 700 }}>{b.patient_name} ({b.patient_id_num})</td>
                  <td>Dr. {b.doctor_name || 'Hospital'}</td>
                  <td><strong>${parseFloat(b.total_amount).toFixed(2)}</strong></td>
                  <td style={{ color: '#16a34a' }}>${parseFloat(b.paid_amount).toFixed(2)}</td>
                  <td style={{ color: b.balance > 0 ? '#dc2626' : '#16a34a', fontWeight: 700 }}>${parseFloat(b.balance).toFixed(2)}</td>
                  <td>
                    <span className={`badge ${
                      b.payment_status === 'Paid' ? 'badge-success' :
                      b.payment_status === 'Partially Paid' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {b.payment_status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {b.balance > 0 && (
                        <button 
                          onClick={() => { setSelectedBill(b); setPaymentForm({ ...paymentForm, amount: b.balance }); setIsPaymentModalOpen(true); }} 
                          className="btn btn-secondary" 
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                        >
                          Record Payment
                        </button>
                      )}
                      <button 
                        onClick={() => setReceiptBill(b)} 
                        className="btn btn-secondary" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                      >
                        <Printer size={12} /> Receipt
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Generate Bill Modal */}
      <Modal isOpen={isBillModalOpen} onClose={() => setIsBillModalOpen(false)} title="Generate Patient Bill">
        <form onSubmit={handleGenerateBill}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Patient *</label>
              <select className="form-control" required value={billForm.patient} onChange={e => setBillForm({ ...billForm, patient: e.target.value })}>
                <option value="">Select Patient</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.patient_id} - {p.first_name} {p.last_name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Doctor</label>
              <select className="form-control" value={billForm.doctor} onChange={e => setBillForm({ ...billForm, doctor: e.target.value })}>
                <option value="">Select Doctor</option>
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>Dr. {d.full_name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Consultation Fee ($)</label>
              <input type="number" step="0.01" className="form-control" value={billForm.consultation_charge} onChange={e => setBillForm({ ...billForm, consultation_charge: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Lab Charges ($)</label>
              <input type="number" step="0.01" className="form-control" value={billForm.laboratory_charge} onChange={e => setBillForm({ ...billForm, laboratory_charge: e.target.value })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Pharmacy Charges ($)</label>
              <input type="number" step="0.01" className="form-control" value={billForm.pharmacy_charge} onChange={e => setBillForm({ ...billForm, pharmacy_charge: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Other Charges ($)</label>
              <input type="number" step="0.01" className="form-control" value={billForm.other_charge} onChange={e => setBillForm({ ...billForm, other_charge: e.target.value })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Discount ($)</label>
              <input type="number" step="0.01" className="form-control" value={billForm.discount} onChange={e => setBillForm({ ...billForm, discount: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Tax Rate (%)</label>
              <input type="number" step="0.1" className="form-control" value={billForm.tax_percent} onChange={e => setBillForm({ ...billForm, tax_percent: e.target.value })} />
            </div>
          </div>

          <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
            <button type="button" onClick={() => setIsBillModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Generate Bill & Calculate</button>
          </div>
        </form>
      </Modal>

      {/* Record Payment Modal */}
      <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} title={`Record Payment for ${selectedBill?.bill_number}`}>
        <form onSubmit={handleAddPayment}>
          <div className="form-group">
            <label className="form-label">Payment Amount ($) *</label>
            <input type="number" step="0.01" className="form-control" required value={paymentForm.amount} onChange={e => setPaymentForm({ ...paymentForm, amount: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Payment Method</label>
            <select className="form-control" value={paymentForm.payment_method} onChange={e => setPaymentForm({ ...paymentForm, payment_method: e.target.value })}>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Online Payment">Online Payment</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Transaction ID / Reference</label>
            <input type="text" className="form-control" value={paymentForm.transaction_id} onChange={e => setPaymentForm({ ...paymentForm, transaction_id: e.target.value })} />
          </div>

          <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
            <button type="button" onClick={() => setIsPaymentModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Confirm Payment</button>
          </div>
        </form>
      </Modal>

      {/* Receipt Modal */}
      {receiptBill && (
        <Modal isOpen={true} onClose={() => setReceiptBill(null)} title="Printable Patient Receipt">
          <PrintableReceipt bill={receiptBill} onClose={() => setReceiptBill(null)} />
        </Modal>
      )}

    </div>
  );
};
