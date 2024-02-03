import { ClearTimer, CreateTimer, TimerConfig, TimerFn, VoidFn } from './types';

export function timerFactory(timerFn: TimerFn, clearTimer: ClearTimer) {
  const _createTimer = (
    cb: VoidFn,
    delay: number,
    id: symbol,
    onClear: VoidFn | undefined,
    onReset: VoidFn | undefined
  ): CreateTimer => {
    const jsId = timerFn(cb, delay);
    const clear = () => {
      clearTimer(jsId);
      onClear?.();
    };
    const reset = () => {
      clearTimer(jsId);
      const newTimer = _createTimer(cb, delay, id, onClear, onReset);
      onReset?.();
      return newTimer;
    };
    return {
      clear,
      reset,
      id,
    };
  };

  const createTimer = (cb: VoidFn, delay: number, config?: TimerConfig) => {
    const id = Symbol();
    return _createTimer(cb, delay, id, config?.onClear, config?.onReset);
  };

  return createTimer;
}
