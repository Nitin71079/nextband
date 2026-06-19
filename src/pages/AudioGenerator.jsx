import { useState } from "react";

export default function AudioGenerator() {
const [script, setScript] =
useState("");

const [loading, setLoading] =
useState(false);

const [audioUrl, setAudioUrl] =
useState("");

async function handleGenerate() {
  setLoading(true);

  setTimeout(() => {
    setAudioUrl(
  "/listening/section1.mp3"
);

    setLoading(false);
  }, 1000);
}
return (
<div
style={{
maxWidth: "1000px",
margin: "0 auto",
padding: "40px",
}}
> <h1>
AI Audio Generator </h1>

  <textarea
    rows={12}
    value={script}
    onChange={(e) =>
      setScript(
        e.target.value
      )
    }
    placeholder="Paste IELTS listening script..."
    style={{
      width: "100%",
      padding: "20px",
    }}
  />

  <button
    className="primary-btn"
    onClick={
      handleGenerate
    }
  >
    {loading
      ? "Generating..."
      : "Generate Audio"}
  </button>

  {audioUrl && (
    <audio
      controls
      src={audioUrl}
      style={{
        width: "100%",
        marginTop:
          "20px",
      }}
    />
  )}
</div>

);
}
