import React from 'react';
import { CheckCircle2, Sparkles, MapPin, Heart, Scissors, Palette } from 'lucide-react';

const About = () => {
  const highlights = [
    "Exclusive Women's Fashion Designing & Custom Outfits",
    "Professional HD Bridal Makeup & Wedding Hairstyling",
    "Custom Stitching & Precision Tailoring for Blouses & Gowns",
    "Handcrafted Aari Work, Zari, Zardosi & Stone Embroidery",
    "Designer Blouses & Perfect Pleated Saree Draping",
    "Personalized Bridal Packages & Occasion Styling",
  ];

  return (
    <section id="about" style={{ padding: '5rem 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left Visual Grid */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80"
                alt="Aari Work Embroidery"
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-soft)',
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
                alt="Bridal Makeup Artistry"
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  marginTop: '1.5rem',
                  boxShadow: 'var(--shadow-soft)',
                }}
              />
            </div>

            {/* Experience Box */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, var(--primary-deep) 0%, #361722 100%)',
                color: '#FFFFFF',
                padding: '1.25rem 2.5rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 15px 35px rgba(74, 23, 40, 0.3)',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                border: '1px solid var(--gold-accent)',
              }}
            >
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-accent)', margin: 0 }}>
                SINDU
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                Master Fashion Designer & Makeup Artist
              </p>
            </div>
          </div>

          {/* Right Text Content */}
          <div>
            <div className="subtitle-badge">
              <Sparkles size={14} />
              <span>About Sindu Fashion Designer</span>
            </div>

            <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-deep)', fontWeight: 700, marginBottom: '1.25rem' }}>
              Crafting Elegance for Every Bride & Special Moment
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Located at <strong>Maduravalli, Tittakudi Taluk, Cuddalore District, Tamil Nadu (606106)</strong>, 
              <strong> SINDU FASHION DESIGNER</strong> is your premier destination for bespoke women's couture and high-definition bridal artistry.
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              We specialize in turning your dream outfit into reality — from heavy bridal Aari hand embroidery to flawless saree draping, customized blouse stitching, and long-lasting HD wedding makeup.
            </p>

            {/* Highlights List */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem', marginBottom: '2rem' }}>
              {highlights.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={18} color="var(--primary-rose)" />
                  <span style={{ fontSize: '0.98rem', color: 'var(--text-main)', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Quick Contact Line */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: '#FFFFFF',
                padding: '1rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
              }}
            >
              <MapPin size={24} color="var(--gold-hover)" />
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-deep)', margin: 0 }}>
                  Maduravalli, Tittakudi Taluk, Cuddalore Dist, Tamil Nadu – 606106
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--primary-rose)', margin: 0 }}>
                  Call / WhatsApp: <strong>7200053243</strong>
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
