import React from "react";
import GMATProblemSolving from "./GMATProblemSolving";
import GMATCriticalReasoning from "./GMATCriticalReasoning";
import GMATReadingComprehension from "./GMATReadingComprehension";
import GMATDataSufficiency from "./GMATDataSufficiency";
import GMATMultiSourceReasoning from "./GMATMultiSourceReasoning";
import GMATTableAnalysis from "./GMATTableAnalysis";
import GMATGraphicsInterpretation from "./GMATGraphicsInterpretation";
import GMATTwoPartAnalysis from "./GMATTwoPartAnalysis";

export default function GMATQuestionRenderer({ question, selectedOption, onSelectOption }) {
  if (!question) return null;

  switch (question.questionType) {
    case "PROBLEM_SOLVING":
      return <GMATProblemSolving question={question} selectedOption={selectedOption} onSelectOption={onSelectOption} />;
    case "CRITICAL_REASONING":
      return <GMATCriticalReasoning question={question} selectedOption={selectedOption} onSelectOption={onSelectOption} />;
    case "READING_COMPREHENSION":
      return <GMATReadingComprehension question={question} selectedOption={selectedOption} onSelectOption={onSelectOption} />;
    case "DATA_SUFFICIENCY":
      return <GMATDataSufficiency question={question} selectedOption={selectedOption} onSelectOption={onSelectOption} />;
    case "MULTI_SOURCE_REASONING":
      return <GMATMultiSourceReasoning question={question} selectedOption={selectedOption} onSelectOption={onSelectOption} />;
    case "TABLE_ANALYSIS":
      return <GMATTableAnalysis question={question} selectedOption={selectedOption} onSelectOption={onSelectOption} />;
    case "GRAPHICS_INTERPRETATION":
      return <GMATGraphicsInterpretation question={question} selectedOption={selectedOption} onSelectOption={onSelectOption} />;
    case "TWO_PART_ANALYSIS":
      return <GMATTwoPartAnalysis question={question} selectedOption={selectedOption} onSelectOption={onSelectOption} />;
    default:
      return <GMATProblemSolving question={question} selectedOption={selectedOption} onSelectOption={onSelectOption} />;
  }
}
