import MCQ from "./QuestionTypes/MCQ";
import TFNG from "./QuestionTypes/TFNG";
import MatchingHeadings from "./QuestionTypes/MatchingHeadings";
import MatchingInformation from "./QuestionTypes/MatchingInformation";
import TextInput from "./QuestionTypes/TextInput";
import MatchingFeatures from "./QuestionTypes/MatchingFeatures";
import MatchingSentenceEndings from "./QuestionTypes/MatchingSentenceEndings";
import TableCompletion from "./QuestionTypes/TableCompletion";
import NoteCompletion from "./QuestionTypes/NoteCompletion";
import DiagramLabel from "./QuestionTypes/DiagramLabel";
import FlowChartCompletion from "./QuestionTypes/FlowChartCompletion";
import Classification from "./QuestionTypes/Classification";

export default function QuestionRenderer({
  question,
  value,
  onChange,
}) {
  if (!question) {
    return null;
  }

  const type = String(question.type || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-");

  const textInputProps = {
    question,
    value,
    onChange,
  };

  switch (type) {
    case "multiple-choice":
      return (
        <MCQ
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "true-false-not-given":
    case "yes-no-not-given":
      return (
        <TFNG
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "matching-headings":
      return (
        <MatchingHeadings
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "matching-information":
      return (
        <MatchingInformation
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "matching-features":
      return (
        <MatchingFeatures
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "matching-sentence-endings":
      return (
        <MatchingSentenceEndings
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "classification":
      return (
        <Classification
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "sentence-completion":
    case "summary-completion":
    case "short-answer":
      return (
        <TextInput
          {...textInputProps}
          placeholder="Type your answer"
        />
      );

    case "table-completion":
      return (
        <TableCompletion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "note-completion":
      return (
        <NoteCompletion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "diagram-label":
    case "diagram-labels":
      return (
        <DiagramLabel
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "flow-chart-completion":
    case "flowchart-completion":
      return (
        <FlowChartCompletion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    default:
      return (
        <div
          style={{
            padding: 18,
            borderRadius: 10,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#991b1b",
          }}
        >
          <strong>Unsupported Question Type</strong>

          <div style={{ marginTop: 8 }}>
            {question.type || "Unknown"}
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 14,
              opacity: 0.8,
            }}
          >
            Add a renderer for this question type.
          </div>
        </div>
      );
  }
}