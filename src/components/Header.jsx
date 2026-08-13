import React, { useState, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';
import { Tv, Disc, Sliders, Home, Layers } from 'lucide-react';

const Header = ({ activeView, setActiveView }) => {
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
        <div className="header-brand" onClick={() => setActiveView('home')} style={{ cursor: 'pointer' }}>
          <div className="brand-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">RAYR</span>
            <span className="logo-tag">// PREVIEW VAULT</span>
          </div>
          
          <div className="status-pill">
            <span className="status-dot"></span>
            <span className="status-text">SYS.ONLINE // {tracks.length} BEATS</span>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="header-nav">
          <button 
            className={`nav-item-btn ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => setActiveView('home')}
          >
            <Home size={14} /> HOME
          </button>
          
          <button 
            className={`nav-item-btn ${activeView === 'packs' ? 'active' : ''}`}
            onClick={() => setActiveView('packs')}
          >
            <Sliders size={14} /> PACK SHOWCASE
          </button>

          <button 
            className={`nav-item-btn ${activeView === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveView('catalog')}
          >
            <Disc size={14} /> ALL BEATS ({tracks.length})
          </button>

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
          gap: 16px;
        }
        .nav-item-btn {
          background: none;
          border: 1px solid transparent;
          color: var(--text-main);
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.85rem;
          padding: 8px 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
        }
        .nav-item-btn:hover {
          color: var(--accent-purple-bright);
          border-color: var(--border-steel);
        }
        .nav-item-btn.active {
          background: rgba(139, 92, 246, 0.15);
          color: var(--accent-purple-bright);
          border-color: var(--accent-purple);
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
        @media (max-width: 650px) {
          .nav-item-btn span {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
