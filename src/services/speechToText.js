export async function speechToText(
  audioBlob
) {
  try {
    const response =
      await fetch(
        "/api/transcribe",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "audio/webm",
          },
          body: audioBlob,
        }
      );

    const data =
      await response.json();

    return data;
  } catch (error) {
    console.error(
      "Speech To Text Error:",
      error
    );

    return {
      success: false,
      transcript: "",
      error:
        error.message,
    };
  }
}