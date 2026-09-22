import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Sparkles, Calendar } from 'lucide-react';

const Navbar = ({ onOpenAppointment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Bridal Packages', href: '#bridal-packages' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        transition: 'all 0.3s ease',
        background: isScrolled
          ? 'rgba(255, 247, 248, 0.95)'
          : 'rgba(255, 247, 248, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: isScrolled
          ? '1px solid rgba(216, 107, 129, 0.15)'
          : '1px solid transparent',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.04)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
        
        {/* Brand Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D86B81 0%, #D4AF37 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              boxShadow: '0 4px 12px rgba(216, 107, 129, 0.3)',
            }}
          >
            S
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-deep)', margin: 0, lineHeight: 1.1 }}>
              SINDU <span style={{ color: 'var(--gold-accent)', fontWeight: 400 }}>FASHION</span>
            </h1>
            <p style={{ fontSize: '0.72rem', color: 'var(--primary-rose)', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>
              Designer & Bridal Studio
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'var(--text-main)',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--primary-rose)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-main)')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="tel:7200053243"
            className="phone-badge"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--primary-deep)',
              background: 'rgba(216, 107, 129, 0.1)',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(216, 107, 129, 0.2)',
            }}
          >
            <Phone size={15} color="var(--primary-rose)" />
            <span>7200053243</span>
          </a>

          <button
            onClick={() => onOpenAppointment()}
            className="btn-gold"
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.88rem' }}
          >
            <Calendar size={16} />
            <span>Book Now</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              padding: '0.4rem',
              color: 'var(--primary-deep)',
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-hover)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(0,0,0,0.04)',
                }}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="btn-primary"
              style={{ marginTop: '0.5rem', justifyContent: 'center' }}
            >
              <Sparkles size={18} />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .phone-badge { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
