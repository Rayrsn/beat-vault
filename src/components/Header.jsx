import React, { useState, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';
import { Activity, Tv, Disc, Sliders, Mail } from 'lucide-react';

const Header = () => {
  const { scanlinesActive, setScanlinesActive, tracks } = useAudio();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="industrial-header">
      <div className="vault-container header-inner">
        {/* Brand & Status */}
        <div className="header-brand">
          <div className="brand-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">RAYR</span>
            <span className="logo-tag">// PREVIEW VAULT</span>
          </div>
          
          <div className="status-pill">
            <span className="status-dot"></span>
            <span className="status-text">SYS.ONLINE // {tracks.length} BEAT PREVIEWS</span>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="header-nav">
          <a href="#catalog" className="nav-item">
            <Disc size={14} /> CATALOG
          </a>
          <a href="#packs" className="nav-item">
            <Sliders size={14} /> BEAT PACKS
          </a>
          <a href="#contact" className="nav-item">
            <Mail size={14} /> CONTACT / INQUIRIES
          </a>

          {/* Time & CRT Toggle */}
          <div className="header-meta">
            <span className="header-clock">{timeStr}</span>
            <button 
              className={`btn-brutal ${scanlinesActive ? 'btn-brutal-primary' : ''}`}
              onClick={() => setScanlinesActive(!scanlinesActive)}
              title="Toggle CRT Scanline Overlay"
            >
              <Tv size={14} /> {scanlinesActive ? 'CRT: ON' : 'CRT: OFF'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .industrial-header {
          background: var(--bg-panel);
          border-bottom: 2px solid var(--border-steel);
          height: var(--header-height);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }
        .header-brand {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-impact);
          font-weight: 900;
          font-size: 1.4rem;
          letter-spacing: -0.5px;
        }
        .logo-icon {
          color: var(--accent-purple-bright);
        }
        .logo-tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-purple-bright);
          background: rgba(139, 92, 246, 0.12);
          padding: 2px 6px;
          border: 1px solid var(--accent-purple);
        }
        .status-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          padding: 4px 10px;
          border: 1px solid var(--border-steel);
        }
        .status-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-purple-bright);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--accent-purple);
        }
        .header-nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .nav-item {
          color: var(--text-main);
          text-decoration: none;
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.15s ease;
        }
        .nav-item:hover {
          color: var(--accent-purple-bright);
        }
        .header-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          border-left: 1px solid var(--border-steel);
          padding-left: 20px;
        }
        .header-clock {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .status-pill, .header-clock {
            display: none;
          }
        }
        @media (max-width: 600px) {
          .nav-item {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
