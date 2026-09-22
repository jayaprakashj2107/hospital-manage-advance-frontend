import React from 'react';
import { Phone, MessageCircle, Calendar, Sparkles } from 'lucide-react';

const FloatingButtons = ({ onOpenAppointment }) => {
  return (
    <>
      {/* Floating Action Container */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 990,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'flex-end',
        }}
      >
        {/* WhatsApp Chat Floating Button */}
        <a
          href="https://wa.me/917200053243?text=Hello%20Sindu%20Fashion%20Designer,%20I%20want%20to%20enquire%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp (7200053243)"
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: '#25D366',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <MessageCircle size={28} />
        </a>

        {/* Direct Call Floating Button */}
        <a
          href="tel:7200053243"
          title="Direct Call 7200053243"
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary-rose) 0%, var(--primary-dark-rose) 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(216, 107, 129, 0.4)',
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Phone size={26} />
        </a>

        {/* Quick Book Floating Pill */}
        <button
          onClick={onOpenAppointment}
          className="animate-pulse-glow"
          style={{
            background: 'linear-gradient(135deg, var(--gold-accent) 0%, var(--gold-hover) 100%)',
            color: 'var(--primary-deep)',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            fontWeight: 800,
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: 'var(--shadow-gold)',
            border: '1px solid #FFFFFF',
          }}
        >
          <Sparkles size={16} />
          <span>Book Studio</span>
        </button>
      </div>

      {/* Sticky Bottom Bar for Mobile Touch Devices */}
      <div
        className="mobile-sticky-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(54, 23, 34, 0.96)',
          backdropFilter: 'blur(12px)',
          padding: '0.75rem 1.25rem',
          zIndex: 980,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--gold-accent)',
        }}
      >
        <div style={{ color: '#FFFFFF' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0, color: 'var(--gold-accent)' }}>
            SINDU FASHION DESIGNER
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
            Call: 7200053243 • Maduravalli
          </p>
        </div>

        <button
          onClick={onOpenAppointment}
          className="btn-gold"
          style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
        >
          <Calendar size={14} />
          <span>Book Now</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .mobile-sticky-bar { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default FloatingButtons;
