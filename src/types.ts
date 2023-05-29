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

export type Defaults<T extends Dict, K extends Partial<T>> = Simplify<
  Omit<T, keyof K> & Required<K>
>

export interface Bind {
  <T extends Dict, K extends string, U>(key: K, fn: (value: T) => U): (
    obj: T
  ) => Assign<[T, Record<K, U>]>
}

export type Simplify<T> = T extends any ? { [K in keyof T]: T[K] } : T

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

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint

type ArrayKey = number

type IsTuple<T extends readonly any[]> = number extends T['length']
  ? false
  : true

type TupleKeys<T extends readonly any[]> = Exclude<keyof T, keyof any[]>

export type PathConcat<
  TKey extends string | number,
  TValue
> = TValue extends Primitive ? `${TKey}` : `${TKey}` | `${TKey}.${Path<TValue>}`

export type Path<T> = T extends readonly (infer V)[]
  ? IsTuple<T> extends true
    ? {
        [K in TupleKeys<T>]-?: PathConcat<K & string, T[K]>
      }[TupleKeys<T>]
    : PathConcat<ArrayKey, V>
  : {
      [K in keyof T]-?: PathConcat<K & string, T[K]>
    }[keyof T]

type ArrayPathConcat<
  TKey extends string | number,
  TValue
> = TValue extends Primitive
  ? never
  : TValue extends readonly (infer U)[]
  ? U extends Primitive
    ? never
    : `${TKey}` | `${TKey}.${ArrayPath<TValue>}`
  : `${TKey}.${ArrayPath<TValue>}`

export type ArrayPath<T> = T extends readonly (infer V)[]
  ? IsTuple<T> extends true
    ? {
        [K in TupleKeys<T>]-?: ArrayPathConcat<K & string, T[K]>
      }[TupleKeys<T>]
    : ArrayPathConcat<ArrayKey, V>
  : {
      [K in keyof T]-?: ArrayPathConcat<K & string, T[K]>
    }[keyof T]

export type PathValue<T, TPath extends Path<T> | ArrayPath<T>> = T extends any
  ? TPath extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? R extends Path<T[K]>
        ? PathValue<T[K], R>
        : never
      : K extends `${ArrayKey}`
      ? T extends readonly (infer V)[]
        ? PathValue<V, R & Path<V>>
        : never
      : never
    : TPath extends keyof T
    ? T[TPath]
    : TPath extends `${ArrayKey}`
    ? T extends readonly (infer V)[]
      ? V
      : never
    : never
  : never
