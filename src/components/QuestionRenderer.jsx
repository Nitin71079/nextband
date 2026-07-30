import MCQ from "./QuestionTypes/MCQ";
import TFNG from "./QuestionTypes/TFNG";
import YNNG from "./QuestionTypes/YNNG";
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
function UnsupportedQuestion({ type }) {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        border: "1px solid #fecaca",
        background: "#fef2f2",
        color: "#991b1b",
      }}
    >
      <h3
        style={{
          marginBottom: 10,
        }}
      >
        Unsupported Question Type
      </h3>

      <strong>{type || "Unknown"}</strong>

      <p
        style={{
          marginTop: 10,
          fontSize: 14,
          lineHeight: 1.6,
        }}
      >
        No renderer has been registered for this question type.
      </p>
    </div>
  );
}

export default function QuestionRenderer({
  question,
  value,
  onChange,
}) {
  if (!question) return null;

  const aliases = {
    "diagram-labels": "diagram-label",
    "flowchart-completion": "flow-chart-completion",
  };

  const type = (
    aliases[
      String(question.type || "")
        .trim()
        .toLowerCase()
        .replace(/_/g, "-")
    ] ||
    String(question.type || "")
      .trim()
      .toLowerCase()
      .replace(/_/g, "-")
  );

  const commonProps = {
    question,
    value,
    onChange,
  };

  switch (type) {
    case "multiple-choice":
      return <MCQ {...commonProps} />;

    case "true-false-not-given":
      return <TFNG {...commonProps} />;

    case "yes-no-not-given":
      return <YNNG {...commonProps} />;

    case "matching-headings":
      return <MatchingHeadings {...commonProps} />;

    case "matching-information":
      return <MatchingInformation {...commonProps} />;

    case "matching-features":
      return <MatchingFeatures {...commonProps} />;

    case "matching-sentence-endings":
      return (
        <MatchingSentenceEndings
          {...commonProps}
        />
      );

    case "classification":
      return (
        <Classification
          {...commonProps}
        />
      );

    case "sentence-completion":
    case "summary-completion":
    case "short-answer":
      return (
        <TextInput
          {...commonProps}
          placeholder="Type your answer"
        />
      );

    case "table-completion":
      return (
        <TableCompletion
          {...commonProps}
        />
      );

    case "note-completion":
      return (
        <NoteCompletion
          {...commonProps}
        />
      );

    case "diagram-label":
      return (
        <DiagramLabel
          {...commonProps}
        />
      );

    case "flow-chart-completion":
      return (
        <FlowChartCompletion
          {...commonProps}
        />
      );

    default:
      return (
        <UnsupportedQuestion
          type={question.type}
        />
      );
  }
}