import React, { useState, useEffect } from 'react';
import { getReviews, postReview } from '../services/api';
import { Sparkles, Star, Quote, Plus, X, CheckCircle } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: '',
    rating: 5,
    service_tag: 'Bridal Makeup',
    review: '',
  });

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const data = await getReviews();
      setReviews(data);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer_name || !formData.review) return;

    const res = await postReview(formData);
    if (res.success) {
      setReviews([res.data, ...reviews]);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowModal(false);
        setFormData({ customer_name: '', rating: 5, service_tag: 'Bridal Makeup', review: '' });
      }, 2000);
    }
  };

  return (
    <section id="reviews" style={{ padding: '5.5rem 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="subtitle-badge">
            <Sparkles size={14} />
            <span>Client Testimonials</span>
          </div>
          <h2 className="section-title">
            What Our Happy Brides & Clients Say
          </h2>
          <p className="section-description">
            Read real feedback from brides and clients who trusted Sindu Fashion Designer for their big day styling and custom tailoring.
          </p>
        </div>

        {/* Top Summary & Add Review Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem',
            background: '#FFFFFF',
            padding: '1.25rem 2rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', color: 'var(--gold-accent)' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} fill="var(--gold-accent)" />
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-deep)', margin: 0 }}>
                4.9 out of 5 Stars
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                Based on 150+ verified wedding & stitching clients
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="btn-primary"
            style={{ padding: '0.6rem 1.4rem', fontSize: '0.9rem' }}
          >
            <Plus size={16} />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            <p>Loading customer reviews from REST API...</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {reviews.map((rev) => (
              <div
                key={rev.id || Math.random()}
                style={{
                  background: '#FFFFFF',
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-soft)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <div style={{ display: 'flex', color: 'var(--gold-accent)' }}>
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} size={16} fill="var(--gold-accent)" />
                      ))}
                    </div>
                    <Quote size={24} color="rgba(216, 107, 129, 0.25)" />
                  </div>

                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                      marginBottom: '1.25rem',
                    }}
                  >
                    "{rev.review}"
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--bg-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-deep)', margin: 0 }}>
                      {rev.customer_name}
                    </h5>
                    <span style={{ fontSize: '0.78rem', color: 'var(--primary-rose)', fontWeight: 500 }}>
                      {rev.service_tag || 'Client'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Add Review Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '2.5rem',
              maxWidth: '520px',
              width: '90%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                color: 'var(--text-muted)',
              }}
            >
              <X size={22} />
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle size={50} color="var(--primary-rose)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-deep)', fontWeight: 700 }}>
                  Thank You for Your Feedback!
                </h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Your review has been saved to the database.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-deep)', marginBottom: '0.5rem' }}>
                  Write a Customer Review
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Share your experience with Sindu Fashion Designer.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-deep)', marginBottom: '0.4rem' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      placeholder="e.g. Priyadharshini"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-deep)', marginBottom: '0.4rem' }}>
                        Rating (1-5 Stars)
                      </label>
                      <select
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.95rem',
                        }}
                      >
                        <option value={5}>5 Stars (Excellent)</option>
                        <option value={4}>4 Stars (Very Good)</option>
                        <option value={3}>3 Stars (Good)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-deep)', marginBottom: '0.4rem' }}>
                        Service Availed
                      </label>
                      <input
                        type="text"
                        value={formData.service_tag}
                        onChange={(e) => setFormData({ ...formData, service_tag: e.target.value })}
                        placeholder="e.g. Bridal Makeup"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.95rem',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-deep)', marginBottom: '0.4rem' }}>
                      Your Review *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                      placeholder="Write your feedback here..."
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.95rem',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ justifyContent: 'center', width: '100%', marginTop: '0.5rem' }}>
                    <Sparkles size={16} />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;
