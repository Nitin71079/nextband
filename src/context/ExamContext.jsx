import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const ExamContext = createContext();

export function ExamProvider({ children }) {
  // Active Exam Prep Track: "IELTS" | "DET" | "TOEFL" | "GRE" | "CAT"
  const [activeTrack, setActiveTrack] = useState(() => {
    return localStorage.getItem("knarrow_active_track") || "IELTS";
  });

  const selectTrack = (track, navigate) => {
    setActiveTrack(track);
    localStorage.setItem("knarrow_active_track", track);
    if (navigate) {
      if (track === "PTE") navigate("/pte");
      else if (track === "TOEFL") navigate("/toefl");
      else if (track === "DET") navigate("/duolingo");
      else if (track === "GRE") navigate("/gre");
      else if (track === "CAT") navigate("/cat");
      else if (track === "ACT") navigate("/act");
      else if (track === "SAT") navigate("/sat");
      else if (track === "GMAT") navigate("/gmat");
      else if (track === "GATE") navigate("/gate");
      else if (track === "JEE") navigate("/jee");
      else if (track === "NEET") navigate("/neet");
      else if (track === "CLAT") navigate("/clat");
      else navigate("/dashboard");
    }
  };

  /* ===========================
     BAND / SCORE SCORES
  =========================== */
  const [readingBand, setReadingBand] = useState(null);
  const [listeningBand, setListeningBand] = useState(null);
  const [writingBand, setWritingBand] = useState(null);
  const [speakingBand, setSpeakingBand] = useState(null);

  /* ===========================
     CURRENT EXAM STATE
  =========================== */
  const [examType, setExamType] = useState(null);
  const [currentSection, setCurrentSection] = useState("reading");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);

  return (
    <ExamContext.Provider
      value={{
        activeTrack,
        setActiveTrack,
        selectTrack,

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
  return useContext(ExamContext);
}