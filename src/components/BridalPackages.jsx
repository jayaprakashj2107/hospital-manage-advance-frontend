import React from 'react';
import { Sparkles, Check, Crown, Heart, Gem, Star } from 'lucide-react';

const BridalPackages = ({ onSelectPackage }) => {
  const packages = [
    {
      id: 'bridal',
      title: 'Bridal Package',
      badge: 'Most Popular',
      icon: Crown,
      description: 'Complete luxury wedding day transformation with HD products and saree pleating.',
      inclusions: [
        'HD Bridal Makeup & Touchup',
        'Traditional / Modern Hairstyling',
        'Silk Saree Pleated Draping',
        'Nail Polish & Nail Art Styling',
        'Jewelry & Accessories Setting',
        'Free Pre-Wedding Makeup Trial'
      ],
      featured: true,
    },
    {
      id: 'engagement',
      title: 'Engagement Package',
      badge: 'Elegance',
      icon: Gem,
      description: 'Radiant look tailored for engagement ceremonies and ring exchanges.',
      inclusions: [
        'Engagement HD Makeup',
        'Floral / Braided Hairstyling',
        'Dress & Saree Draping Styling',
        'Eyelash & Contour Accentuation',
        'Jewelry Fixing & Hair Flowers'
      ],
      featured: false,
    },
    {
      id: 'reception',
      title: 'Reception Package',
      badge: 'Glamour',
      icon: Star,
      description: 'Glamorous evening look crafted for grand stage photo sessions.',
      inclusions: [
        'Soft Glam Reception Makeup',
        'Hollywood Waves / Updo Hairstyle',
        'Designer Saree / Gown Draping',
        'Long-Lasting Setting Spray Finish',
        'Jewelry & Hair Accessories Setting'
      ],
      featured: false,
    },
    {
      id: 'family',
      title: 'Family Function Package',
      badge: 'Group Value',
      icon: Heart,
      description: 'Special makeover package for bride’s mother, sisters, and close relatives.',
      inclusions: [
        'Occasion & Party Makeup',
        'Quick Elegant Hairstyling',
        'Saree Pleating & Draping',
        'Custom Styling for Family Members',
        'Group Discount Offers'
      ],
      featured: false,
    }
  ];

  return (
    <section id="bridal-packages" style={{ padding: '5.5rem 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="subtitle-badge">
            <Crown size={14} />
            <span>Specialized Packages</span>
          </div>
          <h2 className="section-title">
            Bridal & Event Makeup Packages
          </h2>
          <p className="section-description">
            Tailored beauty packages designed to give every bride and family member a breathtaking, camera-ready glow.
          </p>
        </div>

        {/* Packages Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
          }}
        >
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <div
                key={pkg.id}
                style={{
                  background: pkg.featured
                    ? 'linear-gradient(145deg, #FFFFFF 0%, #FFF3F5 100%)'
                    : '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem',
                  border: pkg.featured
                    ? '2px solid var(--gold-accent)'
                    : '1px solid var(--border-color)',
                  boxShadow: pkg.featured
                    ? '0 15px 35px rgba(212, 175, 55, 0.2)'
                    : 'var(--shadow-soft)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                {pkg.featured && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, var(--gold-accent) 0%, var(--gold-hover) 100%)',
                      color: 'var(--primary-deep)',
                      padding: '0.3rem 1.1rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      boxShadow: 'var(--shadow-gold)',
                    }}
                  >
                    ★ {pkg.badge}
                  </span>
                )}

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: pkg.featured ? 'rgba(212, 175, 55, 0.2)' : 'rgba(216, 107, 129, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: pkg.featured ? 'var(--gold-hover)' : 'var(--primary-rose)',
                      }}
                    >
                      <IconComponent size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--primary-deep)', margin: 0 }}>
                        {pkg.title}
                      </h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--primary-rose)', fontWeight: 600 }}>
                        Sindu Signature
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    {pkg.description}
                  </p>

                  {/* Inclusions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                    {pkg.inclusions.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <Check size={16} color="var(--primary-rose)" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPackage(pkg.title)}
                  className={pkg.featured ? 'btn-gold' : 'btn-primary'}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Sparkles size={16} />
                  <span>Enquire Now</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BridalPackages;
