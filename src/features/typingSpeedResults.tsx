import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useTypingSpeedContext } from "../hooks/useTypingSpeedContext";
import { Button } from "../components/ui/button";

import CompletedIcon from "@/assets/images/icon-completed.svg?react";
import HighScoreIcon from "@/assets/images/icon-new-pb.svg?react";
import RestartIcon from "@/assets/images/icon-restart.svg?react";
import Star_1 from "@/assets/images/pattern-star-1.svg?react";
import Star_2 from "@/assets/images/pattern-star-2.svg?react";
import ConfettiPattern from "@/assets/images/pattern-confetti.svg?react";

const TypingSpeedResults = () => {
  const { wpm, accuracy, inCorrectChars, correctChars, setEnded, setStarted } =
    useTypingSpeedContext();
  const [personalBest] = useLocalStorage<number>("personal-best", 0);

  const isBaseline = personalBest === 0;
  let isHighScore = false;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (wpm < personalBest) return;
    try {
      window.localStorage.setItem("personal-best", JSON.stringify(wpm));
    } catch (e) {
      console.log(e);
    }
  }, [personalBest, wpm]);

  // handles high score
  if (wpm > personalBest && !isBaseline) {
    isHighScore = true;
    console.log("ran here");
  } else if (wpm > personalBest && isBaseline) {
    // handle baseline score
    isHighScore = false;
  }

  const onResetHandler = () => {
    setEnded(false);
    setStarted(false);
  };
  return (
    <div className='mt-8 mb-15 md:mt-20 lg:mt-16 overflow-x-hidden relative'>
      {isBaseline && (
        <div className='flex items-center text-center gap-2.5 flex-col'>
          <CompletedIcon className='pb-1.5' />
          <h2 className='text-preset-1-mobile md:text-preset-1'>
            Baseline Established!
          </h2>
          <p className='text-preset-5 md:text-preset-3'>
            You’ve set the bar. Now the real challenge begins—time to beat it.
          </p>
        </div>
      )}
      {isHighScore && (
        <div className='flex items-center gap-2.5 text-center flex-col'>
          <HighScoreIcon className='pb-1.5' />
          <h2 className='text-preset-1-mobile md:text-preset-1'>
            High Score Smashed!
          </h2>
          <p className='text-preset-5 md:text-preset-3'>
            You’re getting faster. That was incredible typing.
          </p>
        </div>
      )}
      {!isBaseline && !isHighScore && (
        <div className='flex items-center gap-2.5 text-center flex-col'>
          <CompletedIcon className='pb-1.5' />
          <h2 className='text-preset-1-mobile md:text-preset-1'>
            Test Complete!
          </h2>
          <p className='text-preset-5 md:text-preset-3'>
            Solid run. Keep pushing to beat your high score.
          </p>
        </div>
      )}
      {/* typing results */}
      <div className='flex flex-col gap-4 my-6 md:my-8'>
        <div className='flex gap-3 flex-col border border-neutral-700 rounded-lg py-4 px-6'>
          <p className='text-preset-3 text-neutral-400'>WPM:</p>
          <p className='text-preset-2'>{wpm}</p>
        </div>
        <div className='flex gap-3 flex-col border border-neutral-700 rounded-lg py-4 px-6'>
          <p className='text-preset-3 text-neutral-400'>Accuracy:</p>
          <p
            className={`text-preset-2 ${
              accuracy === 100 ? "text-green-500" : "text-red-500"
            }`}
          >
            {accuracy}
          </p>
        </div>
        <div className='flex gap-3 flex-col border border-neutral-700 rounded-lg py-4 px-6'>
          <p className='text-preset-3 text-neutral-400'>Characters:</p>
          <p className='text-preset-2'>
            <span className='text-green-500'>{correctChars}</span>
            <span className='text-neutral-400'>/</span>
            <span className='text-red-500'>{inCorrectChars}</span>
          </p>
        </div>
      </div>
      <div className='flex justify-center '>
        <Button
          onClick={onResetHandler}
          variant='secondary'
          className='text-present-3-semibold text-neutral-900 gap-2.5 items-center'
        >
          <p>{isHighScore || isBaseline ? "Beat This Score" : "Go Again"}</p>
          <RestartIcon />
        </Button>
      </div>
      {isBaseline ||
        (!isHighScore && (
          <>
            <Star_1 className='fixed bottom-0 w-9.5 md:w-auto right-5' />
            <Star_2 className='fixed top-25 w-5.5 md:w-auto left-5' />
          </>
        ))}
      {isHighScore && (
        <div className='h-35 fixed left-1/2 -translate-x-1/2  -z-10 -bottom-5 flex justify-center items-center'>
          <ConfettiPattern className='h-full' />
        </div>
      )}
    </div>
  );
};

export default TypingSpeedResults;
