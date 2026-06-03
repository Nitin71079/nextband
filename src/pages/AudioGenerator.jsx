import { useState } from "react";

export default function AudioGenerator() {
  const [script, setScript] =
    useState("");

  const [audioUrl, setAudioUrl] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function generateAudio() {
    try {
      setLoading(true);
      setError("");

      const response =
        await fetch(
          "/api/generate-listening-audio",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                script,
              }),
          }
        );

      if (!response.ok) {
        throw new Error(
          "Audio generation failed"
        );
      }

      const blob =
        await response.blob();

      const url =
        URL.createObjectURL(blob);

      setAudioUrl(url);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  function loadSampleScript() {
    setScript(`
Receptionist:
Good morning. Greenfield Student Housing.

Student:
Hello. I'm looking for accommodation near the university.

Receptionist:
Certainly. We currently have two apartments available.

Student:
How much is the weekly rent?

Receptionist:
The first apartment costs one hundred and eighty pounds per week.

Student:
That sounds good.

Receptionist:
Would you like to arrange a viewing?

Student:
Yes, please.
    `);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1>
        IELTS Listening Audio Generator
      </h1>

      <p>
        Generate realistic listening
        audio using OpenAI TTS.
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={
            loadSampleScript
          }
        >
          Load Sample Script
        </button>

        <button
          className="primary-btn"
          onClick={
            generateAudio
          }
          disabled={
            loading ||
            !script.trim()
          }
        >
          {loading
            ? "Generating..."
            : "Generate Audio"}
        </button>
      </div>

      <textarea
        value={script}
        onChange={(e) =>
          setScript(
            e.target.value
          )
        }
        placeholder="Paste listening script here..."
        rows={18}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          border:
            "1px solid #cbd5e1",
          fontSize: "15px",
        }}
      />

      {error && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background:
              "#fee2e2",
            borderRadius:
              "12px",
            color: "#991b1b",
          }}
        >
          {error}
        </div>
      )}

      {audioUrl && (
        <div
          style={{
            marginTop: "30px",
            background:
              "#ffffff",
            padding: "25px",
            borderRadius:
              "16px",
          }}
        >
          <h2>
            Generated Audio
          </h2>

          <audio
            controls
            style={{
              width: "100%",
            }}
            src={audioUrl}
          />

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <a
              href={audioUrl}
              download="listening001_section1.mp3"
            >
              Download MP3
            </a>
          </div>
        </div>
      )}
    </div>
  );
}