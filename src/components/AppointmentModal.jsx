import React, { useState, useEffect } from 'react';
import { postAppointment } from '../services/api';
import { X, Calendar, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

const AppointmentModal = ({ isOpen, onClose, selectedService = '' }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    service: selectedService || 'Bridal Makeup',
    appointment_date: '',
    appointment_time: 'Morning (9:00 AM - 12:00 PM)',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await postAppointment(formData);
    setLoading(false);

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({
          customer_name: '',
          phone: '',
          service: 'Bridal Makeup',
          appointment_date: '',
          appointment_time: 'Morning (9:00 AM - 12:00 PM)',
          message: '',
        });
      }, 2500);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          padding: '2.5rem',
          maxWidth: '560px',
          width: '92%',
          boxShadow: '0 25px 50px rgba(0,0,0,0.35)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            color: 'var(--text-muted)',
          }}
        >
          <X size={24} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
            <CheckCircle2 size={56} color="var(--primary-rose)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary-deep)' }}>
              Appointment Requested Successfully!
            </h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: 1.6 }}>
              Thank you, <strong>{formData.customer_name}</strong>! Your appointment request has been saved to the database. We will call you shortly on <strong>{formData.phone}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <Sparkles size={20} color="var(--gold-accent)" />
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary-deep)', margin: 0 }}>
                Book an Appointment
              </h3>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
              Select your service & date for boutique consultation in Maduravalli.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-deep)', marginBottom: '0.4rem' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  placeholder="Enter your name"
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
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit mobile number"
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
                  Select Service *
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
                  <option value="Blouse Stitching">Blouse Stitching</option>
                  <option value="Churidar Stitching">Churidar Stitching</option>
                  <option value="Aari Work Embroidery">Aari Work Embroidery</option>
                  <option value="Saree Draping & Hair">Saree Draping & Hair</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-deep)', marginBottom: '0.4rem' }}>
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.appointment_date}
                    onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
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
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.appointment_time}
                    onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.95rem',
                    }}
                  >
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 8:30 PM)">Evening (4:00 PM - 8:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-deep)', marginBottom: '0.4rem' }}>
                  Notes / Outfit Details
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention function date, outfit details or specific requests..."
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
                className="btn-gold"
                style={{ justifyContent: 'center', width: '100%', padding: '0.9rem 2rem', marginTop: '0.5rem' }}
              >
                <Calendar size={18} />
                <span>{loading ? 'Submitting to Database...' : 'Confirm Appointment'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;
