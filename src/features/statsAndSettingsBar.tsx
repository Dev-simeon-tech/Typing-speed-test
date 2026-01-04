import { useEffect } from "react";
import { useTypingTimer } from "../hooks/useTypingTimer";
import { useTypingSpeedContext } from "../hooks/useTypingSpeedContext";
import Dropdown from "../components/ui/dropdown";
import type { ModeType } from "../context/typingSpeed";
import type { DifficultyType } from "../context/typingSpeed";
import { calculateAccuracy } from "../utils/calculateAccuracy";
import { calculateWPM } from "../utils/calculateWpm";

const ModeArray: ModeType[] = ["timed (60s)", "passage"];
const difficultyArray: DifficultyType[] = ["easy", "medium", "hard"];

type StatsAndSettingsBarType = {
  totalKeystrokes: number;
  errorKeystrokes: number;
};

const StatsAndSettingsBar = ({
  totalKeystrokes,
  errorKeystrokes,
}: StatsAndSettingsBarType) => {
  const {
    started,
    difficulty,
    setDifficulty,
    setMode,
    mode,
    ended,
    setEnded,
    setWpm,
    setAccuracy,
    setCorrectChars,
    setInCorrectChars,
  } = useTypingSpeedContext();
  let duration = 0;
  switch (mode) {
    case "timed (60s)":
      duration = 60;
  }
  const { time, start, reset } = useTypingTimer({
    mode: mode === "passage" ? "passage" : "timed",
    duration,
  });

  // handles timer changes to state
  useEffect(() => {
    if (started) {
      start();
    } else {
      reset();
    }
  }, [started, start, reset]);

  useEffect(() => {
    if (started && mode !== "passage" && time === 0) {
      setEnded(true);
    }
  }, [started, time, setEnded, mode]);

  const elapsedTime = mode === "passage" ? time : duration - time;
  const liveWpm = calculateWPM(totalKeystrokes, elapsedTime);
  const liveAccuracy = calculateAccuracy(totalKeystrokes, errorKeystrokes);

  useEffect(() => {
    if (ended) {
      setAccuracy(liveAccuracy);
      setWpm(liveWpm);
      setInCorrectChars(errorKeystrokes);
      setCorrectChars(totalKeystrokes - errorKeystrokes);
    }
  }, [ended]);

  return (
    <div className='flex flex-col lg:flex-row gap-4 '>
      <div className='text-preset-3-mobile flex justify-between  *:flex *:flex-col *:gap-2 *:items-center *:grow   divide-x divide-neutral-700 md:text-preset-3 text-neutral-400'>
        <p>
          WPM: <span className='text-neutral-0 text-preset-2'>{liveWpm}</span>
        </p>
        <p>
          Accuracy: <span className='text-preset-2'>{liveAccuracy}</span>
        </p>
        <p>
          Time: <span className='text-preset-2'>{time}</span>
        </p>
      </div>

      {/* <div></div>  */}
      <div className='flex gap-2.5 md:hidden justify-between'>
        <Dropdown
          itemsArr={ModeArray}
          currentItem={mode}
          renderItem={(currentMode, index) => (
            <button
              key={index}
              onClick={() => setMode(currentMode)}
              className='capitalize flex gap-3 items-center p-2.5 w-full text-preset-5 text-left'
            >
              <div
                role='button'
                className={`h-6 w-6 rounded-full  bg-neutral-800 ${
                  mode === currentMode
                    ? "border-7 border-blue-500"
                    : "border-2 border-neutral-0"
                }`}
              ></div>
              <p>{currentMode}</p>
            </button>
          )}
        />
        <Dropdown
          itemsArr={difficultyArray}
          currentItem={difficulty}
          renderItem={(currentDifficulty, index) => (
            <button
              key={index}
              onClick={() => setDifficulty(currentDifficulty)}
              className='capitalize flex gap-3 items-center p-2.5 w-full text-preset-5 text-left'
            >
              <div
                role='button'
                className={`h-6 w-6 rounded-full  bg-neutral-800 ${
                  difficulty === currentDifficulty
                    ? "border-7 border-blue-500"
                    : "border-2 border-neutral-0"
                }`}
              ></div>
              <p>{currentDifficulty}</p>
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default StatsAndSettingsBar;
