import TextInput from "./TextInput";
export default function FlowChartCompletion(props) {
  return (
    <div>

      <p
        style={{
          fontWeight: 600,
          marginBottom: 15,
        }}
      >
        {props.question.question}
      </p>

      <TextInput
        {...props}
        placeholder="Complete the flow chart"
      />

      <small
        style={{
          display: "block",
          marginTop: 10,
          color: "#64748b",
        }}
      >
        Enter the missing word(s) exactly as they appear in the passage.
      </small>

    </div>
  );
}