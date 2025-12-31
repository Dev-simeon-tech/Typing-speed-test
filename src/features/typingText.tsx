import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "../components/ui/button";

import { useTypingSpeedContext } from "../hooks/useTypingSpeedContext";
import { getCharStatus } from "../utils/getCharStatus";
import { getRandomText } from "../utils/getRandomtext";
import { splitIntoWords } from "../utils/splitIntoWords";

type Texts = {
  easy: { id: number; text: string }[];
  medium: { id: number; text: string }[];
  hard: { id: number; text: string }[];
};

const TypingText = () => {
  const { difficulty, started, setStarted } = useTypingSpeedContext();
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [texts, setTexts] = useState({} as Texts);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setIsOpen(false); // reset typing input
  }, [difficulty, texts, setStarted]);

  const memoizedCurrentText = useMemo(
    () => getRandomText(texts, difficulty),
    [difficulty, texts]
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!started) {
      setStarted(true);
    }
    if (e.target.value.length <= memoizedCurrentText.length) {
      setInput(e.target.value);
    } else {
      setStarted(false);
    }
  };
  const onClickHandler = () => {
    inputRef.current?.focus();
    setIsOpen(true);
  };

  if (!texts) return <div>Loading...</div>;
  const cursorIndex = input.length;
  let charIndex = 0;

  console.log(splitIntoWords(memoizedCurrentText));
  return (
    <div className='relative'>
      {!isOpen && (
        <div
          onClick={onClickHandler}
          className='absolute flex gap-3 flex-col justify-center items-center text-preset-3-semibold  w-full z-10 h-full top-0 '
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
        className={`relative md:text-preset-1-regular text-preset-1-regular-mobile select-none ${
          !isOpen && "blur-sm"
        }`}
      >
        {splitIntoWords(memoizedCurrentText).map((word, wordIndex) => {
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
    </div>
  );
};

export default TypingText;
