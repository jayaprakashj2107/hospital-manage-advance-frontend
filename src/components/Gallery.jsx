import React, { useState, useEffect } from 'react';
import { getGallery } from '../services/api';
import { Sparkles, Maximize2, X, Eye } from 'lucide-react';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      const data = await getGallery();
      setGalleryItems(data);
      setLoading(false);
    };
    fetchGallery();
  }, []);

  const categories = ['All', 'Fashion', 'Bridal Makeup', 'Aari Work', 'Stitching', 'Embroidery'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory.toLowerCase().includes(item.category.toLowerCase()));

  return (
    <section id="gallery" style={{ padding: '5.5rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="subtitle-badge">
            <Sparkles size={14} />
            <span>Artistry Portfolio</span>
          </div>
          <h2 className="section-title">
            Our Work Gallery
          </h2>
          <p className="section-description">
            Immerse yourself in our collection of real bridal makeovers, intricate Aari hand embroidery designs, and tailored designer outfits.
          </p>
        </div>

        {/* Categories Filter Bar */}
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

        {/* Gallery Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem' }}>Loading portfolio gallery from REST API...</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  height: '320px',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-soft)',
                  border: '1px solid var(--border-color)',
                }}
                className="gallery-item-card"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                />

                {/* Dark Overlay on Hover */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(54, 23, 34, 0.85) 0%, rgba(54, 23, 34, 0.2) 60%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.5rem',
                    color: '#FFFFFF',
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--gold-accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '0.3rem',
                    }}
                  >
                    {item.category}
                  </span>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                    {item.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
                    <Eye size={14} />
                    <span>Click to view full image</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Popup Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '850px',
              width: '90%',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(0,0,0,0.7)',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              <X size={20} />
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              style={{ width: '100%', maxHeight: '550px', objectFit: 'cover' }}
            />

            <div style={{ padding: '1.5rem', background: 'var(--bg-primary)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-rose)', textTransform: 'uppercase' }}>
                {selectedImage.category}
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-deep)', marginTop: '0.2rem' }}>
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                  {selectedImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
