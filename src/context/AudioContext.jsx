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
  const [hasWebAudioCors, setHasWebAudioCors] = useState(true);
  const [streamErrorNotice, setStreamErrorNotice] = useState(null);

  // Web Audio API refs
  const audioRef = useRef(null);
  const hlsRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const recoveryAttemptRef = useRef(0);

  // Initialize HTML5 Audio Element & Event Listeners
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.volume = volume;
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      playNext();
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('playing', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('playing', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch (e) {}
      }
    };
  }, []);

  // Safe Web Audio Context setup
  const initWebAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      if (!sourceRef.current && audioRef.current && ctx.state === 'running') {
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        
        const source = ctx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(ctx.destination);

        analyserRef.current = analyser;
        sourceRef.current = source;
        setHasWebAudioCors(true);
      }
    } catch (e) {
      console.warn("Web Audio API connection fallback:", e);
      setHasWebAudioCors(false);
    }
  };

  // Safe HLS instance destruction without triggering redundant detachMedia events
  const destroyHls = () => {
    if (hlsRef.current) {
      const hls = hlsRef.current;
      hlsRef.current = null;
      try {
        hls.destroy();
      } catch (e) {
        // Suppress unexpected HLS cleanup exceptions
      }
    }
  };

  // Play a track
  const playTrack = (track, trackList = []) => {
    if (!audioRef.current) return;
    setStreamErrorNotice(null);
    recoveryAttemptRef.current = 0;

    const audio = audioRef.current;

    // Toggle play/pause if clicking currently active track
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audio.pause();
      } else {
        initWebAudio();
        audio.play().catch(() => {});
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

    // Pause audio cleanly and destroy previous HLS instance
    audio.pause();
    destroyHls();

    // Reset audio element source state cleanly
    try {
      audio.removeAttribute('src');
      audio.load();
    } catch (e) {}

    // Init Web Audio context
    initWebAudio();

    // HLS.js streaming setup
    if (audioUrl.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        class KeyRewriterLoader extends Hls.DefaultConfig.loader {
          load(context, config, callbacks) {
            if (context.url) {
              if (isLocalhost) {
                if (context.url.includes('beats.rayr.cf/')) {
                  context.url = context.url.replace('https://beats.rayr.cf/', '/r2-beats/');
                } else if (context.url.includes('rayr.cf/')) {
                  context.url = context.url.replace('https://rayr.cf/', '/r2-beats/');
                }
              } else {
                if (context.url.includes('rayr.cf/') && !context.url.includes('beats.rayr.cf/')) {
                  context.url = context.url.replace('https://rayr.cf/', 'https://beats.rayr.cf/');
                }
              }
            }

            const originalOnSuccess = callbacks.onSuccess;
            callbacks.onSuccess = (response, stats, ctx, networkDetails) => {
              if (response.data && response.data.byteLength && response.data.byteLength > 16) {
                const isKeyUrl = (ctx.url && ctx.url.includes('.key')) || ctx.type === 'key';
                if (isKeyUrl) {
                  response.data = response.data.slice(0, 16);
                }
              }
              originalOnSuccess(response, stats, ctx, networkDetails);
            };

            super.load(context, config, callbacks);
          }
        }

        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 90,
          maxBufferLength: 30,
          maxMaxBufferLength: 600,
          loader: KeyRewriterLoader,
          fLoader: KeyRewriterLoader,
          pLoader: KeyRewriterLoader,
          xhrSetup: (xhr) => {
            xhr.withCredentials = false;
          }
        });

        hlsRef.current = hls;
        hls.attachMedia(audio);
        const finalUrl = isLocalhost
          ? audioUrl.replace('https://beats.rayr.cf/', '/r2-beats/').replace('https://rayr.cf/', '/r2-beats/')
          : audioUrl.replace('https://rayr.cf/', 'https://beats.rayr.cf/');
        hls.loadSource(finalUrl);
        
        hls.on(Hls.Events.KEY_LOADING, (event, data) => {
          if (data && data.frag && data.frag.decryptdata && data.frag.decryptdata.uri) {
            let keyUri = data.frag.decryptdata.uri;
            if (isLocalhost) {
              keyUri = keyUri.replace('https://beats.rayr.cf/', '/r2-beats/').replace('https://rayr.cf/', '/r2-beats/');
            } else {
              keyUri = keyUri.replace('https://rayr.cf/', 'https://beats.rayr.cf/');
            }
            data.frag.decryptdata.uri = keyUri;
          }
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Ignore expected browser policy or fast-switch play promise rejections
            });
          }
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            recoveryAttemptRef.current += 1;
            if (recoveryAttemptRef.current > 2) {
              console.warn("HLS playback error limit reached. Stopping recovery.");
              destroyHls();
              setIsPlaying(false);
              return;
            }

            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.warn("HLS Network Error, restarting load...", data);
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.warn("HLS Media Error, attempting recovery...", data);
                hls.recoverMediaError();
                break;
              default:
                destroyHls();
                setIsPlaying(false);
                break;
            }
          }
        });
      } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
        audio.src = audioUrl;
        audio.play().catch(() => {});
      }
    } else {
      audio.src = audioUrl;
      audio.play().catch(() => {});
    }
  };

  const togglePlayPause = () => {
    if (!currentTrack && tracks.length > 0) {
      playTrack(tracks[0], tracks);
      return;
    }
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      initWebAudio();
      audioRef.current.play().catch(() => {});
    }
  };

  const playNext = () => {
    if (!currentTrack) return;
    const activeList = queue.length > 0 ? queue : tracks;
    const currentIndex = activeList.findIndex(t => t.id === currentTrack.id);
    if (currentIndex !== -1 && currentIndex < activeList.length - 1) {
      playTrack(activeList[currentIndex + 1], activeList);
    } else if (activeList.length > 0) {
      playTrack(activeList[0], activeList);
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
        hasWebAudioCors,
        streamErrorNotice,
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
