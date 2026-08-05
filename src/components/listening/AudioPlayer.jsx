import { useRef, useState, useEffect } from "react";
import "../../styles/listening/AudioPlayer.css";

export default function AudioPlayer({ audioUrl, startTime = 0, endTime = null }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100

  /* ── Sync currentTime when startTime or audioUrl changes ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const targetTime = startTime || 0;
      try {
        audio.currentTime = targetTime;
      } catch (e) {
        console.warn("Audio seek error:", e);
      }
      setPlaying(false);
      setProgress(0);
    }
  }, [audioUrl, startTime]);

  /* ── Seek to startTime once metadata loads ── */
  function handleLoadedMetadata() {
    if (audioRef.current) {
      const targetTime = startTime || 0;
      audioRef.current.currentTime = targetTime;
    }
  }

  /* ── Track progress + enforce endTime ── */
  function handleTimeUpdate() {
    const audio = audioRef.current;
    if (!audio) return;

    const start = startTime || 0;
    const end = endTime ?? audio.duration ?? 0;

    // Enforce startTime boundary if audio hasn't seeked yet
    if (start > 0 && audio.currentTime < start - 2) {
      audio.currentTime = start;
    }

    // Enforce endTime boundary
    if (endTime !== null && audio.currentTime >= endTime) {
      audio.pause();
      setPlaying(false);
      return;
    }

    const duration = end - start;
    const elapsed = audio.currentTime - start;
    setProgress(duration > 0 ? Math.min(Math.max((elapsed / duration) * 100, 0), 100) : 0);
  }

  function handleEnded() {
    setPlaying(false);
    setProgress(100);
  }

  function handleError(e) {
    console.warn("Audio playback error encountered:", e);
    // If error occurs mid-stream, attempt to recover by advancing slightly
    const audio = audioRef.current;
    if (audio && playing) {
      try {
        audio.currentTime += 0.5;
        audio.play().catch(() => setPlaying(false));
      } catch {}
    } else {
      setPlaying(false);
    }
  }

  /* ── Seek on progress bar click ── */
  function handleSeek(e) {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const start = startTime || 0;
    const end = endTime ?? audio.duration ?? 0;
    const newTime = start + ratio * (end - start);
    audio.currentTime = Math.max(start, Math.min(end, newTime));
    setProgress(ratio * 100);
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      // Ensure audio is positioned within bounds before playing
      if (startTime > 0 && audio.currentTime < startTime) {
        audio.currentTime = startTime;
      }
      audio.play().then(() => setPlaying(true)).catch((err) => {
        console.error("Audio play error:", err);
        setPlaying(false);
      });
    }
  }

  return (
    <div className="audio-card">
      <div className="audio-card-label">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 14.5v-9l6 4.5z" />
        </svg>
        Audio
      </div>

      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
        style={{ display: "none" }}
      >
        <source src={audioUrl} type="audio/mpeg" />
      </audio>

      {/* Custom controls */}
      <div className="audio-custom-controls">
        {/* Play / Pause button */}
        <button
          className={`audio-play-btn${playing ? " playing" : ""}`}
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            /* Pause icon */
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            /* Play icon */
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        {/* Progress bar — no time labels */}
        <div
          className="audio-progress-track"
          onClick={handleSeek}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="audio-progress-fill"
            style={{ width: `${progress}%` }}
          />
          <div
            className="audio-progress-thumb"
            style={{ left: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
