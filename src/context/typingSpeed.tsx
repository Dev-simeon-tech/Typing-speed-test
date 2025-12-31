import { createContext, useState } from "react";

export type DifficultyType = "easy" | "medium" | "hard";
export type ModeType = "timed (60s)" | "passage";

type TypingSpeedContextType = {
  wpm: number;
  setWpm: React.Dispatch<React.SetStateAction<number>>;
  accuracy: number;
  setDifficulty: React.Dispatch<React.SetStateAction<DifficultyType>>;
  mode: ModeType;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
  difficulty: DifficultyType;
  inCorrectChars: number;
  setInCorrectChars: React.Dispatch<React.SetStateAction<number>>;
  correctChars: number;
  setCorrectChars: React.Dispatch<React.SetStateAction<number>>;
  started: boolean;
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TypingSpeedContext = createContext({} as TypingSpeedContextType);

export const TypingSpeedContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [difficulty, setDifficulty] = useState<DifficultyType>("easy");
  const [mode, setMode] = useState<ModeType>("timed (60s)");
  const [correctChars, setCorrectChars] = useState(0);
  const [inCorrectChars, setInCorrectChars] = useState(0);
  const [started, setStarted] = useState(false);

  const value = {
    wpm,
    setWpm,
    accuracy,
    setAccuracy,
    difficulty,
    setDifficulty,
    mode,
    setMode,
    correctChars,
    setCorrectChars,
    inCorrectChars,
    setInCorrectChars,
    started,
    setStarted,
  };

  return (
    <TypingSpeedContext.Provider value={value}>
      {children}
    </TypingSpeedContext.Provider>
  );
};
