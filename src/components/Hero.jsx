import React from 'react';
import { useAudio } from '../context/AudioContext';
import { Sliders, Headphones, ArrowRight, Disc } from 'lucide-react';

const Hero = ({ onGoToPacks, onGoToCatalog }) => {
  return (
    <section className="hero-section">
      <div className="hero-bg-parallax" style={{ backgroundImage: "url('./bg2.png')" }}></div>
      <div className="hero-overlay"></div>

      <div className="vault-container hero-content">
        <div className="hero-badge">
          <Headphones size={14} className="pulse-active" /> INDUSTRIAL BEAT ARCHIVE // STEREO HLS PREVIEWS
        </div>

        <h1 className="hero-title glitch-text">
          RAYR <span className="accent-text">// BEAT VAULT</span>
        </h1>

        <p className="hero-subtitle">
          OFFICIAL AUDIO ARCHIVE. EXPLORE EXCLUSIVE PACKS FEATURING HIGH-OCTANE TRAP, DRILL, JUICE WRLD TYPE BEATS, AND ATMOSPHERIC SYNTH INSTRUMENTALS.
        </p>

        <div className="hero-actions">
          <button className="btn-brutal btn-brutal-primary hero-btn" onClick={onGoToPacks}>
            <Sliders size={18} /> EXPLORE BEAT PACKS <ArrowRight size={18} />
          </button>
          
          <button className="btn-brutal hero-btn" onClick={onGoToCatalog}>
            <Disc size={18} /> BROWSE ALL BEATS
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-num">136</span>
            <span className="stat-label">BEAT PREVIEWS</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">10</span>
            <span className="stat-label">BEAT PACKS</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">HLS</span>
            <span className="stat-label">STREAMING ENGINE</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">320K</span>
            <span className="stat-label">STEREO QUALITY</span>
          </div>
        </div>
      </div>

      {/* Industrial Continuous Marquee Ticker */}
      <div className="marquee-container">
        <div className="marquee-content">
          ⚡ BEAT PACK X PREVIEW /// BEAT PACK SPECIAL /// BEAT PACK 8 PT. 1 & 2 /// NEW DRILL & TRAP BEATS DROPPING WEEKLY /// HIGH QUALITY HLS AUDIO PREVIEWS /// RAYR BEATS /// BEAT PACK X PREVIEW /// BEAT PACK SPECIAL /// BEAT PACK 8 PT. 1 & 2 /// NEW DRILL & TRAP BEATS DROPPING WEEKLY /// 
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 460px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-bottom: 2px solid var(--border-steel);
          overflow: hidden;
          background: var(--bg-void);
        }
        .hero-bg-parallax {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 120%;
          background-size: cover;
          background-position: center;
          opacity: 0.22;
          transform: translateY(0px);
          transition: transform 0.1s ease-out;
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(7, 6, 11, 0.4) 0%, rgba(7, 6, 11, 0.95) 100%);
        }
        .hero-content {
          position: relative;
          z-index: 2;
          padding-top: 50px;
          padding-bottom: 40px;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-purple-bright);
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid var(--accent-purple);
          padding: 6px 14px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        .hero-title {
          font-size: clamp(2.8rem, 6vw, 5rem);
          line-height: 1.05;
          margin-bottom: 16px;
        }
        .accent-text {
          color: var(--accent-purple-bright);
          text-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
        }
        .hero-subtitle {
          font-family: var(--font-mono);
          color: var(--text-muted);
          font-size: 0.95rem;
          max-width: 680px;
          margin-bottom: 32px;
          letter-spacing: 0.5px;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 40px;
        }
        .hero-btn {
          padding: 14px 28px;
          font-size: 0.95rem;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 16px;
          border-top: 1px solid var(--border-steel);
          padding-top: 24px;
        }
        .stat-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-steel);
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
        }
        .stat-num {
          font-family: var(--font-impact);
          font-size: 1.8rem;
          font-weight: 900;
          color: var(--text-main);
          line-height: 1;
        }
        .stat-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 4px;
        }
      `}</style>
    </section>
  );
};

export default Hero;
