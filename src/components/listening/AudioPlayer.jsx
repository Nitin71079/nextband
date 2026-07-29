import { useRef } from "react";
import "../../styles/listening/AudioPlayer.css";

export default function AudioPlayer({ audioUrl, startTime = 0, endTime = null }) {
  const audioRef = useRef(null);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    if (endTime !== null && audioRef.current.currentTime >= endTime) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="audio-card">
      <div className="audio-card-label">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 14.5v-9l6 4.5z" />
        </svg>
        Audio
      </div>
      <audio
        ref={audioRef}
        controls
        preload="metadata"
        controlsList="nodownload"
        onTimeUpdate={handleTimeUpdate}
        style={{ flex: 1, minWidth: 0 }}
      >
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
