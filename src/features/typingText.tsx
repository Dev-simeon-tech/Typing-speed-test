import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";

import { useTypingSpeedContext } from "../hooks/useTypingSpeedContext";
import { getCharStatus } from "../utils/getCharStatus";
import { getRandomText } from "../utils/getRandomtext";
import { splitIntoWords } from "../utils/splitIntoWords";

import RestartIcon from "@/assets/images/icon-restart.svg?react";
type Texts = {
  easy: { id: number; text: string }[];
  medium: { id: number; text: string }[];
  hard: { id: number; text: string }[];
};

type TypingTextType = {
  setTotalKeystrokes: React.Dispatch<React.SetStateAction<number>>;
  setErrorKeystrokes: React.Dispatch<React.SetStateAction<number>>;
};

const TypingText = ({
  setTotalKeystrokes,
  setErrorKeystrokes,
}: TypingTextType) => {
  const { difficulty, started, setStarted, setEnded, mode } =
    useTypingSpeedContext();
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [texts, setTexts] = useState({} as Texts);
  const [currentText, setCurrentText] = useState(() =>
    getRandomText(texts, difficulty)
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });
  useEffect(() => {
    const fetchTexts = async () => {
      const response = await fetch("../../data.json");
      const data = await response.json();
      setTexts(data);
    };
    fetchTexts();
  }, []);

  useEffect(() => {
    setInput("");
    setStarted(false);
    setIsOpen(false); // reset typing input
  }, [difficulty, texts, setStarted, mode]);

  useEffect(() => {
    setCurrentText(() => getRandomText(texts, difficulty));
  }, [texts, difficulty, mode]);

  // const memoizedCurrentText = useMemo(() => currentText, [currentText]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!started) {
      setStarted(true);
    }
    const prev = input;
    const value = e.target.value;
    // Ignore deletions
    if (value.length < prev.length) {
      setInput(value);
      return;
    }

    // New character typed
    const newChar = value[value.length - 1];
    const expectedChar = currentText[value.length - 1];

    setTotalKeystrokes((k) => k + 1);

    if (newChar !== expectedChar) {
      setErrorKeystrokes((e) => e + 1);
    }

    if (e.target.value.length < currentText.length) {
      setInput(e.target.value);
    } else {
      setStarted(false);
      setEnded(true);
    }
  };

  const onClickHandler = () => {
    inputRef.current?.focus();
    setIsOpen(true);
  };

  const restartTestHandler = () => {
    setStarted(false);
    setCurrentText(() => getRandomText(texts, difficulty));
    setInput("");
    setErrorKeystrokes(0);
    setTotalKeystrokes(0);
  };

  if (!texts)
    return (
      <div className='min-h-1/2 flex justify-between items-center'>
        Loading...
      </div>
    );
  const cursorIndex = input.length;
  let charIndex = 0;

  return (
    <div className='relative mt-8'>
      {!isOpen && (
        <div
          onClick={onClickHandler}
          className='absolute flex gap-3 flex-col justify-center items-center text-preset-3-semibold  w-full z-10 h-[65vh] top-0 '
        >
          <Button onClick={onClickHandler}>Start Typing Test</Button>
          <p>Or click the text and start typing</p>
        </div>
      )}
      <input
        autoFocus
        className='absolute opacity-0 pointer-events-none'
        ref={inputRef}
        value={input}
        onChange={onChangeHandler}
      />
      <div
        onClick={onClickHandler}
        className={`relative mb-8 md:mb-10 lg:mb-16 md:text-preset-1-regular text-preset-1-regular-mobile select-none ${
          !isOpen && "blur-sm"
        }`}
      >
        {splitIntoWords(currentText).map((word, wordIndex) => {
          const letters = word.split("");
          return (
            <span key={wordIndex} className='inline-block leading-10 '>
              {letters.map((char: string, index: number) => {
                const typedChar = input[charIndex];
                const status = getCharStatus(char, typedChar);
                charIndex++;
                return (
                  <span key={index} className='relative'>
                    {isOpen && (
                      <>
                        {cursorIndex + 1 === charIndex && (
                          <span className='absolute left-0 rounded-xs top-0 w-full h-full py-1  bg-neutral-400/30 animate-blink' />
                        )}
                      </>
                    )}

                    <span
                      className={
                        status === "correct"
                          ? "text-green-400"
                          : status === "incorrect"
                          ? "text-red-400 underline"
                          : "text-gray-500 "
                      }
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>
      {isOpen && (
        <div className='border-t flex justify-center pt-6 lg:pt-8 border-neutral-700'>
          <Button
            onClick={restartTestHandler}
            variant='neutral'
            className='gap-2.5 '
          >
            <p>Restart Test</p>
            <RestartIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TypingText;
