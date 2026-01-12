import { useEffect } from "react";
import { useTypingTimer } from "../hooks/useTypingTimer";
import { useTypingSpeedContext } from "../hooks/useTypingSpeedContext";
import useDuration from "../hooks/useDuration";

import { Button } from "../components/ui/button";
import Dropdown from "../components/ui/dropdown";
import type { ModeType } from "../context/typingSpeed";
import type { DifficultyType } from "../context/typingSpeed";

import { calculateAccuracy } from "../utils/calculateAccuracy";
import { calculateWPM } from "../utils/calculateWpm";
import { formatTime } from "../utils/formatTime";
import { getTimerColorScheme } from "../utils/getTimerColorScheme";
import { getModeValue } from "../utils/getModeValue";

const ModeArray: ModeType[] = [
  "timed (120s)",
  "timed (60s)",
  "timed (30s)",
  "timed (15s)",
  "passage",
];
const difficultyArray: DifficultyType[] = ["easy", "medium", "hard"];

type StatsAndSettingsBarType = {
  totalKeystrokes: number;
  errorKeystrokes: number;
  setTotalTime: React.Dispatch<React.SetStateAction<number>>;
};

const StatsAndSettingsBar = ({
  totalKeystrokes,
  errorKeystrokes,
  setTotalTime,
}: StatsAndSettingsBarType) => {
  const {
    started,
    difficulty,
    setDifficulty,
    setMode,
    mode,
    setEnded,
    isPaused,
  } = useTypingSpeedContext();
  const { duration } = useDuration();

  const { time, start, reset, pause } = useTypingTimer({
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
    if (isPaused) {
      pause();
    }
  }, [started, start, reset, isPaused, pause]);

  // handles typing test ending
  useEffect(() => {
    if (started && mode !== "passage" && time === 0) {
      setEnded(true);
    }
    return () => {
      if (started && mode === "passage") {
        setTotalTime(time);
      }
    };
  }, [started, time, setEnded, mode, setTotalTime]);

  const elapsedTime = mode === "passage" ? time : duration - time;
  const liveWpm = calculateWPM(totalKeystrokes, elapsedTime);
  const liveAccuracy = calculateAccuracy(totalKeystrokes, errorKeystrokes);

  return (
    <div className='flex flex-col lg:flex-wrap lg:justify-between lg:flex-row pb-4 gap-4 border-b border-neutral-700 '>
      <div className='text-preset-3-mobile flex justify-between *:grow *:flex *:flex-col md:*:grow-0  md:*:flex-row *:gap-2 *:items-center  md:justify-start md:space-x-5 md:[&_p:nth-child(-n+2)]:pr-5   divide-x divide-neutral-700 md:text-preset-3 text-neutral-400'>
        <p>
          WPM: <span className='text-neutral-0 text-preset-2'>{liveWpm}</span>
        </p>
        <p>
          Accuracy:{" "}
          <span
            className={`text-preset-2 ${
              !started
                ? "text-neutral-0"
                : liveAccuracy === 100
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {liveAccuracy + "%"}
          </span>
        </p>
        <p>
          Time:{" "}
          <span
            className={`text-preset-2 ${
              mode === "passage" || !started
                ? "text-neutral-0"
                : getTimerColorScheme(time, duration)
            }`}
          >
            {formatTime(time)}
          </span>
        </p>
      </div>

      <div className='md:flex divide-x  divide-neutral-700 hidden'>
        <div className='flex gap-2 items-center pr-4'>
          <p className='text-preset-5 mr-2 text-neutral-400'>Difficulty:</p>
          {difficultyArray.map((currentDifficulty, index) => (
            <Button
              onClick={() => setDifficulty(currentDifficulty)}
              className={`capitalize ${
                difficulty === currentDifficulty
                  ? "border-blue-400 text-blue-400"
                  : ""
              }`}
              key={index}
              variant='select'
            >
              {currentDifficulty}
            </Button>
          ))}
        </div>
        <div className='flex gap-2 items-center pl-4'>
          <p className='text-preset-5 mr-2 text-neutral-400'>Mode:</p>
          {ModeArray.map((currentMode, index) => (
            <Button
              onClick={() => setMode(currentMode)}
              className={` capitalize ${
                mode === currentMode ? "border-blue-400 text-blue-400" : ""
              }`}
              key={index}
              variant='select'
            >
              {getModeValue(currentMode)}
            </Button>
          ))}
        </div>
      </div>

      <div className='flex gap-2.5 md:hidden justify-between'>
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
      </div>
    </div>
  );
};

export default StatsAndSettingsBar;
