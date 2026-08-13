import React, { useState } from 'react';
import { ShieldCheck, Check, Mail, Send, Sparkles } from 'lucide-react';

const LicensingSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="licensing" className="licensing-section">
      <div className="vault-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <ShieldCheck size={14} /> LEASE CONTRACTS & EXCLUSIVES
          </div>
          <h2 className="section-title glitch-text">
            TRANSPARENT <span className="accent-text">BEAT LICENSING</span>
          </h2>
          <p className="section-subtitle">
            CHOOSE THE RIGHT LICENSE TIER FOR YOUR PROJECT. ALL LEASES INCLUDE INSTANT UNTAGGED STEREO DOWNLOADS.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="licensing-grid">
          {/* MP3 LEASE */}
          <div className="card-tactile license-card">
            <span className="license-tag">STANDARD</span>
            <h3 className="license-name">MP3 LEASE</h3>
            <div className="license-price">$29.99 <span className="price-term">/ TRACK</span></div>
            <ul className="license-features">
              <li><Check size={16} className="check-icon" /> Untagged High-Quality MP3 (320kbps)</li>
              <li><Check size={16} className="check-icon" /> 100,000 Audio Streams</li>
              <li><Check size={16} className="check-icon" /> 1 Music Video Distribution</li>
              <li><Check size={16} className="check-icon" /> Non-Exclusive Rights</li>
            </ul>
            <a href="#catalog" className="btn-brutal btn-brutal-primary license-btn">
              CHOOSE TRACK
            </a>
          </div>

          {/* WAV LEASE */}
          <div className="card-tactile license-card license-popular">
            <div className="popular-badge">MOST POPULAR</div>
            <span className="license-tag">PREMIUM</span>
            <h3 className="license-name">WAV LEASE</h3>
            <div className="license-price">$49.99 <span className="price-term">/ TRACK</span></div>
            <ul className="license-features">
              <li><Check size={16} className="check-icon" /> Untagged 24-bit Studio WAV File</li>
              <li><Check size={16} className="check-icon" /> Untagged MP3 File</li>
              <li><Check size={16} className="check-icon" /> 500,000 Audio Streams</li>
              <li><Check size={16} className="check-icon" /> Radio Playback Allowed</li>
            </ul>
            <a href="#catalog" className="btn-brutal btn-brutal-primary license-btn">
              CHOOSE TRACK
            </a>
          </div>

          {/* UNLIMITED STEMS */}
          <div className="card-tactile license-card">
            <span className="license-tag">PRO</span>
            <h3 className="license-name">UNLIMITED STEMS</h3>
            <div className="license-price">$99.99 <span className="price-term">/ TRACK</span></div>
            <ul className="license-features">
              <li><Check size={16} className="check-icon" /> Full Trackout Audio Stems (WAV)</li>
              <li><Check size={16} className="check-icon" /> Unlimited Audio Streams & Video</li>
              <li><Check size={16} className="check-icon" /> Profit / Commercial Rights</li>
              <li><Check size={16} className="check-icon" /> Full Mixing Flexibility</li>
            </ul>
            <a href="#catalog" className="btn-brutal btn-brutal-primary license-btn">
              CHOOSE TRACK
            </a>
          </div>
        </div>

        {/* Custom Production Inquiry */}
        <div className="card-tactile contact-card" id="contact">
          <div className="contact-info">
            <div className="contact-badge"><Sparkles size={14} /> EXCLUSIVES & CUSTOM BEATS</div>
            <h3 className="contact-title">NEED EXCLUSIVE RIGHTS OR CUSTOM PRODUCTION?</h3>
            <p className="contact-desc">
              Looking to negotiate exclusive ownership for a beat, request custom composition, or collaborate with Rayr directly? Send your inquiry below.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">NAME / ARTIST STAGE NAME</label>
              <input 
                type="text" 
                className="form-input" 
                required 
                placeholder="e.g. Young Producer" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">EMAIL ADDRESS</label>
              <input 
                type="email" 
                className="form-input" 
                required 
                placeholder="artist@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">PROJECT DETAILS / INQUIRY</label>
              <textarea 
                className="form-input form-textarea" 
                rows="3" 
                required 
                placeholder="Specify the beat title, budget, or custom beat requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className="btn-brutal btn-brutal-primary submit-btn">
              <Send size={16} /> SEND INQUIRY
            </button>

            {submitted && (
              <div className="form-success-alert">
                [SUCCESS] YOUR INQUIRY HAS BEEN SENT DIRECTLY TO RAYR. EXPECT A RESPONSE WITHIN 24 HOURS.
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`
        .licensing-section {
          padding: 80px 0;
          border-top: 2px solid var(--border-steel);
          background: var(--bg-void);
        }
        .section-header {
          margin-bottom: 50px;
        }
        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-lime);
          border: 1px solid var(--accent-lime);
          padding: 4px 10px;
          margin-bottom: 12px;
        }
        .section-title {
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.1;
          margin-bottom: 12px;
        }
        .section-subtitle {
          font-family: var(--font-mono);
          color: var(--text-muted);
          font-size: 0.9rem;
          max-width: 600px;
        }
        .licensing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 60px;
        }
        .license-card {
          padding: 30px;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .license-popular {
          border-color: var(--accent-lime) !important;
          background: var(--bg-card-hover);
        }
        .popular-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--accent-lime);
          color: #000;
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.7rem;
          padding: 4px 10px;
        }
        .license-tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .license-name {
          font-family: var(--font-impact);
          font-size: 1.6rem;
          font-weight: 900;
          margin-bottom: 12px;
        }
        .license-price {
          font-family: var(--font-impact);
          font-size: 2.8rem;
          color: var(--accent-lime);
          line-height: 1;
          margin-bottom: 24px;
        }
        .price-term {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .license-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
          flex: 1;
        }
        .license-features li {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-main);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .check-icon {
          color: var(--accent-lime);
          flex-shrink: 0;
        }
        .license-btn {
          width: 100%;
          justify-content: center;
        }
        .contact-card {
          padding: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }
        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-orange);
          border: 1px solid var(--accent-orange);
          padding: 4px 10px;
          margin-bottom: 16px;
        }
        .contact-title {
          font-family: var(--font-impact);
          font-size: 2rem;
          font-weight: 900;
          line-height: 1.15;
          margin-bottom: 14px;
        }
        .contact-desc {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .form-input {
          background: var(--bg-void);
          border: 2px solid var(--border-steel-bright);
          color: var(--text-main);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          padding: 10px 14px;
          outline: none;
        }
        .form-input:focus {
          border-color: var(--accent-lime);
        }
        .form-textarea {
          resize: vertical;
        }
        .submit-btn {
          justify-content: center;
          padding: 14px;
        }
        .form-success-alert {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--accent-lime);
          background: rgba(204, 255, 0, 0.1);
          border: 1px solid var(--accent-lime);
          padding: 12px;
        }

        @media (max-width: 850px) {
          .contact-card {
            grid-template-columns: 1fr;
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default LicensingSection;
