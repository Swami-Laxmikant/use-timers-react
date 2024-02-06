export declare const useTimeout: () => {
    setTimeout: (cb: import("./types").VoidFn, delay: number, param3?: string | import("./types").TimerConfig) => {
        clear: () => void;
        reset: () => void;
        stop: () => void;
        id: symbol;
    };
    clearTimeout: (timeoutToClear: string | import("./types").UseTimer) => void;
    clearAllTimeouts: () => void;
};
export type SetTimeoutFn = UseTimeout['setTimeout'];
export type ClearTimeoutFn = UseTimeout['clearTimeout'];
export type ClearAllTimeoutsFn = UseTimeout['clearAllTimeouts'];
export type SetTimeout = ReturnType<SetTimeoutFn>;
export type UseTimeout = ReturnType<typeof useTimeout>;
