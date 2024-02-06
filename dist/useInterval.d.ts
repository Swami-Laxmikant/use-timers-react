export declare const useInterval: () => {
    setInterval: (cb: import("./types").VoidFn, delay: number, param3?: string | import("./types").TimerConfig) => {
        clear: () => void;
        reset: () => void;
        stop: () => void;
        id: symbol;
    };
    clearInterval: (timeoutToClear: string | import("./types").UseTimer) => void;
    clearAllIntervals: () => void;
};
export type SetIntervalFn = UseInterval['setInterval'];
export type ClearIntervalFn = UseInterval['clearInterval'];
export type ClearAllIntervalsFn = UseInterval['clearAllIntervals'];
export type SetInterval = ReturnType<SetIntervalFn>;
export type UseInterval = ReturnType<typeof useInterval>;
