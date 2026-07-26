
import TextInput from "./TextInput.jsx";
export default function TableCompletion(props) {
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
        placeholder="Complete the table"
      />

      <small
        style={{
          color: "#64748b",
          marginTop: 10,
          display: "block",
        }}
      >
        Fill the missing table value.
      </small>
    </div>
  );
}