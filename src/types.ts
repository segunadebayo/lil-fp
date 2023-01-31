export type Dict = Record<string, any>

type DistributeOverride<T, F> = T extends undefined ? F : T

type Override<T, U> = T extends any
  ? U extends any
    ? {
        [K in keyof T]: K extends keyof U
          ? DistributeOverride<U[K], T[K]>
          : T[K]
      } & {
        [K in keyof U]: K extends keyof T
          ? DistributeOverride<U[K], T[K]>
          : U[K]
      }
    : T & U
  : T & U

type OverrideSpread<T, U> = T extends any
  ? {
      [K in keyof ({ [K in keyof T]: any } & { [K in keyof U]?: any } & {
        [K in U extends any ? keyof U : keyof U]?: any
      })]: K extends keyof T
        ? Exclude<U extends any ? U[K & keyof U] : never, undefined> | T[K]
        : U extends any
        ? U[K & keyof U]
        : never
    }
  : T & U

type Simplify<T> = T extends any ? { [K in keyof T]: T[K] } : T

type Assign<T extends unknown[], Target = {}> = T extends [
  infer Next | (() => infer Next),
  ...infer Rest
]
  ? Assign<Rest, Override<Target, Next>>
  : T extends [...infer Rest, infer Next | (() => infer Next)]
  ? Override<Assign<Rest, Target>, Next>
  : T extends []
  ? Target
  : T extends (infer I | (() => infer I))[]
  ? OverrideSpread<Target, I>
  : Target

export type Merge<T extends unknown[]> = Simplify<Assign<T>>

export type Compact<T extends Dict> = {
  [K in keyof T]: T[K] extends undefined ? never : T[K]
} & {}

export type SplitProp<T> = ReadonlyArray<keyof T>

export type Split<T, K extends SplitProp<T>[]> = [
  ...{
    [P in keyof K]: P extends `${number}`
      ? Pick<T, Extract<K[P], ReadonlyArray<keyof T>>[number]>
      : never
  },
  Omit<T, K[number][number]>
]
