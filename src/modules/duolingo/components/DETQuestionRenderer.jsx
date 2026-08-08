import ReadAndCompleteRenderer from "./renderers/ReadAndCompleteRenderer";
import ReadAndSelectRenderer from "./renderers/ReadAndSelectRenderer";
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
