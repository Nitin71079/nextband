export default function AudioPlayer({
  audioUrl,
}) {
  console.log(
    "Audio URL:",
    audioUrl
  );

  return (
    <audio
      controls
      src={audioUrl}
      style={{
        width: "100%",
      }}
    />
  );
}