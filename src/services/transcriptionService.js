export async function transcribeAudio(
  audioBlob
) {
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

  return await response.json();
}