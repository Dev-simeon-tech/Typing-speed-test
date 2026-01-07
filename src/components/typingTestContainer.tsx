import { useState, useEffect, useEffectEvent } from "react";
import { useTypingSpeedContext } from "../hooks/useTypingSpeedContext";

import TypingText from "../features/typingText";
import StatsAndSettingsBar from "../features/statsAndSettingsBar";
import TypingSpeedResults from "../features/typingSpeedResults";
import { calculateAccuracy } from "../utils/calculateAccuracy";
import { calculateWPM } from "../utils/calculateWpm";

const TypingSpeedTestContainer = () => {
  const {
    ended,
    setAccuracy,
    setCorrectChars,
    setInCorrectChars,
    setWpm,
    mode,
    difficulty,
  } = useTypingSpeedContext();
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [errorKeystrokes, setErrorKeystrokes] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  let duration = 0;
  switch (mode) {
    case "timed (60s)":
      duration = 60;
  }
  const reset = () => {
    setErrorKeystrokes(0);
    setTotalKeystrokes(0);
    setTotalTime(0);
  };
  useEffect(() => {
    reset();
  }, [mode, difficulty]);

  const onTestEnd = useEffectEvent((ended: boolean) => {
    if (ended) {
      setWpm(
        calculateWPM(totalKeystrokes, mode === "passage" ? totalTime : duration)
      );
      setAccuracy(calculateAccuracy(totalKeystrokes, errorKeystrokes));
      setCorrectChars(totalKeystrokes - errorKeystrokes);
      setInCorrectChars(errorKeystrokes);
    } else {
      reset();
    }
  });

  useEffect(() => {
    onTestEnd(ended);
  }, [ended]);

  return (
    <>
      {!ended ? (
        <div className='mt-8 md:mt-10 lg:mt-16'>
          <StatsAndSettingsBar
            totalKeystrokes={totalKeystrokes}
            errorKeystrokes={errorKeystrokes}
            setTotalTime={setTotalTime}
          />
          <TypingText
            setTotalKeystrokes={setTotalKeystrokes}
            setErrorKeystrokes={setErrorKeystrokes}
          />
        </div>
      ) : (
        <div>
          <TypingSpeedResults />
        </div>
      )}
    </>
  );
};

export default TypingSpeedTestContainer;
