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

    const response =
      await axios.post(
        "/api/transcribe",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return (
      response.data
        .transcript ||
      "No transcript returned."
    );
  } catch (error) {
    console.error(
      error
    );

    return "Transcription failed.";
  }
}