import { useTypingSpeedContext } from "./useTypingSpeedContext";

const useDuration = () => {
  const { mode } = useTypingSpeedContext();
  let duration = 0;
  switch (mode) {
    case "timed (60s)":
      duration = 60;
      break;
    case "timed (120s)":
      duration = 120;
      break;
    case "timed (30s)":
      duration = 30;
      break;
    case "timed (15s)":
      duration = 15;
      break;
  }
  return { duration };
};

export default useDuration;
