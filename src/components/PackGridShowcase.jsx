import React from 'react';
import { Sliders, Headphones, ArrowRight, Disc, Flame, Layers } from 'lucide-react';

const PackGridShowcase = ({ beatPacks, tracks, onSelectPack }) => {
  // Count tracks per pack
  const packCounts = beatPacks.reduce((acc, pack) => {
    const count = tracks.filter(t => t.packId === pack.id).length;
    acc[pack.id] = count;
    return acc;
  }, {});

  return (
    <section className="pack-showcase-container">
      <div className="vault-container">
        <div className="pack-header-box">
          <div className="pack-badge">
            <Sliders size={14} /> BEAT PACK VAULT SHOWCASE
          </div>
          <h2 className="pack-heading glitch-text">
            EXPLORE <span className="accent-text">BEAT PACKS</span>
          </h2>
          <p className="pack-subheading">
            SELECT ANY PACK BELOW TO BROWSE ITS FULL AUDIO PREVIEW LISTING & SPECS.
          </p>
        </div>

        <div className="pack-grid">
          {beatPacks.map((pack, idx) => {
            const count = packCounts[pack.id] || 0;
            return (
              <div 
                key={pack.id} 
                className="card-tactile pack-card"
                onClick={() => onSelectPack(pack.id)}
              >
                <div className="pack-card-top">
                  <span className="pack-card-num">PACK #{String(idx + 1).padStart(2, '0')}</span>
                  <span className="badge-mono badge-mono-active">{count} TRACKS</span>
                </div>

                <div className="pack-card-center">
                  <div className="pack-card-icon">
                    <Disc size={28} />
                  </div>
                  <div>
                    <h3 className="pack-card-title">{pack.title}</h3>
                    <span className="pack-card-status">[PREVIEW STREAMS ACTIVE]</span>
                  </div>
                </div>

                <div className="pack-card-footer">
                  <span className="btn-brutal btn-brutal-primary pack-card-btn">
                    OPEN PACK <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .pack-showcase-container {
          padding: 50px 0;
        }
        .pack-header-box {
          margin-bottom: 36px;
        }
        .pack-badge {
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
        .pack-heading {
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          line-height: 1.1;
          margin-bottom: 10px;
        }
        .pack-subheading {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .pack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 24px;
        }
        .pack-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          cursor: pointer;
        }
        .pack-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pack-card-num {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .pack-card-center {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .pack-card-icon {
          width: 52px;
          height: 52px;
          background: var(--bg-void);
          border: 2px solid var(--border-steel-bright);
          color: var(--accent-purple-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .pack-card-title {
          font-family: var(--font-impact);
          font-size: 1.5rem;
          font-weight: 900;
          line-height: 1.1;
        }
        .pack-card-status {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--accent-purple-bright);
          display: block;
          margin-top: 4px;
        }
        .pack-card-footer {
          margin-top: auto;
        }
        .pack-card-btn {
          width: 100%;
          justify-content: center;
          padding: 10px;
        }
      `}</style>
    </section>
  );
};

export default PackGridShowcase;
