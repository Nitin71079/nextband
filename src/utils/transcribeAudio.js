import axios from "axios";

export async function transcribeAudio(
  audioBlob
) {
  try {
    const formData =
      new FormData();

    formData.append(
      "file",
      audioBlob,
      "speech.webm"
    );

    formData.append(
      "model",
      "whisper-1"
    );

    const response =
      await axios.post(
        "https://api.openai.com/v1/audio/transcriptions",

        formData,

        {
          headers: {
            Authorization: `Bearer ${
              import.meta
                .env
                .VITE_OPENAI_API_KEY
            }`,

            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response
      .data.text;
  } catch (error) {
    console.error(
      error
    );

    return "Transcription failed.";
  }
}