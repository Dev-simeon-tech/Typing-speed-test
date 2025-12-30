import { useContext } from "react";
import { TypingSpeedContext } from "../context/typingSpeed";

export const useTypingSpeedContext = () => {
  const ctx = useContext(TypingSpeedContext);
  if (!ctx) throw new Error("useWeather must be used within WeatherProvider");
  return ctx;
};
