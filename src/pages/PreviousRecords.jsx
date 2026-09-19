import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { History, Search, Calendar, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PreviousRecords = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchRecords = (query = '') => {
    setLoading(true);
    api.getPatients(query)
      .then(res => {
        setPatients(res.results || res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Previous Patient Records Archive</h1>
          <p className="page-subtitle">Search historical medical encounters, prior visits & archived EMR records</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
          <input
            type="text"
            className="form-control"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search archive by Patient ID, Name, or Phone..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); fetchRecords(e.target.value); }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="#64748b" />
          <select className="form-control" value={dateFilter} onChange={e => setDateFilter(e.target.value)} style={{ width: '160px' }}>
            <option value="All">All Time</option>
            <option value="Today">Today</option>
            <option value="7Days">Last 7 Days</option>
            <option value="30Days">Last Month</option>
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="card table-container" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Gender / Age</th>
              <th>Contact Phone</th>
              <th>Primary Doctor</th>
              <th>Registered Date</th>
              <th>Historical Record</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Searching archive...</td></tr>
            ) : patients.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No matching previous records found.</td></tr>
            ) : (
              patients.map(p => (
                <tr key={p.id}>
                  <td><strong style={{ color: '#0f766e' }}>{p.patient_id}</strong></td>
                  <td style={{ fontWeight: 700 }}>{p.first_name} {p.last_name}</td>
                  <td>{p.gender} ({p.age} Yrs)</td>
                  <td>{p.phone}</td>
                  <td>Dr. {p.assigned_doctor_name || 'General Practitioner'}</td>
                  <td>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/patients/${p.id}`} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                      Inspect Full Profile
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
