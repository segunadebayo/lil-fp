import { isFunc } from './is'
import { Compact, Dict, Merge, Split, SplitProp } from './types'

export const fromEntries = <T extends Dict>(
  entries:
    | IterableIterator<[string, T[keyof T]]>
    | Iterable<[string, T[keyof T]]>
): T => Object.fromEntries(entries) as T

export const map =
  <T extends Dict>(
    f: (key: string, value: T[keyof T]) => [string, T[keyof T]]
  ) =>
  (obj: T): T =>
    fromEntries(Object.entries(obj).map(([k, v]) => f(k, v)))

export const entries = <T extends Dict>(obj: T): [keyof T, T[keyof T]][] =>
  Object.entries(obj)

export const from =
  <K extends string, T>(key: K) =>
  (value: T): Record<K, T> =>
    fromEntries([[key, value]])

export function assign<T extends Dict, K extends Dict>(
  v: K | ((obj: T) => K)
): (obj: T) => Merge<[T, K]>
export function assign(v: any) {
  return (obj: any) => ({
    ...obj,
    ...(isFunc(v) ? v(obj) : v),
  })
}

export const assignTo =
  <K extends string, T extends Dict>(key: K) =>
  (prev: T): Record<K, T> =>
    fromEntries([[key, prev]])

export const keys = <T extends Dict>(obj: T): (keyof T)[] =>
  Object.keys(obj) as string[]

export const filter =
  <T extends Dict>(f: (key: string, value: T[keyof T]) => boolean) =>
  (obj: T): T =>
    fromEntries(Object.entries(obj).filter(([k, v]) => f(k, v)))

export const compact = <T extends Dict>(obj: T): Compact<T> =>
  filter((_, v) => v !== undefined)(obj) as any

export const split =
  <T extends Dict, K extends [SplitProp<T>, ...SplitProp<T>[]]>(...keys: K) =>
  (obj: T): Split<T, K> => {
    const descriptors = Object.getOwnPropertyDescriptors(obj)
    const dKeys = Object.keys(descriptors)
    const split = (k: any[]) => {
      const clone = {}
      for (let i = 0; i < k.length; i++) {
        const key = k[i]
        if (descriptors[key]) {
          Object.defineProperty(clone, key, descriptors[key])
          delete descriptors[key]
        }
      }
      return clone
    }
    const fn = (key: any) => split(Array.isArray(key) ? key : dKeys.filter(key))
    return keys.map(fn).concat(split(dKeys)) as any
  }
