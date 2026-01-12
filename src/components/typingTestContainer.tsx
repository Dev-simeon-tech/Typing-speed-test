import { useState, useEffect, useEffectEvent } from "react";
import { useTypingSpeedContext } from "../hooks/useTypingSpeedContext";
import useDuration from "../hooks/useDuration";

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
    setIsPaused,
    started,
  } = useTypingSpeedContext();
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [errorKeystrokes, setErrorKeystrokes] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const { duration } = useDuration();

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

  useEffect(() => {
    const timerPause = () => {
      if (!ended && started) {
        setIsPaused(true);
      }
    };

    document.addEventListener("visibilitychange", timerPause);
    window.addEventListener("blur", timerPause);

    return () => {
      document.removeEventListener("visibilitychange", timerPause);
      window.removeEventListener("blur", timerPause);
    };
  }, [setIsPaused, ended, started]);

  return (
    <>
      {!ended ? (
        <div className='typing-test-cont mt-8 md:mt-10 lg:mt-16'>
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
