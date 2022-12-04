import { useCallback, useEffect, useState } from "react";

export const useTimer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  const tick = useCallback(() => {
    setTimeInSeconds(timeInSeconds + 1);
  }, [timeInSeconds]);

  const startTimer = useCallback(() => {
    if (!isPlaying) {
      setIsPlaying(true);
      tick();
    }
  }, [isPlaying, timeInSeconds]);

  const stopTimer = useCallback(() => {
    setIsPlaying(false);
    setTimeInSeconds(0);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        tick();
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlaying, timeInSeconds]);

  return {
    isPlaying,
    timeInSeconds,
    startTimer,
    stopTimer,
    pauseTimer,
  };
};
