import React, { useState } from 'react';
import { postEnquiry } from '../services/api';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Bridal Makeup',
    preferred_date: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await postEnquiry(formData);
    setLoading(false);

    if (res.success) {
      setSuccessMsg('Thank you! Your enquiry has been received. We will contact you soon.');
      setFormData({
        name: '',
        phone: '',
        service: 'Bridal Makeup',
        preferred_date: '',
        message: '',
      });
    }
  };

  return (
    <section id="contact" style={{ padding: '5.5rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="subtitle-badge">
            <Sparkles size={14} />
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">
            Visit Our Studio or Send an Enquiry
          </h2>
          <p className="section-description">
            Have questions about customized stitching, Aari work estimates, or bridal makeup dates? Fill out the form or reach us directly.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '3.5rem',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left Studio Information */}
          <div>
            <div
              className="glass-card"
              style={{
                padding: '2.5rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary-deep)', marginBottom: '0.5rem' }}>
                  SINDU FASHION DESIGNER
                </h3>
                <p style={{ color: 'var(--primary-rose)', fontWeight: 600, fontSize: '0.95rem' }}>
                  Women's Fashion, Tailoring & Bridal Studio
                </p>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(216, 107, 129, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-rose)',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-deep)', margin: 0 }}>
                    Studio Location
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: 1.6 }}>
                    Maduravalli, Tittakudi Taluk,<br />
                    Cuddalore District, Tamil Nadu – 606106, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 55, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-hover)',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-deep)', margin: 0 }}>
                    Phone / Call Studio
                  </h4>
                  <a
                    href="tel:7200053243"
                    style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-rose)', display: 'inline-block', marginTop: '0.2rem' }}
                  >
                    7200053243
                  </a>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                    Available for Call & WhatsApp Consultation
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(74, 23, 40, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-deep)',
                    flexShrink: 0,
                  }}
                >
                  <Clock size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-deep)', margin: 0 }}>
                    Studio Timings
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '0.25rem', margin: 0 }}>
                    Monday - Sunday: 9:00 AM – 8:30 PM
                  </p>
                </div>
              </div>

              {/* Map Badge */}
              <div
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                }}
              >
                📍 Serving customers across Tittakudi, Cuddalore, Vriddhachalam, Pennadam & nearby Tamil Nadu regions.
              </div>
            </div>
          </div>

          {/* Right Interactive Form */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-soft)',
              border: '1px solid var(--border-color)',
            }}
          >
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary-deep)', marginBottom: '0.5rem' }}>
              Send an Online Enquiry
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
              We will review your requirements and respond promptly.
            </p>

            {successMsg ? (
              <div
                style={{
                  background: 'rgba(216, 107, 129, 0.1)',
                  border: '1px solid var(--primary-rose)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <CheckCircle2 size={48} color="var(--primary-rose)" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary-deep)' }}>
                  {successMsg}
                </h4>
                <button
                  onClick={() => setSuccessMsg('')}
                  className="btn-secondary"
                  style={{ marginTop: '1.5rem', fontSize: '0.88rem' }}
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-deep)', marginBottom: '0.4rem' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-deep)', marginBottom: '0.4rem' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Mobile number"
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.95rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-deep)', marginBottom: '0.4rem' }}>
                      Service Required *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.95rem',
                      }}
                    >
                      <option value="Bridal Makeup">Bridal Makeup</option>
                      <option value="Wedding Makeup">Wedding Makeup</option>
                      <option value="Engagement Makeup">Engagement Makeup</option>
                      <option value="Reception Makeup">Reception Makeup</option>
                      <option value="Fashion Designing">Fashion Designing</option>
                      <option value="Stitching & Tailoring">Stitching & Tailoring</option>
                      <option value="Aari Work Embroidery">Aari Work Embroidery</option>
                      <option value="Saree Draping & Hair">Saree Draping & Hair</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-deep)', marginBottom: '0.4rem' }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.95rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-deep)', marginBottom: '0.4rem' }}>
                    Message / Special Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mention any custom design ideas, saree types, or function details..."
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.95rem',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ justifyContent: 'center', width: '100%', padding: '0.9rem 2rem', marginTop: '0.5rem' }}
                >
                  <Send size={18} />
                  <span>{loading ? 'Sending REST API Payload...' : 'Send Enquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 850px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .form-row-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
