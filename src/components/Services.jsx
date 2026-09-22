import React, { useState, useEffect } from 'react';
import { getServices } from '../services/api';
import { Sparkles, Calendar, ArrowRight, Scissors, Palette, Heart, Check } from 'lucide-react';

const Services = ({ onSelectService }) => {
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const data = await getServices();
      setServices(data);
      setLoading(false);
    };
    fetchServices();
  }, []);

  const categories = ['All', 'Fashion Designing', 'Makeup', 'Stitching', 'Aari Work'];

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory.toLowerCase().includes(s.category.toLowerCase()));

  return (
    <section id="services" style={{ padding: '5.5rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="subtitle-badge">
            <Sparkles size={14} />
            <span>Our Offerings</span>
          </div>
          <h2 className="section-title">
            Boutique Services & Bridal Artistry
          </h2>
          <p className="section-description">
            Explore our handcrafted fashion design collections, high-definition makeup, custom tailoring, and traditional Aari embroidery work.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '3rem',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.92rem',
                transition: 'var(--transition)',
                background: activeCategory === cat
                  ? 'linear-gradient(135deg, var(--primary-rose) 0%, var(--primary-dark-rose) 100%)'
                  : '#FFFFFF',
                color: activeCategory === cat ? '#FFFFFF' : 'var(--text-main)',
                border: activeCategory === cat ? 'none' : '1px solid var(--border-color)',
                boxShadow: activeCategory === cat ? '0 6px 16px rgba(216, 107, 129, 0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem' }}>Loading services from REST API...</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="glass-card"
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img
                      src={service.image || 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'}
                      alt={service.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.08)')}
                      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(54, 23, 34, 0.85)',
                        backdropFilter: 'blur(4px)',
                        color: 'var(--gold-accent)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {service.category}
                    </span>
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--primary-deep)',
                        marginBottom: '0.6rem',
                      }}
                    >
                      {service.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.92rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.6,
                        marginBottom: '1rem',
                      }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    padding: '1.25rem 1.5rem',
                    background: 'rgba(250, 238, 241, 0.5)',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gold-hover)' }}>
                    {service.starting_price}
                  </span>

                  <button
                    onClick={() => onSelectService(service.name)}
                    className="btn-primary"
                    style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}
                  >
                    <Calendar size={14} />
                    <span>Book Service</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Services;
