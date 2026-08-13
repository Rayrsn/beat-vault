import React, { useEffect, useRef } from 'react';
import { useAudio } from '../context/AudioContext';

const VisualizerCanvas = ({ height = 48, isActive = false }) => {
  const canvasRef = useRef(null);
  const { analyserRef, isPlaying } = useAudio();
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    canvas.height = height;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isActive && isPlaying && analyserRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        const barCount = 36;
        const barWidth = (width / barCount) - 2;
        let x = 0;

        for (let i = 0; i < barCount; i++) {
          const value = dataArray[i] || 0;
          const percent = value / 255;
          const barHeight = Math.max(4, percent * height);

          // Blueish Purple Gradient: Blue -> Purple -> Magenta Peak
          const r = Math.floor(99 + (192 - 99) * percent);
          const g = Math.floor(102 + (132 - 102) * (1 - percent));
          const b = Math.floor(241 + (252 - 241) * percent);

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(x, height - barHeight, barWidth, barHeight);

          x += barWidth + 2;
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
  }, [isActive, isPlaying, height, analyserRef]);

  return (
    <canvas 
      ref={canvasRef} 
      className="visualizer-canvas"
      style={{ height: `${height}px` }}
    />
  );
};

export default VisualizerCanvas;
