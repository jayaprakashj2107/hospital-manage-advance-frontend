import React from 'react';
import { MapPin, Phone, Heart, Sparkles, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #3D1724 0%, #290E17 100%)',
        color: 'rgba(255, 255, 255, 0.85)',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        borderTop: '2px solid var(--gold-accent)',
      }}
    >
      <div className="container">
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1.2fr 1fr',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
          className="footer-grid"
        >
          {/* Column 1: Studio Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #D86B81 0%, #D4AF37 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                S
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                SINDU <span style={{ color: 'var(--gold-accent)' }}>FASHION</span>
              </h3>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Premier boutique for Women's Fashion Designing, Bridal Makeup, HD Wedding Makeover, Custom Blouse Stitching, and Aari Embroidery in Maduravalli, Tittakudi.
            </p>

            <a
              href="tel:7200053243"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--gold-accent)',
                fontWeight: 700,
                fontSize: '1.05rem',
              }}
            >
              <Phone size={18} />
              <span>7200053243</span>
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1.25rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.5rem' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
              <li><a href="#home" style={{ color: 'rgba(255,255,255,0.85)' }}>Home</a></li>
              <li><a href="#about" style={{ color: 'rgba(255,255,255,0.85)' }}>About Studio</a></li>
              <li><a href="#services" style={{ color: 'rgba(255,255,255,0.85)' }}>Services & Stitching</a></li>
              <li><a href="#bridal-packages" style={{ color: 'rgba(255,255,255,0.85)' }}>Bridal Packages</a></li>
              <li><a href="#gallery" style={{ color: 'rgba(255,255,255,0.85)' }}>Aari Work Gallery</a></li>
              <li><a href="#reviews" style={{ color: 'rgba(255,255,255,0.85)' }}>Customer Reviews</a></li>
            </ul>
          </div>

          {/* Column 3: Location Details */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1.25rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.5rem' }}>
              Studio Address
            </h4>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.92rem', lineHeight: 1.6 }}>
              <MapPin size={20} color="var(--gold-accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div>
                <strong style={{ color: '#FFFFFF' }}>SINDU FASHION DESIGNER</strong><br />
                Maduravalli, Tittakudi Taluk,<br />
                Cuddalore District, Tamil Nadu – 606106, India.<br />
                Phone: 7200053243
              </div>
            </div>
          </div>

          {/* Column 4: Timings & Back to Top */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1.25rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '0.5rem' }}>
              Studio Hours
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Mon – Sun: 9:00 AM – 8:30 PM<br />
              <span style={{ color: 'var(--gold-accent)', fontSize: '0.82rem' }}>* Prior appointment recommended for Bridal consultations</span>
            </p>

            <button
              onClick={scrollToTop}
              style={{
                background: 'rgba(212, 175, 55, 0.15)',
                color: 'var(--gold-accent)',
                border: '1px solid var(--gold-accent)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <ArrowUp size={14} />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          <p>© {new Date().getFullYear()} SINDU FASHION DESIGNER. All Rights Reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Crafted with <Heart size={14} color="var(--primary-rose)" fill="var(--primary-rose)" /> in Maduravalli, Tamil Nadu.
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
