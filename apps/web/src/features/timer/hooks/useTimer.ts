import { useState, useRef, useCallback, useEffect } from 'react';

export function useTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const offsetRef = useRef(0);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTick = useCallback(() => {
    const startedAt = Date.now() - offsetRef.current;

    intervalRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 200);

    setIsRunning(true);
  }, []);

  const start = useCallback(() => {
    offsetRef.current = 0;
    clearTimer();
    startTick();
  }, [clearTimer, startTick]);

  const pause = useCallback(() => {
    offsetRef.current = elapsed * 1000;
    clearTimer();
    setIsRunning(false);
  }, [elapsed, clearTimer]);

  const resume = useCallback(() => {
    startTick();
  }, [startTick]);

  const stop = useCallback(() => {
    clearTimer();
    setElapsed(0);
    setIsRunning(false);
    offsetRef.current = 0;
  }, [clearTimer]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return { elapsed, isRunning, start, pause, resume, stop };
}
