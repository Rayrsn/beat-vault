import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import beatsData from '../data/beats-manifest.json';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [tracks, setTracks] = useState(beatsData.tracks || []);
  const [beatPacks, setBeatPacks] = useState(beatsData.beatPacks || []);
  
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [queue, setQueue] = useState([]);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [scanlinesActive, setScanlinesActive] = useState(true);

  // Web Audio API refs
  const audioRef = useRef(null);
  const hlsRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  // Initialize HTML5 Audio Element & Web Audio API
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.volume = volume;
    audioRef.current = audio;

    // Time update listener
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, []);

  // Web Audio Context setup for visualizer
  const initWebAudio = () => {
    if (!audioCtxRef.current && audioRef.current) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContextClass();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64; // High response frequency bars
        
        const source = ctx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(ctx.destination);

        audioCtxRef.current = ctx;
        analyserRef.current = analyser;
        sourceRef.current = source;
      } catch (e) {
        console.warn("Web Audio API initialization fallback:", e);
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Play a track
  const playTrack = (track, trackList = []) => {
    if (!audioRef.current) return;
    initWebAudio();

    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
      return;
    }

    setCurrentTrack(track);
    setCurrentTime(0);
    setDuration(track.duration || 0);

    if (trackList.length > 0) {
      setQueue(trackList);
    }

    const audioUrl = track.audioUrl;

    // HLS.js streaming check
    if (audioUrl.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hls.loadSource(audioUrl);
        hls.attachMedia(audioRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
        });
        hlsRef.current = hls;
      } else if (audioRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        // Native Safari HLS support
        audioRef.current.src = audioUrl;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    } else {
      // Direct MP3/Audio file
      audioRef.current.src = audioUrl;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const togglePlayPause = () => {
    if (!currentTrack && tracks.length > 0) {
      playTrack(tracks[0], tracks);
      return;
    }
    if (!audioRef.current) return;
    initWebAudio();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const playNext = () => {
    if (!currentTrack) return;
    const activeList = queue.length > 0 ? queue : tracks;
    const currentIndex = activeList.findIndex(t => t.id === currentTrack.id);
    if (currentIndex !== -1 && currentIndex < activeList.length - 1) {
      playTrack(activeList[currentIndex + 1], activeList);
    } else if (activeList.length > 0) {
      playTrack(activeList[0], activeList); // Loop back to start
    }
  };

  const playPrev = () => {
    if (!currentTrack) return;
    const activeList = queue.length > 0 ? queue : tracks;
    const currentIndex = activeList.findIndex(t => t.id === currentTrack.id);
    if (currentIndex > 0) {
      playTrack(activeList[currentIndex - 1], activeList);
    }
  };

  const seekTo = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.85;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'ArrowRight') {
        seekTo(Math.min(currentTime + 5, duration));
      } else if (e.code === 'ArrowLeft') {
        seekTo(Math.max(currentTime - 5, 0));
      } else if (e.code === 'KeyM') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTrack, isPlaying, currentTime, duration]);

  return (
    <AudioContext.Provider
      value={{
        tracks,
        beatPacks,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        queue,
        isQueueOpen,
        scanlinesActive,
        analyserRef,
        setScanlinesActive,
        setIsQueueOpen,
        playTrack,
        togglePlayPause,
        playNext,
        playPrev,
        seekTo,
        handleVolumeChange,
        toggleMute
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
