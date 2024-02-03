export const isNotUserDefinedId = (arg: any): boolean =>
  typeof arg !== 'string';

let isNotProductionEnv: boolean;

// if (typeof __DEV__ !== 'undefined') {
//   // for react native
//   isNotProductionEnv = __DEV__;
// } else
if (typeof (import.meta as any).env !== 'undefined') {
  isNotProductionEnv = (import.meta as any).env.MODE !== 'production';
} else {
  isNotProductionEnv = process.env.NODE_ENV !== 'production';
}

export const throwDevWaring = (msg: string) => {
  isNotProductionEnv &&
    console.warn(msg + '\nThis is a development only warning.');
};
