import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Modal } from '../components/Modal';
import { FlaskConical, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

export const Laboratory = () => {
  const [labTests, setLabTests] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const [selectedTest, setSelectedTest] = useState(null);

  // New Lab Test Form
  const [testForm, setTestForm] = useState({
    patient: '',
    doctor: '',
    test_name: 'Complete Blood Count (CBC)',
    department: 'Hematology',
    status: 'Requested'
  });

  // Result Entry Form
  const [resultForm, setResultForm] = useState({
    result_value: 'WBC: 6.5, RBC: 4.8, Hemoglobin: 14.2 g/dL',
    normal_range: '12.0 - 16.0 g/dL',
    unit: 'g/dL',
    unit_status: 'Normal',
    notes: 'Sample verified by laboratory staff.'
  });

  const loadData = () => {
    setLoading(true);
    api.getLabTests()
      .then(res => {
        setLabTests(res.results || res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    api.getPatients().then(res => setPatients(res.results || res || [])).catch(() => {});
    api.getDoctors().then(res => setDoctors(res.results || res || [])).catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOrderTest = (e) => {
    e.preventDefault();
    api.createLabTest(testForm)
      .then(() => {
        setIsTestModalOpen(false);
        loadData();
        alert('Lab test request submitted!');
      })
      .catch(err => alert(err.message));
  };

  const handleRecordResult = (e) => {
    e.preventDefault();
    if (!selectedTest) return;

    api.recordLabResult(selectedTest.id, resultForm)
      .then(() => {
        setIsResultModalOpen(false);
        loadData();
        alert('Laboratory result saved & verified!');
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Laboratory Management</h1>
          <p className="page-subtitle">Diagnostic test orders, sample collection, test processing & result entry</p>
        </div>
        <button onClick={() => setIsTestModalOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Order Lab Test
        </button>
      </div>

      <div className="card table-container" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Test ID</th>
              <th>Test Name</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Result Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>Loading lab tests...</td></tr>
            ) : labTests.length === 0 ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No lab test orders found.</td></tr>
            ) : (
              labTests.map(t => (
                <tr key={t.id}>
                  <td><strong style={{ color: '#0f766e' }}>{t.test_id}</strong></td>
                  <td style={{ fontWeight: 700 }}>{t.test_name}</td>
                  <td>{t.patient_name} ({t.patient_id_num})</td>
                  <td>Dr. {t.doctor_name || 'N/A'}</td>
                  <td>{t.department}</td>
                  <td>
                    <span className={`badge ${
                      t.status === 'Completed' ? 'badge-success' :
                      t.status === 'Processing' ? 'badge-warning' : 'badge-info'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td>{t.result ? t.result.result_value : <em style={{ color: '#94a3b8' }}>Pending Result</em>}</td>
                  <td>
                    {t.status !== 'Completed' ? (
                      <button 
                        onClick={() => { setSelectedTest(t); setIsResultModalOpen(true); }}
                        className="btn btn-secondary" 
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                      >
                        Enter Result
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>Verified</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Test Modal */}
      <Modal isOpen={isTestModalOpen} onClose={() => setIsTestModalOpen(false)} title="Order New Laboratory Test">
        <form onSubmit={handleOrderTest}>
          <div className="form-group">
            <label className="form-label">Patient *</label>
            <select className="form-control" required value={testForm.patient} onChange={e => setTestForm({ ...testForm, patient: e.target.value })}>
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.patient_id} - {p.first_name} {p.last_name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Ordering Doctor</label>
            <select className="form-control" value={testForm.doctor} onChange={e => setTestForm({ ...testForm, doctor: e.target.value })}>
              <option value="">Select Doctor</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>Dr. {d.full_name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Test Name *</label>
            <input type="text" className="form-control" required value={testForm.test_name} onChange={e => setTestForm({ ...testForm, test_name: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Department</label>
            <input type="text" className="form-control" value={testForm.department} onChange={e => setTestForm({ ...testForm, department: e.target.value })} />
          </div>

          <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
            <button type="button" onClick={() => setIsTestModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Test Request</button>
          </div>
        </form>
      </Modal>

      {/* Record Result Modal */}
      <Modal isOpen={isResultModalOpen} onClose={() => setIsResultModalOpen(false)} title={`Enter Result for ${selectedTest?.test_id}`}>
        <form onSubmit={handleRecordResult}>
          <div className="form-group">
            <label className="form-label">Result Value *</label>
            <textarea className="form-control" rows="2" required value={resultForm.result_value} onChange={e => setResultForm({ ...resultForm, result_value: e.target.value })} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Normal Range</label>
              <input type="text" className="form-control" value={resultForm.normal_range} onChange={e => setResultForm({ ...resultForm, normal_range: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Status Flag</label>
              <select className="form-control" value={resultForm.unit_status} onChange={e => setResultForm({ ...resultForm, unit_status: e.target.value })}>
                <option value="Normal">Normal</option>
                <option value="Abnormal">Abnormal</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
            <button type="button" onClick={() => setIsResultModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Save & Complete Test</button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
