import {
  createContext,
  useContext,
  useState,
} from "react";

const ExamContext =
  createContext();

export function ExamProvider({
  children,
}) {
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