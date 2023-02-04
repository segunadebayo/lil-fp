export type Dict = Record<string, any>

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

export type PromiseFactory<T = unknown> = () => PromiseLike<T>

export type Awaited<T> = T extends undefined
  ? T
  : T extends PromiseLike<infer U>
  ? U
  : T

type Simplify<T> = T extends any ? { [K in keyof T]: T[K] } : T

type Merge<P1 = {}, P2 = {}> = Omit<P1, keyof P2> & P2

export type Assign<T extends unknown[], Target = {}> = T extends [
  infer Next,
  ...infer Rest
]
  ? Simplify<Assign<Rest, Merge<Target, Next>>>
  : T extends [...infer Rest, infer Next]
  ? Simplify<Merge<Assign<Rest, Target>, Next>>
  : T extends []
  ? Simplify<Target>
  : T extends (infer I)[]
  ? Simplify<Merge<Target, I>>
  : Simplify<Target>
