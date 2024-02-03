/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useCallback, useMemo } from 'react';
import { isNotUserDefinedId, throwDevWaring } from './utils';
import {
  VoidFn,
  UserDefinedId,
  ID,
  TimerMetadata,
  UseTimer,
  TimerFn,
  ClearTimer,
  TimerConfig,
} from './types';
import { timerFactory } from './timerFactory';

export const useTimer = (
  timerFn: TimerFn,
  clearTimer: ClearTimer,
  type: 'Timeout' | 'Interval'
) => {
  const timers = useRef<Map<ID, TimerMetadata>>(new Map()).current;
  const createTimer = useMemo(() => timerFactory(timerFn, clearTimer), []);

  const setCustomTimer = useCallback(
    (cb: VoidFn, delay: number, param3?: UserDefinedId | TimerConfig) => {
      const isConfigProvided = typeof param3 === 'object';
      const { clear, id, reset } = createTimer(
        cb,
        delay,
        isConfigProvided ? param3 : undefined
      );
      const userDefinedId = isConfigProvided ? param3.key : param3;

      timers.set(id, {
        userDefinedId,
        clear: clear,
        reset: reset,
      });

      const _clear = () => {
        const latestClearFn = timers.get(id)?.clear;
        if (!latestClearFn) {
          throwDevWaring(type + " doesn't exist");
          return;
        }
        latestClearFn();
        timers.delete(id);
      };

      const _reset = () => {
        const latestResetFn = timers.get(id)?.reset;
        if (!latestResetFn) {
          throwDevWaring(type + " doesn't exist");
          return;
        }
        const { clear: newClear, reset: newReset } = latestResetFn();
        timers.set(id, {
          userDefinedId,
          clear: newClear,
          reset: newReset,
        });
      };

      return {
        clear: _clear,
        reset: _reset,
        id,
      };
    },
    []
  );

  const clearCustomTimer = useCallback(
    (timeoutToClear: UserDefinedId | UseTimer) => {
      if (isNotUserDefinedId(timeoutToClear)) {
        (timeoutToClear as UseTimer).clear();
        return;
      }

      for (const [, { clear, userDefinedId }] of timers) {
        if (userDefinedId === timeoutToClear) {
          clear();
          break;
        }
      }
    },
    []
  );

  const clearAllTimers = useCallback(
    () => timers.forEach(({ clear }) => clear()),
    []
  );

  useEffect(() => clearAllTimers, []);

  return {
    setCustomTimer,
    clearCustomTimer,
    clearAllTimers,
  };
};
