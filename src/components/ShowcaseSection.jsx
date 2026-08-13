import React from 'react';
import { Radio, Disc, Sparkles, Video, Music, Globe, Headphones } from 'lucide-react';

const ShowcaseSection = () => {
  return (
    <section className="showcase-section">
      <div className="vault-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Radio size={14} /> PRODUCER ARCHIVE & SPECIFICATIONS
          </div>
          <h2 className="section-title glitch-text">
            RAYR <span className="accent-text">SOUND SHOWCASE</span>
          </h2>
          <p className="section-subtitle">
            AN INDUSTRIAL ARCHIVE FOR PREVIEWING INSTRUMENTALS AND COLLABORATIVE BEAT PACKS.
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
            <h3 className="showcase-card-title">OFFICIAL PLATFORMS</h3>
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
      </div>

      <style>{`
        .showcase-section {
          padding: 60px 0;
          border-top: 2px solid var(--border-steel);
          background: var(--bg-void);
        }
        .section-header {
          margin-bottom: 40px;
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
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
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
      `}</style>
    </section>
  );
};

export default ShowcaseSection;
