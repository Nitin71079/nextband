export async function transcribeAudio(
  audioBlob
) {
  try {
    const formData =
      new FormData();

    formData.append(
      "file",
      audioBlob,
      "recording.webm"
    );

    const response =
      await fetch(
        "/api/transcribe",
        {
          method:
            "POST",
          body:
            formData,
        }
      );

    if (
      !response.ok
    ) {
      throw new Error(
        "Transcription failed"
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      error
    );

    return {
      success:
        false,

      transcript:
        "",
    };
  }
}