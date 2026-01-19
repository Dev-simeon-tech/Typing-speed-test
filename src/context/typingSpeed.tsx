import { createContext } from "react";

export type WpmSample = {
  time: number; // seconds elapsed
  wpm: number;
};
export type DifficultyType = "easy" | "medium" | "hard";
export type ModeType =
  | "timed (60s)"
  | "passage"
  | "timed (120s)"
  | "timed (30s)"
  | "timed (15s)";

type TypingSpeedContextType = {
  wpm: number;
  setWpm: React.Dispatch<React.SetStateAction<number>>;
  accuracy: number;
  setAccuracy: React.Dispatch<React.SetStateAction<number>>;
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
  ended: boolean;
  setEnded: React.Dispatch<React.SetStateAction<boolean>>;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  chartData: WpmSample[];
  setChartData: React.Dispatch<React.SetStateAction<WpmSample[]>>;
};

export const TypingSpeedContext = createContext({} as TypingSpeedContextType);
