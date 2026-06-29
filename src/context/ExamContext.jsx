import {
  createContext,
  useContext,
  useState,
} from "react";

const ExamContext = createContext();

export function ExamProvider({
  children,
}) {

  /* ===========================
     BAND SCORES
  =========================== */

  const [
    readingBand,
    setReadingBand,
  ] = useState(null);

  const [
    listeningBand,
    setListeningBand,
  ] = useState(null);

  const [
    writingBand,
    setWritingBand,
  ] = useState(null);

  const [
    speakingBand,
    setSpeakingBand,
  ] = useState(null);

  /* ===========================
     CURRENT EXAM
  =========================== */

  const [
    examType,
    setExamType,
  ] = useState(null);

  const [
    currentSection,
    setCurrentSection,
  ] = useState("reading");

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(1);

  /* ===========================
     TIMER
  =========================== */

  const [
    timeRemaining,
    setTimeRemaining,
  ] = useState(null);

  /* ===========================
     ANSWERS
  =========================== */

  const [
    answers,
    setAnswers,
  ] = useState({});

  /* ===========================
     FLAGGED QUESTIONS
  =========================== */

  const [
    flaggedQuestions,
    setFlaggedQuestions,
  ] = useState([]);

  /* ===========================
     EXAM STATUS
  =========================== */

  const [
    examStarted,
    setExamStarted,
  ] = useState(false);

  const [
    examFinished,
    setExamFinished,
  ] = useState(false);

  return (

    <ExamContext.Provider

      value={{

        readingBand,
        setReadingBand,

        listeningBand,
        setListeningBand,

        writingBand,
        setWritingBand,

        speakingBand,
        setSpeakingBand,

        examType,
        setExamType,

        currentSection,
        setCurrentSection,

        currentQuestion,
        setCurrentQuestion,

        timeRemaining,
        setTimeRemaining,

        answers,
        setAnswers,

        flaggedQuestions,
        setFlaggedQuestions,

        examStarted,
        setExamStarted,

        examFinished,
        setExamFinished,

      }}

    >

      {children}

    </ExamContext.Provider>

  );

}

export function useExam() {

  return useContext(

    ExamContext

  );

}