import { TypingSpeedContext } from "../context/typingSpeed";
import { useState } from "react";
import type {
  ModeType,
  DifficultyType,
  WpmSample,
} from "../context/typingSpeed";

const TypingSpeedContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [difficulty, setDifficulty] = useState<DifficultyType>("medium");
  const [mode, setMode] = useState<ModeType>("timed (60s)");
  const [correctChars, setCorrectChars] = useState(0);
  const [inCorrectChars, setInCorrectChars] = useState(0);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [chartData, setChartData] = useState<WpmSample[]>([]);

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
    ended,
    setEnded,
    isPaused,
    setIsPaused,
    chartData,
    setChartData,
  };

  return (
    <TypingSpeedContext.Provider value={value}>
      {children}
    </TypingSpeedContext.Provider>
  );
};

export default TypingSpeedContextProvider;
