import { useRef } from "react";
import "../../styles/listening/AudioPlayer.css";
export default function AudioPlayer({
    audioUrl,
    startTime = 0,
    endTime = null,
}) {

    const audioRef = useRef(null);

    // Stop playback at the end of the current section.
    // Do NOT seek when the section prop changes – the audio should
    // keep playing uninterrupted as the student navigates between
    // section question panels.
    const handleTimeUpdate = () => {

        if (!audioRef.current) return;

        if (
            endTime !== null &&
            audioRef.current.currentTime >= endTime
        ) {

            audioRef.current.pause();

        }

    };

    return (

        <div className="audio-card">

            <audio
                ref={audioRef}
                controls
                preload="metadata"
                controlsList="nodownload"
                onTimeUpdate={handleTimeUpdate}
                style={{
                    width: "100%",
                }}
            >

                <source
                    src={audioUrl}
                    type="audio/mpeg"
                />

                Your browser does not support the audio element.

            </audio>

        </div>

    );

}