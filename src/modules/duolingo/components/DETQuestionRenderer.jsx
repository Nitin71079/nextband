import ReadAndCompleteRenderer from "./renderers/ReadAndCompleteRenderer";
import ReadAndSelectRenderer from "./renderers/ReadAndSelectRenderer";
import SingleWordReadAndSelectRenderer from "./renderers/SingleWordReadAndSelectRenderer";
import FillInTheBlanksRenderer from "./renderers/FillInTheBlanksRenderer";
import ListenAndTypeRenderer from "./renderers/ListenAndTypeRenderer";
import ReadAloudRenderer from "./renderers/ReadAloudRenderer";
import InteractiveReadingRenderer from "./renderers/InteractiveReadingRenderer";
import InteractiveWritingRenderer from "./renderers/InteractiveWritingRenderer";
import InteractiveSpeakingRenderer from "./renderers/InteractiveSpeakingRenderer";
import WritingSampleRenderer from "./renderers/WritingSampleRenderer";
import SpeakingSampleRenderer from "./renderers/SpeakingSampleRenderer";

export default function DETQuestionRenderer({ item, onSubmitResponse, submitting }) {
  if (!item) return <div>No DET item loaded.</div>;

  const handleSub = (val, accuracy = 1.0) => {
    if (onSubmitResponse) {
      onSubmitResponse(item.id, val, accuracy);
    }
  };

  switch (item.type) {
    case "read-and-complete":
      return <ReadAndCompleteRenderer item={item} onSubmit={handleSub} submitting={submitting} />;

    case "read-and-select":
      return <ReadAndSelectRenderer item={item} onSubmit={handleSub} submitting={submitting} />;

    case "single-word-read-select":
      return (
        <SingleWordReadAndSelectRenderer
          word={item.word || "handen"}
          isReal={item.isReal || false}
          timeRemaining={item.timeRemaining || "0:03"}
          onSelectAnswer={(choice) => handleSub(choice, choice === item.isReal ? 1.0 : 0.0)}
        />
      );

    case "fill-in-the-blanks":
      return (
        <FillInTheBlanksRenderer
          sentenceBefore={item.sentenceBefore || "The number of website error reports we are receiving is "}
          targetWord={item.targetWord || "alarming"}
          sentenceAfter={item.sentenceAfter || ", so we must fix them right away."}
          timeRemaining={item.timeRemaining || "0:02"}
          onSubmit={(val, isCorrect) => handleSub(val, isCorrect ? 1.0 : 0.0)}
        />
      );

    case "listen-and-type":
      return <ListenAndTypeRenderer item={item} onSubmit={handleSub} submitting={submitting} />;

    case "read-aloud":
      return <ReadAloudRenderer item={item} onSubmit={handleSub} submitting={submitting} />;

    case "interactive-reading":
      return <InteractiveReadingRenderer item={item} onSubmit={handleSub} submitting={submitting} />;

    case "interactive-writing":
      return <InteractiveWritingRenderer item={item} onSubmit={handleSub} submitting={submitting} />;

    case "interactive-speaking":
      return <InteractiveSpeakingRenderer item={item} onSubmit={handleSub} submitting={submitting} />;

    case "writing-sample":
      return <WritingSampleRenderer item={item} onSubmit={handleSub} submitting={submitting} />;

    case "speaking-sample":
      return <SpeakingSampleRenderer item={item} onSubmit={handleSub} submitting={submitting} />;

    default:
      return <div>Unsupported DET item type: {item.type}</div>;
  }
}
