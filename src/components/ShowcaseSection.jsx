import React, { useState } from 'react';
import { Mail, Send, Radio, Disc, Sparkles, Video, Music, Globe, Headphones, Share2 } from 'lucide-react';

const ShowcaseSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="showcase-section">
      <div className="vault-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Radio size={14} /> PRODUCER ARCHIVE & CONTACT
          </div>
          <h2 className="section-title glitch-text">
            RAYR <span className="accent-text">PRODUCER SHOWCASE</span>
          </h2>
          <p className="section-subtitle">
            THIS SITE SERVES AS AN INDUSTRIAL ARCHIVE FOR PREVIEWING RAYR'S INSTRUMENTALS AND COLLABORATIVE BEAT PACKS.
          </p>
        </div>

        {/* Info Grid */}
        <div className="showcase-grid">
          {/* Card 1: Sound Architecture */}
          <div className="card-tactile showcase-card">
            <div className="card-icon-box"><Headphones size={24} /></div>
            <h3 className="showcase-card-title">SOUND ARCHITECTURE</h3>
            <p className="showcase-card-desc">
              Specializing in dark atmospheric synth layers, heavy 808 glides, melancholic piano compositions, and distorted industrial percussion.
            </p>
            <div className="genre-pill-list">
              <span className="badge-mono">TRAP</span>
              <span className="badge-mono">DRILL</span>
              <span className="badge-mono">JUICE WRLD TYPE</span>
              <span className="badge-mono">MELODIC</span>
              <span className="badge-mono">SYNTHWAVE</span>
            </div>
          </div>

          {/* Card 2: HLS Stereo Previews */}
          <div className="card-tactile showcase-card">
            <div className="card-icon-box"><Disc size={24} /></div>
            <h3 className="showcase-card-title">HLS STEREO PREVIEWS</h3>
            <p className="showcase-card-desc">
              All tracks are streamed directly via high-bitrate HLS audio servers (`rayrsn.me`) for instantaneous playback without buffer delay.
            </p>
            <div className="genre-pill-list">
              <span className="badge-mono">320 KBPS</span>
              <span className="badge-mono">HLS AUDIO</span>
              <span className="badge-mono">WEB AUDIO VISUALIZER</span>
            </div>
          </div>

          {/* Card 3: Connect & Socials */}
          <div className="card-tactile showcase-card">
            <div className="card-icon-box"><Sparkles size={24} /></div>
            <h3 className="showcase-card-title">CONNECT WITH RAYR</h3>
            <p className="showcase-card-desc">
              Follow Rayr across official music platforms for new beat drops, loop kits, and drum kit releases.
            </p>
            <div className="social-links-row">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn-brutal social-btn">
                <Video size={16} /> YOUTUBE
              </a>
              <a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer" className="btn-brutal social-btn">
                <Music size={16} /> SOUNDCLOUD
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn-brutal social-btn">
                <Globe size={16} /> INSTAGRAM / SOCIALS
              </a>
            </div>
          </div>
        </div>

        {/* Contact & Custom Beat Inquiry */}
        <div className="card-tactile contact-card">
          <div className="contact-info">
            <div className="contact-badge"><Mail size={14} /> DIRECT INQUIRIES</div>
            <h3 className="contact-title">WORK WITH RAYR / CUSTOM BEAT INQUIRY</h3>
            <p className="contact-desc">
              Interested in custom beat production, placement inquiries, stem requests, or collaborating directly with Rayr? Send a message below.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">NAME / ARTIST ALIAS</label>
              <input 
                type="text" 
                className="form-input" 
                required 
                placeholder="e.g. Artist Name" 
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
                placeholder="contact@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">INQUIRY / MESSAGE</label>
              <textarea 
                className="form-input form-textarea" 
                rows="3" 
                required 
                placeholder="Mention specific beat titles, placement requirements, or custom production requests..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className="btn-brutal btn-brutal-primary submit-btn">
              <Send size={16} /> SEND MESSAGE
            </button>

            {submitted && (
              <div className="form-success-alert">
                [SUCCESS] YOUR MESSAGE HAS BEEN TRANSMITTED DIRECTLY TO RAYR. EXPECT A RESPONSE SHORTLY.
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`
        .showcase-section {
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
          color: var(--accent-purple-bright);
          border: 1px solid var(--accent-purple);
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
          max-width: 650px;
        }
        .showcase-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 60px;
        }
        .showcase-card {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .card-icon-box {
          width: 48px;
          height: 48px;
          background: var(--bg-void);
          border: 1px solid var(--accent-purple);
          color: var(--accent-purple-bright);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .showcase-card-title {
          font-family: var(--font-impact);
          font-size: 1.4rem;
          font-weight: 900;
        }
        .showcase-card-desc {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.6;
          flex: 1;
        }
        .genre-pill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }
        .social-links-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
        }
        .social-btn {
          justify-content: flex-start;
          padding: 10px 14px;
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
          color: var(--accent-purple-bright);
          border: 1px solid var(--accent-purple);
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
          border-color: var(--accent-purple);
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
          color: var(--accent-purple-bright);
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid var(--accent-purple);
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

export default ShowcaseSection;
