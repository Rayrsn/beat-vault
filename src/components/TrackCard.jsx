import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext';
import VisualizerCanvas from './VisualizerCanvas';
import { Play, Pause, Headphones, Share2, Check } from 'lucide-react';

const TrackCard = ({ track, index, viewMode = 'grid', allFilteredTracks = [] }) => {
  const { currentTrack, isPlaying, playTrack } = useAudio();
  const [copied, setCopied] = useState(false);

  const isCurrent = currentTrack?.id === track.id;
  const isThisPlaying = isCurrent && isPlaying;

  const handlePlayClick = () => {
    playTrack(track, allFilteredTracks);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}#${track.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedIndex = String(index + 1).padStart(2, '0');

  if (viewMode === 'list') {
    return (
      <div className={`track-list-item card-tactile ${isCurrent ? 'card-tactile-playing' : ''}`}>
        <div className="track-list-main">
          <span className="track-num">{formattedIndex}.</span>

          <button 
            className={`play-btn-circle ${isThisPlaying ? 'active' : ''}`}
            onClick={handlePlayClick}
          >
            {isThisPlaying ? <Pause size={14} fill="#fff" /> : <Play size={14} fill={isCurrent ? '#fff' : '#fff'} />}
          </button>

          <div className="track-info">
            <h3 className="track-title">{track.title}</h3>
            <span className="track-pack-badge">{track.packTitle}</span>
          </div>
        </div>

        <div className="track-list-meta">
          <span className="badge-mono">{track.bpm} BPM</span>
          <span className="badge-mono">{track.key}</span>
          <span className="badge-mono">{track.genre}</span>

          <div className="track-list-action">
            <button 
              className={`btn-brutal ${isThisPlaying ? 'btn-brutal-primary' : ''} list-preview-btn`} 
              onClick={handlePlayClick}
            >
              {isThisPlaying ? <Pause size={13} /> : <Headphones size={13} />}
              {isThisPlaying ? 'PAUSE' : 'PREVIEW'}
            </button>

            <button 
              className="btn-brutal share-btn-icon" 
              onClick={handleShareClick}
              title="Copy Relative Preview Link"
            >
              {copied ? <Check size={14} className="copied-icon" /> : <Share2 size={14} />}
            </button>
          </div>
        </div>

        {isCurrent && (
          <div className="list-visualizer-bar">
            <VisualizerCanvas height={24} isActive={isThisPlaying} />
          </div>
        )}

        <style>{`
          .track-list-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 20px;
            margin-bottom: 8px;
            gap: 16px;
            position: relative;
            flex-wrap: wrap;
          }
          .track-list-main {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .track-num {
            font-family: var(--font-mono);
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--text-muted);
            min-width: 24px;
          }
          .play-btn-circle {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: var(--bg-void);
            border: 2px solid var(--border-steel-bright);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.15s ease;
          }
          .play-btn-circle:hover, .play-btn-circle.active {
            background: var(--accent-purple);
            color: #fff;
            border-color: var(--accent-purple-bright);
          }
          .track-info {
            display: flex;
            flex-direction: column;
          }
          .track-title {
            font-family: var(--font-impact);
            font-size: 1.1rem;
            font-weight: 800;
            letter-spacing: -0.2px;
          }
          .track-pack-badge {
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--accent-purple-bright);
            text-transform: uppercase;
          }
          .track-list-meta {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .track-list-action {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .list-preview-btn {
            padding: 6px 14px;
            font-size: 0.75rem;
          }
          .share-btn-icon {
            padding: 6px;
          }
          .copied-icon {
            color: var(--accent-purple-bright);
          }
          .list-visualizer-bar {
            width: 100%;
            margin-top: 8px;
          }
        `}</style>
      </div>
    );
  }

  // Grid Mode (Tactile Brutalist Box Card)
  return (
    <div id={track.id} className={`card-tactile track-grid-card ${isCurrent ? 'card-tactile-playing' : ''}`}>
      {/* Top Header Row */}
      <div className="card-top-row">
        <span className="card-index-tag">#{formattedIndex}</span>
        <span className="card-status-badge badge-avail">
          [PREVIEW READY]
        </span>
      </div>

      {/* Play Action & Title */}
      <div className="card-center-row">
        <button 
          className={`grid-play-btn ${isThisPlaying ? 'playing' : ''}`}
          onClick={handlePlayClick}
        >
          {isThisPlaying ? <Pause size={20} fill="#fff" /> : <Play size={20} fill={isCurrent ? '#fff' : '#fff'} />}
        </button>

        <div className="grid-title-box">
          <h3 className="grid-track-title">{track.title}</h3>
          <span className="grid-pack-subtitle">{track.packTitle}</span>
        </div>
      </div>

      {/* Equalizer Visualizer */}
      <div className="card-visualizer-box">
        <VisualizerCanvas height={40} isActive={isThisPlaying} />
      </div>

      {/* Metadata Badges */}
      <div className="card-meta-row">
        <span className="badge-mono">{track.bpm} BPM</span>
        <span className="badge-mono">{track.key}</span>
        <span className="badge-mono">{track.genre}</span>
      </div>

      {/* Action Footer */}
      <div className="card-footer-row">
        <button 
          className={`btn-brutal ${isThisPlaying ? 'btn-brutal-primary' : ''} card-action-btn`}
          onClick={handlePlayClick}
        >
          {isThisPlaying ? <Pause size={14} /> : <Headphones size={14} />}
          {isThisPlaying ? 'PAUSE STREAM' : 'LISTEN PREVIEW'}
        </button>

        <button 
          className="btn-brutal share-card-btn"
          onClick={handleShareClick}
          title="Share Preview Link"
        >
          {copied ? <Check size={14} className="copied-icon" /> : <Share2 size={14} />}
        </button>
      </div>

      <style>{`
        .track-grid-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .card-index-tag {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .card-status-badge {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--accent-purple-bright);
        }
        .card-center-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .grid-play-btn {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          background: var(--bg-void);
          border: 2px solid var(--border-steel-bright);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .grid-play-btn:hover, .grid-play-btn.playing {
          background: var(--accent-purple);
          color: #fff;
          border-color: var(--accent-purple-bright);
        }
        .grid-title-box {
          overflow: hidden;
        }
        .grid-track-title {
          font-family: var(--font-impact);
          font-size: 1.25rem;
          font-weight: 800;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .grid-pack-subtitle {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .card-visualizer-box {
          margin: 4px 0;
        }
        .card-meta-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .card-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }
        .card-action-btn {
          flex: 1;
          justify-content: center;
        }
        .share-card-btn {
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default TrackCard;
