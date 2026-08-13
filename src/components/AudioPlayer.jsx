import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext';
import VisualizerCanvas from './VisualizerCanvas';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  ListMusic, Radio, Share2, Check, AlertTriangle 
} from 'lucide-react';

const formatTime = (secs) => {
  if (isNaN(secs) || secs < 0) return '00:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const AudioPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    streamErrorNotice,
    togglePlayPause,
    playNext,
    playPrev,
    seekTo,
    handleVolumeChange,
    toggleMute,
    isQueueOpen,
    setIsQueueOpen
  } = useAudio();

  const [copied, setCopied] = useState(false);

  const handleShareCurrent = () => {
    if (currentTrack) {
      navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${currentTrack.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!currentTrack) {
    return (
      <div className="sticky-player-bar standby-bar">
        <div className="vault-container standby-inner">
          <div className="standby-text">
            <Radio size={16} className="pulse-active" /> SYSTEM STANDBY // CLICK ANY BEAT CARD TO PREVIEW STREAM
          </div>
        </div>
        <style>{`
          .sticky-player-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: var(--player-height);
            background: var(--bg-panel);
            border-top: 2px solid var(--accent-purple);
            z-index: 1000;
          }
          .standby-inner {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .standby-text {
            font-family: var(--font-mono);
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--accent-purple-bright);
            display: flex;
            align-items: center;
            gap: 10px;
          }
        `}</style>
      </div>
    );
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekChange = (e) => {
    const newPercent = Number(e.target.value);
    const newTime = (newPercent / 100) * duration;
    seekTo(newTime);
  };

  return (
    <div className="sticky-player-bar">
      {/* Remote CDN Error Warning Toast */}
      {streamErrorNotice && (
        <div className="stream-notice-banner">
          <AlertTriangle size={14} /> {streamErrorNotice}
        </div>
      )}

      {/* Top Timeline Progress Bar */}
      <div className="player-progress-container">
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="0.1"
          value={progressPercent}
          onChange={handleSeekChange}
          className="timeline-slider"
        />
        <div className="timeline-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <div className="vault-container player-inner">
        {/* Track Metadata */}
        <div className="player-track-info">
          <div className="player-disc-icon">
            <Radio size={20} className={isPlaying ? "pulse-active" : ""} />
          </div>
          <div className="player-text-box">
            <h4 className="player-track-title">{currentTrack.title}</h4>
            <span className="player-pack-name">{currentTrack.packTitle} // {currentTrack.bpm} BPM // {currentTrack.key}</span>
          </div>
        </div>

        {/* Player Controls */}
        <div className="player-controls-main">
          <button className="control-btn" onClick={playPrev} title="Previous Track">
            <SkipBack size={18} />
          </button>
          
          <button className="control-btn-play" onClick={togglePlayPause} title={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause size={20} fill="#fff" /> : <Play size={20} fill="#fff" />}
          </button>

          <button className="control-btn" onClick={playNext} title="Next Track">
            <SkipForward size={18} />
          </button>

          <span className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Visualizer & Volume */}
        <div className="player-right-group">
          <div className="player-visualizer-preview">
            <VisualizerCanvas height={32} isActive={isPlaying} />
          </div>

          <div className="volume-group">
            <button className="control-btn-sm" onClick={toggleMute} title="Mute/Unmute">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="volume-slider"
            />
          </div>

          <button 
            className="btn-brutal player-share-btn" 
            onClick={handleShareCurrent}
            title="Share Beat"
          >
            {copied ? <Check size={14} className="copied-icon" /> : <Share2 size={14} />}
            {copied ? 'COPIED' : 'SHARE'}
          </button>

          <button 
            className={`btn-brutal ${isQueueOpen ? 'btn-brutal-primary' : ''}`}
            onClick={() => setIsQueueOpen(!isQueueOpen)}
            title="Toggle Track Queue"
          >
            <ListMusic size={16} /> QUEUE
          </button>
        </div>
      </div>

      <style>{`
        .sticky-player-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: var(--player-height);
          background: var(--bg-panel);
          border-top: 2px solid var(--accent-purple);
          z-index: 1000;
          box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.8);
        }
        .stream-notice-banner {
          background: var(--bg-void);
          color: #ffaa00;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 12px;
          border-bottom: 1px solid #ffaa00;
          display: flex;
          align-items: center;
          gap: 6px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .player-progress-container {
          position: relative;
          width: 100%;
          height: 6px;
          background: var(--border-steel);
        }
        .timeline-slider {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 6px;
          opacity: 0;
          cursor: pointer;
          z-index: 2;
        }
        .timeline-fill {
          height: 100%;
          background: var(--accent-purple-bright);
          box-shadow: 0 0 10px var(--accent-purple);
          transition: width 0.1s linear;
        }
        .player-inner {
          height: calc(var(--player-height) - 6px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .player-track-info {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 220px;
        }
        .player-disc-icon {
          width: 42px;
          height: 42px;
          background: var(--bg-void);
          border: 1px solid var(--accent-purple);
          color: var(--accent-purple-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .player-text-box {
          overflow: hidden;
        }
        .player-track-title {
          font-family: var(--font-impact);
          font-size: 1.1rem;
          font-weight: 800;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .player-pack-name {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .player-controls-main {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .control-btn {
          background: var(--bg-void);
          border: 1px solid var(--border-steel-bright);
          color: var(--text-main);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .control-btn:hover {
          border-color: var(--accent-purple-bright);
          color: var(--accent-purple-bright);
        }
        .control-btn-play {
          width: 44px;
          height: 44px;
          background: var(--accent-purple);
          border: none;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.15s ease;
          box-shadow: 0 0 15px var(--accent-purple-glow);
        }
        .control-btn-play:hover {
          transform: scale(1.05);
          background: #9d4edd;
        }
        .time-display {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
          min-width: 95px;
        }
        .player-right-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .player-visualizer-preview {
          width: 140px;
        }
        .volume-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .control-btn-sm {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }
        .control-btn-sm:hover {
          color: var(--accent-purple-bright);
        }
        .volume-slider {
          width: 70px;
          accent-color: var(--accent-purple);
          cursor: pointer;
        }
        .player-share-btn {
          padding: 8px 12px;
          font-size: 0.75rem;
        }
        .copied-icon {
          color: var(--accent-purple-bright);
        }

        @media (max-width: 900px) {
          .player-visualizer-preview, .volume-group {
            display: none;
          }
        }
        @media (max-width: 600px) {
          .player-pack-name, .time-display {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;
