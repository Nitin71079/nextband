export default function AudioPlayback({
  audioUrl,
}) {
  if (!audioUrl)
    return null;

  return (
    <audio
      controls
      style={{
        width: "100%",
        marginTop:
          "20px",
      }}
    >
      <source
        src={audioUrl}
      />
    </audio>
  );
}