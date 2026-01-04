import { useState } from "react";
import { useTypingSpeedContext } from "../hooks/useTypingSpeedContext";

import TypingText from "../features/typingText";
import StatsAndSettingsBar from "../features/statsAndSettingsBar";
import TypingSpeedResults from "../features/typingSpeedResults";

const TypingSpeedTestContainer = () => {
  const { ended } = useTypingSpeedContext();
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [errorKeystrokes, setErrorKeystrokes] = useState(0);

  return (
    <>
      {!ended ? (
        <div className='mt-8 md:mt-10 lg:mt-16'>
          <StatsAndSettingsBar
            totalKeystrokes={totalKeystrokes}
            errorKeystrokes={errorKeystrokes}
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
