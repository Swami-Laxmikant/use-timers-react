export type VoidFn<A = any> = (...args: A extends any[] ? A : [A]) => void;
export type NumFn = () => number;

export type UserDefinedId = string;
export type ID = symbol;

export type Timer = number; // ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>;

export type CreateTimer = {
  clear: VoidFn;
  reset: () => CreateTimer;
  id: ID;
};

export type TimerMetadata = {
  userDefinedId: UserDefinedId | undefined;
  clear: VoidFn;
  reset: () => CreateTimer;
};

export type UseTimer = {
  clear: VoidFn;
  reset: VoidFn;
};

export type TimerConfig = {
  onClear?: VoidFn;
  onReset?: VoidFn;
  key?: string;
};

export type TimerFn = (cb: VoidFn, delay: number) => Timer;
export type ClearTimer = VoidFn<Timer>;
