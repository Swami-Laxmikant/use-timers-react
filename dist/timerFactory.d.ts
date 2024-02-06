import { ClearTimer, CreateTimer, TimerConfig, TimerFn, VoidFn } from './types';
export declare function timerFactory(timerFn: TimerFn, clearTimer: ClearTimer): (cb: VoidFn, delay: number, config?: TimerConfig) => CreateTimer;
