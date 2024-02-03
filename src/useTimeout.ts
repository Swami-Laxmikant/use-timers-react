import { useTimer } from './useTimer';

export const useTimeout = () => {
  const { setCustomTimer, clearAllTimers, clearCustomTimer } = useTimer(
    setTimeout,
    clearTimeout,
    'Timeout'
  );

  return {
    setTimeout: setCustomTimer,
    clearTimeout: clearCustomTimer,
    clearAllTimeouts: clearAllTimers,
  };
};

export type SetTimeoutFn = UseTimeout['setTimeout'];
export type ClearTimeoutFn = UseTimeout['clearTimeout'];
export type ClearAllTimeoutsFn = UseTimeout['clearAllTimeouts'];

export type SetTimeout = ReturnType<SetTimeoutFn>;

export type UseTimeout = ReturnType<typeof useTimeout>;
