import React from 'react';
import { Settings as SettingsIcon, Database, ShieldCheck, Lock, HardDrive, KeyRound } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Hospital System Settings & Security</h1>
          <p className="page-subtitle">Database backup strategy, security controls & role-based permissions matrix</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Database Backup Strategy */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#0f766e' }}>
            <Database size={22} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Database Backup Strategy</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>
            To safeguard electronic health records (EHR) and maintain compliance, the system implements automated database backup policies:
          </p>

          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>Automated Cron Backups:</strong> Daily automated snapshots at 02:00 UTC using Django database dump commands.</li>
            <li><strong>Retention Policy:</strong> Daily backups retained for 30 days, monthly backups archived for 7 years.</li>
            <li><strong>Encrypted Offsite Storage:</strong> Backup snapshots encrypted via AES-256 before upload to private bucket.</li>
            <li><strong>Disaster Recovery Testing:</strong> Bi-monthly restore dry-runs to verify database transaction integrity.</li>
          </ul>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem', marginTop: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
            <strong>Manual Backup Command:</strong><br />
            <code>python manage.py dumpdata --natural-foreign --exclude=contenttypes &gt; backup_snapshot.json</code>
          </div>
        </div>

        {/* Security & Regulatory Compliance */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#0284c7' }}>
            <ShieldCheck size={22} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Security & Privacy Checklist</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
            <CheckItem title="Role-Based Access Control (RBAC)" status="Enforced on Server & Client" />
            <CheckItem title="Password Hashing" status="PBKDF2 SHA256 Algorithm" />
            <CheckItem title="JWT Token Security" status="Bearer Authentication & 24h Rotation" />
            <CheckItem title="Audit Logging" status="Server-side log on clinical & billing edits" />
            <CheckItem title="SQL Injection Protection" status="Django Parameterized ORM Queries" />
            <CheckItem title="XSS & CSRF Protection" status="Standardized Headers & Escaping" />
          </div>
        </div>

      </div>
    </div>
  );
};

const CheckItem = ({ title, status }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
    <span style={{ fontWeight: 600, color: '#0f172a' }}>{title}</span>
    <span className="badge badge-success">{status}</span>
  </div>
);
