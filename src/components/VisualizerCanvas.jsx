import React, { useEffect, useRef } from 'react';
import { useAudio } from '../context/AudioContext';

const VisualizerCanvas = ({ height = 48, isActive = false }) => {
  const canvasRef = useRef(null);
  const { analyserRef, isPlaying, hasWebAudioCors } = useAudio();
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    canvas.height = height;

    let frameCount = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isActive && isPlaying) {
        const barCount = 36;
        const barWidth = (width / barCount) - 2;
        let x = 0;

        if (hasWebAudioCors && analyserRef.current) {
          // Web Audio API Frequency Analysis
          const bufferLength = analyserRef.current.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyserRef.current.getByteFrequencyData(dataArray);

          for (let i = 0; i < barCount; i++) {
            const value = dataArray[i] || 0;
            const percent = value / 255;
            const barHeight = Math.max(4, percent * height);

            const r = Math.floor(99 + (192 - 99) * percent);
            const g = Math.floor(102 + (132 - 102) * (1 - percent));
            const b = Math.floor(241 + (252 - 241) * percent);

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, height - barHeight, barWidth, barHeight);

            x += barWidth + 2;
          }
        } else {
          // Dynamic Algorithmic Spectrum Visualizer (CORS Safe Fallback)
          frameCount++;
          for (let i = 0; i < barCount; i++) {
            const wave = Math.sin((frameCount * 0.15) + (i * 0.4)) * 0.5 + 0.5;
            const wave2 = Math.cos((frameCount * 0.08) - (i * 0.2)) * 0.5 + 0.5;
            const percent = Math.min(1, Math.max(0.15, (wave * 0.6) + (wave2 * 0.4)));
            const barHeight = Math.max(4, percent * height);

            const r = Math.floor(99 + (192 - 99) * percent);
            const g = Math.floor(102 + (132 - 102) * (1 - percent));
            const b = Math.floor(241 + (252 - 241) * percent);

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, height - barHeight, barWidth, barHeight);

            x += barWidth + 2;
          }
        }
      } else {
        // Static standby grid lines when idle
        const barCount = 36;
        const barWidth = (width / barCount) - 2;
        let x = 0;
        ctx.fillStyle = 'rgba(61, 55, 88, 0.4)';
        for (let i = 0; i < barCount; i++) {
          const staticH = (i % 3 === 0 ? 8 : 4);
          ctx.fillRect(x, height - staticH, barWidth, staticH);
          x += barWidth + 2;
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isActive, isPlaying, height, analyserRef, hasWebAudioCors]);

  return (
    <canvas 
      ref={canvasRef} 
      className="visualizer-canvas"
      style={{ height: `${height}px` }}
    />
  );
};

export default VisualizerCanvas;
