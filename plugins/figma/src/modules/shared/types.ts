import * as services  from '../main/services'

type Func = (...args: Array<unknown>) => unknown;
type AsyncFunc<SyncFunc> = SyncFunc extends Func
    ? (...args: Parameters<SyncFunc>) => Promise<ReturnType<SyncFunc>>
    : never;

/* type ReturnPromise<T> = */
/*     T extends (...args: infer A) => infer R ? (...args: A) => Promise<R> : T;    */

// TODO: nested object of fns not properly promisified
type Promisify<T> = {
    [P in keyof T]:  T[P] extends Func ? AsyncFunc<T[P]> : Promisify<T[P]> 
};

export type MainServices = Promisify<typeof services>
