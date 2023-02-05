import { isFunc, isObj } from './is'
import {
  Assign,
  Compact,
  Dict,
  Path,
  Simplify,
  Split,
  SplitProp,
} from './types'

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
): (obj: T) => Assign<[T, K]>
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
  <T extends Dict>(f: (key: keyof T, value: T[keyof T]) => boolean) =>
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

export const clone = <T extends Dict>(obj: T): T => structuredClone(obj)

export function merge<T, U>(source: U): (target: T) => Assign<[T, U]>
export function merge<T, U, V>(
  target: T
): (source: U, source2: V) => Assign<[T, U, V]>
export function merge<T, U, V, W>(
  target: T
): (source: U, source2: V, source3: W) => Assign<[T, U, V, W]>
export function merge<T, U, V, W, X>(
  target: T
): (source: U, source2: V, source3: W, source4: X) => Assign<[T, U, V, W, X]>
export function merge(...args: Dict[]) {
  return (obj: any) => {
    if (!args.length) return obj
    for (let i = 1; i < args.length; i++) {
      const source = { ...args[i] }
      for (let key in source) {
        const targValue = obj[key]
        const srcValue = source[key]
        if (isObj(targValue) && isObj(srcValue)) {
          obj[key] = merge(srcValue)(targValue)
        } else {
          obj[key] = srcValue
        }
      }
    }

    return obj
  }
}

export const omit =
  <T extends Dict, K extends keyof T>(keys: K[]) =>
  (obj: T): Simplify<Omit<T, K>> => {
    const clone: any = { ...obj }
    for (let i = 0; i < keys.length; i++) {
      delete clone[keys[i]]
    }
    return clone
  }

export const cast = <T>(v: any): T => v

export const pick =
  <T extends Dict, K extends keyof T>(keys: K[]) =>
  (obj: T): Simplify<Pick<T, K>> => {
    const clone: any = {}
    for (let i = 0; i < keys.length; i++) {
      clone[keys[i]] = obj[keys[i]]
    }
    return clone as any
  }

interface Bind {
  <T extends Dict, K extends string, U>(key: K, fn: (value: T) => U): (
    obj: T
  ) => Assign<[T, Record<K, U>]>
}

export const bind: Bind = (key, fn) => (obj) =>
  cast({
    ...obj,
    [key]: fn(obj),
  })

type Defaults<T extends Dict, K extends Partial<T>> = Simplify<
  Omit<T, keyof K> & Required<K>
>

export const defaults =
  <T extends Dict, K extends Partial<T>>(defaults: K) =>
  (obj: T): Defaults<T, K> =>
    cast({
      ...defaults,
      ...obj,
    })

export const get =
  <T extends Dict, K extends Path<T>, V>(key: K, fallback?: V) =>
  (obj: T): T[K] | V => {
    let keys = key.split('.')
    let i = 0
    while (obj[keys[i]]) {
      obj = obj[keys[i]]
      i++
    }
    return (obj ?? fallback) as any
  }
