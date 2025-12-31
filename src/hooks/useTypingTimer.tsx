import { useEffect, useRef, useState } from "react";

type TimerMode = "timed" | "passage";

interface TimerOptions {
  mode: TimerMode;
  duration?: number; // seconds (only for timed)
  autoStart?: boolean;
}

export function useTypingTimer({
  mode,
  duration = 60,
  autoStart = false,
}: TimerOptions) {
  const [time, setTime] = useState(mode === "timed" ? duration : 0);
  const [isRunning, setIsRunning] = useState(autoStart);

  const intervalRef = useRef<number | null>(null);

  // Clear interval safely
  const clear = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Start timer
  const start = () => {
    if (intervalRef.current !== null) return;
    setIsRunning(true);

    intervalRef.current = window.setInterval(() => {
      setTime((prev) => {
        if (mode === "timed") {
          if (prev <= 1) {
            clear();
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        } else {
          return prev + 1;
        }
      });
    }, 1000);
  };

  // Pause timer
  const pause = () => {
    clear();
    setIsRunning(false);
  };

  // Reset timer
  const reset = () => {
    clear();
    setIsRunning(false);
    setTime(mode === "timed" ? duration : 0);
  };

  // Cleanup on unmount or mode change
  useEffect(() => {
    return () => clear();
  }, []);

  // Reset if mode or duration changes
  useEffect(() => {
    reset();
  }, [mode, duration]);

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
  };
}
