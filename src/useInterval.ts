import { useTimer } from './useTimer';

export const useInterval = () => {
  const { setCustomTimer, clearAllTimers, clearCustomTimer } = useTimer(
    setInterval,
    clearInterval,
    'Interval'
  );

  return {
    setInterval: setCustomTimer,
    clearInterval: clearCustomTimer,
    clearAllIntervals: clearAllTimers,
  };
};

export type SetIntervalFn = UseInterval['setInterval'];
export type ClearIntervalFn = UseInterval['clearInterval'];
export type ClearAllIntervalsFn = UseInterval['clearAllIntervals'];

export type SetInterval = ReturnType<SetIntervalFn>;

export type UseInterval = ReturnType<typeof useInterval>;
