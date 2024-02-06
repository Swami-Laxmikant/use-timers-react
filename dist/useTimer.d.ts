import { VoidFn, UserDefinedId, UseTimer, TimerFn, ClearTimer, TimerConfig } from './types';
export declare const useTimer: (timerFn: TimerFn, clearTimer: ClearTimer, type: 'Timeout' | 'Interval') => {
    setCustomTimer: (cb: VoidFn, delay: number, param3?: UserDefinedId | TimerConfig) => {
        clear: () => void;
        reset: () => void;
        id: symbol;
    };
    clearCustomTimer: (timeoutToClear: UserDefinedId | UseTimer) => void;
    clearAllTimers: () => void;
};
