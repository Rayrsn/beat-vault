import React from 'react';
import { useAudio } from '../context/AudioContext';
import { X, Play, Pause, Disc } from 'lucide-react';

const QueueDrawer = () => {
  const { queue, currentTrack, isPlaying, isQueueOpen, setIsQueueOpen, playTrack } = useAudio();

  if (!isQueueOpen) return null;

  return (
    <div className="queue-drawer-overlay">
      <div className="queue-drawer-panel">
        <div className="queue-header">
          <div className="queue-title">
            <Disc size={18} className="pulse-active" /> TRACK QUEUE // {queue.length} TRACKS
          </div>
          <button className="queue-close-btn" onClick={() => setIsQueueOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="queue-list">
          {queue.map((track, idx) => {
            const isCurrent = currentTrack?.id === track.id;
            return (
              <div 
                key={track.id} 
                className={`queue-item ${isCurrent ? 'active' : ''}`}
                onClick={() => playTrack(track, queue)}
              >
                <span className="queue-index">{String(idx + 1).padStart(2, '0')}.</span>
                <div className="queue-info">
                  <span className="queue-track-title">{track.title}</span>
                  <span className="queue-track-pack">{track.packTitle}</span>
                </div>
                <span className="badge-mono">{track.bpm} BPM</span>
                <span className="badge-mono">{track.key}</span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .queue-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 990;
          display: flex;
          justify-content: flex-end;
        }
        .queue-drawer-panel {
          width: 420px;
          max-width: 90vw;
          height: calc(100vh - var(--player-height));
          background: var(--bg-panel);
          border-left: 2px solid var(--accent-lime);
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.8);
          animation: slideInRight 0.2s ease-out;
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .queue-header {
          padding: 20px;
          border-bottom: 2px solid var(--border-steel);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .queue-title {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--accent-lime);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .queue-close-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }
        .queue-close-btn:hover {
          color: var(--accent-orange);
        }
        .queue-list {
          flex: 1;
          overflow-y: auto;
          padding: 12px 16px;
        }
        .queue-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border: 1px solid var(--border-steel);
          margin-bottom: 8px;
          background: var(--bg-void);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .queue-item:hover, .queue-item.active {
          border-color: var(--accent-lime);
          background: var(--bg-card-hover);
        }
        .queue-index {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .queue-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .queue-track-title {
          font-family: var(--font-impact);
          font-size: 1rem;
          font-weight: 800;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .queue-track-pack {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default QueueDrawer;
