import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useTypingSpeedContext } from "../hooks/useTypingSpeedContext";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Button } from "../components/ui/button";

import CompletedIcon from "@/assets/images/icon-completed.svg?react";
import HighScoreIcon from "@/assets/images/icon-new-pb.svg?react";
import RestartIcon from "@/assets/images/icon-restart.svg?react";
import Star_1 from "@/assets/images/pattern-star-1.svg?react";
import Star_2 from "@/assets/images/pattern-star-2.svg?react";
import ConfettiPattern from "@/assets/images/pattern-confetti.svg";

const TypingSpeedResults = () => {
  const {
    wpm,
    accuracy,
    inCorrectChars,
    correctChars,
    setEnded,
    setStarted,
    chartData,
  } = useTypingSpeedContext();
  const [personalBest] = useLocalStorage<number>("personal-best", 0);
  console.log(chartData);

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
  } else if (wpm > personalBest && isBaseline) {
    // handle baseline score
    isHighScore = false;
  }

  const onResetHandler = () => {
    setEnded(false);
    setStarted(false);
  };
  return (
    <div className='flex flex-col items-center '>
      <div className='mt-8 pb-15 pt-10  md:mt-20 lg:mt-16 overflow-x-hidden'>
        {isBaseline && (
          <div className='flex items-center text-center gap-2.5 flex-col'>
            <CompletedIcon className='pb-1.5' />
            <h2 className='text-preset-1'>Baseline Established!</h2>
            <p className='text-preset-5 md:text-[1.24rem] text-neutral-400'>
              You’ve set the bar. Now the real challenge begins—time to beat it.
            </p>
          </div>
        )}
        {isHighScore && (
          <div className='flex items-center gap-2.5 text-center flex-col'>
            <HighScoreIcon className='pb-1.5' />
            <h2 className='text-preset-1'>High Score Smashed!</h2>
            <p className='text-preset-5 md:text-preset-3 text-neutral-400'>
              You’re getting faster. That was incredible typing.
            </p>
          </div>
        )}
        {!isBaseline && !isHighScore && (
          <div className='flex items-center gap-2.5 text-center flex-col'>
            <CheckmarkIcon />
            <h2 className='text-preset-1'>Test Complete!</h2>
            <p className='text-preset-5 md:text-[1.24rem]! text-neutral-400'>
              Solid run. Keep pushing to beat your high score.
            </p>
          </div>
        )}
        {/* typing results */}
        <div className='flex flex-col md:flex-row md:mx-auto md:w-170 md:*:flex-1 gap-4 my-6 md:my-8'>
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
        <div className='h-50 flex justify-center mt-10'>
          <LineChart
            style={{
              width: "100%",
              height: "99%",
            }}
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 20,
            }}
            responsive
          >
            <XAxis
              label={{ value: "Seconds", position: "bottom", fontSize: 12 }}
              dataKey='time'
              fontSize={12}
            />
            <YAxis
              label={{
                value: "Word Per Minute",
                angle: -90,
                fontSize: 12,

                position: "insideBottomLeft",
              }}
              fontSize={12}
            />
            <Tooltip />
            <Line
              type='monotone'
              dataKey='wpm'
              stroke='#22c55e'
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </div>
        <div className='flex justify-center mt-15 '>
          <Button
            onClick={onResetHandler}
            variant='secondary'
            className='text-neutral-900 gap-2.5 items-center'
          >
            <p className='text-preset-3-semibold'>
              {isHighScore || isBaseline ? "Beat This Score" : "Go Again"}
            </p>
            <RestartIcon />
          </Button>
        </div>
        {isBaseline ||
          (!isHighScore && (
            <>
              <Star_1 className='absolute bottom-0 md:-bottom-20 w-9.5 md:w-auto right-5' />
              <Star_2 className='absolute md:top-50 md:left-15 top-40 w-5.5 md:w-auto left-5' />
            </>
          ))}
      </div>

      {!isHighScore && (
        <div className='relative w-[99vw] overflow-hidden -z-10 flex justify-center items-center'>
          <img src={ConfettiPattern} className='w-full' alt='' />
        </div>
      )}
    </div>
  );
};

const CheckmarkIcon = () => (
  <div className='relative inline-flex items-center justify-center mb-1.5'>
    <span className='absolute inline-flex h-[160%] w-[160%] rounded-full bg-green-400/20 animate-ripple-1'></span>
    <span className='absolute inline-flex h-[130%] w-[130%] rounded-full bg-green-400/30  animate-ripple-2 '></span>
    <CompletedIcon />
  </div>
);

export default TypingSpeedResults;
