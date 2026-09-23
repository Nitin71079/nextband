import React, { useEffect, useRef } from "react";

/**
 * Real-Time Audio Waveform Canvas Visualizer
 * Renders dynamic animated audio frequencies during speaking test recordings.
 */
export default function AudioWaveformVisualizer({ isRecording = false, color = "#0284c7" }) {
  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;

      for (let x = 0; x < width; x += 4) {
        const amplitude = isRecording
          ? (Math.sin(x * 0.05 + phase) * 0.4 + Math.cos(x * 0.02 + phase * 1.5) * 0.3 + 0.3) * (height / 2.5)
          : Math.sin(x * 0.03 + phase) * 4;

        const y = centerY + amplitude;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Draw secondary glowing shadow wave
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      for (let x = 0; x < width; x += 6) {
        const amplitude = isRecording
          ? Math.cos(x * 0.04 - phase * 0.8) * (height / 3.2)
          : Math.cos(x * 0.02 - phase) * 2;
        const y = centerY + amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += isRecording ? 0.12 : 0.03;
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isRecording, color]);

  return (
    <div style={{ width: "100%", background: "rgba(15, 23, 42, 0.8)", borderRadius: 16, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: isRecording ? "#ef4444" : "#22c55e", boxShadow: isRecording ? "0 0 10px #ef4444" : "0 0 10px #22c55e" }} />
      <span style={{ fontSize: 12, fontWeight: 800, color: "#cbd5e1", minWidth: 100 }}>
        {isRecording ? "🎙️ RECORDING VOICE..." : "READY TO RECORD"}
      </span>
      <canvas ref={canvasRef} width={300} height={40} style={{ width: "100%", height: 40 }} />
    </div>
  );
}
