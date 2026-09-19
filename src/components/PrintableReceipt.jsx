import React from 'react';
import { Printer, CheckCircle2 } from 'lucide-react';

export const PrintableReceipt = ({ bill, onClose }) => {
  if (!bill) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px' }}>
      <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button onClick={handlePrint} className="btn btn-primary">
          <Printer size={16} /> Print Receipt
        </button>
        <button onClick={onClose} className="btn btn-secondary">Close</button>
      </div>

      <div className="printable-area" style={{ border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '8px', background: 'white' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0f766e', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f766e' }}>ApexHealth Medical Center</h2>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>100 Healthcare Parkway, Medical District, NY 10001</p>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Phone: +1 800-555-APEX | Email: billing@apexhealth.org</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
              <CheckCircle2 size={14} style={{ marginRight: '4px' }} /> {bill.payment_status}
            </span>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginTop: '0.5rem' }}>Receipt #: {bill.bill_number}</p>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Date: {new Date(bill.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Patient Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Billed To:</span>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{bill.patient_name}</h4>
            <p style={{ fontSize: '0.85rem', color: '#475569' }}>Patient ID: {bill.patient_id_num}</p>
            <p style={{ fontSize: '0.85rem', color: '#475569' }}>Phone: {bill.patient_phone}</p>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Attending Physician:</span>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{bill.doctor_name || 'Hospital Services'}</h4>
          </div>
        </div>

        {/* Itemized Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem' }}>Service Description</th>
              <th style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.8rem' }}>Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>Doctor Consultation Fee</td>
              <td style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.875rem' }}>${parseFloat(bill.consultation_charge).toFixed(2)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>Laboratory Charges</td>
              <td style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.875rem' }}>${parseFloat(bill.laboratory_charge).toFixed(2)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>Pharmacy & Medication Charges</td>
              <td style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.875rem' }}>${parseFloat(bill.pharmacy_charge).toFixed(2)}</td>
            </tr>
            {parseFloat(bill.other_charge) > 0 && (
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>Other Authorized Hospital Services</td>
                <td style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.875rem' }}>${parseFloat(bill.other_charge).toFixed(2)}</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
          <div style={{ width: '280px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.85rem' }}>
              <span>Subtotal:</span>
              <strong>${parseFloat(bill.subtotal).toFixed(2)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.85rem', color: '#16a34a' }}>
              <span>Discount:</span>
              <span>-${parseFloat(bill.discount).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.85rem' }}>
              <span>Tax ({bill.tax_percent}%):</span>
              <span>+${parseFloat(bill.tax_amount).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #0f172a', padding: '0.6rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
              <span>Total Amount:</span>
              <span>${parseFloat(bill.total_amount).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.85rem', color: '#0284c7' }}>
              <span>Paid Amount:</span>
              <strong>${parseFloat(bill.paid_amount).toFixed(2)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.9rem', fontWeight: 700, color: bill.balance > 0 ? '#dc2626' : '#16a34a' }}>
              <span>Balance Remaining:</span>
              <span>${parseFloat(bill.balance).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
          Thank you for choosing ApexHealth Medical Center. This is an official computer-generated receipt.
        </div>
      </div>
    </div>
  );
};
