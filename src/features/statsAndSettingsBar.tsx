import { useTypingSpeedContext } from "../hooks/useTypingSpeedContext";
import { useState, useEffect } from "react";
import { useTypingTimer } from "../hooks/useTypingTimer";
import Dropdown from "../components/ui/dropdown";
import type { ModeType } from "../context/typingSpeed";
import type { DifficultyType } from "../context/typingSpeed";

const ModeArray: ModeType[] = ["timed (60s)", "passage"];
const difficultyArray: DifficultyType[] = ["easy", "medium", "hard"];

const StatsAndSettingsBar = () => {
  const { mode, difficulty, setDifficulty, setMode, started } =
    useTypingSpeedContext();
  let duration;
  switch (mode) {
    case "timed (60s)":
      duration = 60;
  }

  const { time, start } = useTypingTimer({
    mode: mode === "passage" ? "passage" : "timed",
    duration,
  });

  useEffect(() => {
    if (started) {
      start();
    }
  }, [started, start]);

  return (
    <div className='flex flex-col lg:flex-row gap-4 mt-8'>
      <div className='text-preset-3-mobile flex justify-between  *:flex *:flex-col *:gap-2 *:items-center *:grow   divide-x divide-neutral-700 md:text-preset-3 text-neutral-400'>
        <p>
          WPM: <span className='text-neutral-0 text-preset-2'>0</span>
        </p>
        <p>
          Accuracy: <span className='text-preset-2'>100</span>
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
              <button
                className={`h-6 w-6 rounded-full  bg-neutral-800 ${
                  mode === currentMode
                    ? "border-7 border-blue-500"
                    : "border-2 border-neutral-0"
                }`}
              ></button>
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
              <button
                className={`h-6 w-6 rounded-full  bg-neutral-800 ${
                  difficulty === currentDifficulty
                    ? "border-7 border-blue-500"
                    : "border-2 border-neutral-0"
                }`}
              ></button>
              <p>{currentDifficulty}</p>
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default StatsAndSettingsBar;
