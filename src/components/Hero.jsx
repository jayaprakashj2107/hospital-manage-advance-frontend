import React from 'react';
import { Sparkles, ArrowRight, MapPin, Phone, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

const Hero = ({ onOpenAppointment }) => {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        padding: '3rem 0 5rem 0',
        background: 'radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.12) 0%, transparent 40%), radial-gradient(circle at 10% 70%, rgba(216, 107, 129, 0.15) 0%, transparent 45%)',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        
        {/* Shaking Mini-Banner Announcement */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div
            className="animate-shake"
            style={{
              background: 'linear-gradient(135deg, #4A1728 0%, #361722 100%)',
              color: '#F4E8C1',
              padding: '0.6rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 8px 20px rgba(74, 23, 40, 0.25)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              fontSize: '0.92rem',
              fontWeight: 600,
            }}
          >
            <Sparkles size={16} color="var(--gold-accent)" />
            <span>Grand Festive & Wedding Season Booking Open! Call <strong>7200053243</strong></span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3.5rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Hero Left Content */}
          <div>
            <div className="subtitle-badge">
              <MapPin size={14} />
              <span>Maduravalli, Tittakudi Taluk, Cuddalore District</span>
            </div>

            <h1
              style={{
                fontSize: '3.3rem',
                fontWeight: 800,
                color: 'var(--primary-deep)',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
              }}
            >
              Where Beauty Meets <span style={{ color: 'var(--primary-rose)', fontStyle: 'italic' }}>Fashion</span> & Creativity
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginBottom: '2rem',
                maxWidth: '560px',
              }}
            >
              Discover elegant fashion designs, professional bridal makeup, customized stitching, Aari embroidery, and personalized styling for every special occasion.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button
                onClick={() => onOpenAppointment()}
                className="btn-primary"
              >
                <Sparkles size={18} />
                <span>Book an Appointment</span>
              </button>

              <a href="#services" className="btn-secondary">
                <span>Explore Services</span>
                <ArrowRight size={16} />
              </a>

              <a href="#contact" className="btn-gold">
                <Phone size={16} />
                <span>Contact Us</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-color)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Award size={22} color="var(--gold-hover)" />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-deep)' }}>100% Fit</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Custom Stitching</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldCheck size={22} color="var(--primary-rose)" />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-deep)' }}>HD Makeup</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Premium Products</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <HeartHandshake size={22} color="var(--gold-hover)" />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-deep)' }}>500+ Brides</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Happy Clients</p>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Showcase */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(74, 23, 40, 0.18)',
                border: '4px solid #FFFFFF',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
                alt="Sindu Fashion Designer Bridal Wear"
                style={{ width: '100%', height: '480px', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(74, 23, 40, 0.75) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '2rem',
                }}
              >
                <div style={{ color: '#FFFFFF' }}>
                  <span
                    style={{
                      background: 'var(--gold-accent)',
                      color: 'var(--primary-deep)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    Boutique Special
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem', color: '#FFFFFF' }}>
                    Bridal Aari Work & Customized Sarees
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>
                    Maduravalli, Tittakudi Taluk • Phone: 7200053243
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Highlight Card */}
            <div
              className="animate-float"
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                background: '#FFFFFF',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-gold)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
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
                  fontWeight: 700,
                }}
              >
                ★ 5.0
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-deep)', margin: 0 }}>Top Rated Studio</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Tamil Nadu Bridal Expert</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          h1 { font-size: 2.3rem !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
