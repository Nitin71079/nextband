export default function MicrophoneStatus({
  audioBlob,
}) {
  return (
    <div
      style={{
        marginTop:
          "15px",

        padding:
          "12px",

        borderRadius:
          "10px",

        background:
          audioBlob
            ? "#dcfce7"
            : "#fee2e2",
      }}
    >
      {audioBlob
        ? "Microphone recording ready"
        : "No recording yet"}
    </div>
  );
}