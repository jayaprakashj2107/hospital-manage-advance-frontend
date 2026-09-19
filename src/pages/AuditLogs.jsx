import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Shield, Clock, User, HardDrive } from 'lucide-react';

export const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAuditLogs()
      .then(res => {
        setLogs(res.results || res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">System Audit Logs & Security History</h1>
          <p className="page-subtitle">Immutable audit trail of user actions, clinical updates & data modifications</p>
        </div>
      </div>

      <div className="card table-container" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Role</th>
              <th>Action Description</th>
              <th>Module</th>
              <th>Record ID</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Loading audit logs...</td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No audit log entries recorded.</td></tr>
            ) : (
              logs.map(log => (
                <tr key={log.id}>
                  <td><span style={{ fontSize: '0.8rem', color: '#64748b' }}>{new Date(log.timestamp).toLocaleString()}</span></td>
                  <td><strong>{log.username}</strong></td>
                  <td><span className="badge badge-info">{log.role}</span></td>
                  <td style={{ fontWeight: 600 }}>{log.action}</td>
                  <td><code>{log.module}</code></td>
                  <td>{log.record_id || 'N/A'}</td>
                  <td style={{ fontSize: '0.8rem', color: '#475569' }}>{log.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
