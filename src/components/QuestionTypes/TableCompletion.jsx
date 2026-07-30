import TextInput from "./TextInput.jsx";

export default function TableCompletion(props) {
  return (
    <TextInput
      {...props}
      placeholder="Complete the table entry…"
    />
  );
}
