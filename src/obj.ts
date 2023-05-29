import { cast } from './func'
import { isFunc, isObj } from './is'
import {
  Assign,
  Bind,
  Compact,
  Defaults,
  Dict,
  Path,
  Simplify,
  Split,
  SplitProp,
} from './types'

/**
 * Returns an object created by key-value entries for properties and methods
 */
export const fromEntries = <T extends Dict>(
  entries:
    | IterableIterator<[string, T[keyof T]]>
    | Iterable<[string, T[keyof T]]>
): T => Object.fromEntries(entries) as T

/**
 * Returns a new object with the key-value pairs from the original object, but the keys transformed by the given function.
 */
export const map =
  <T extends Dict>(
    f: (key: string, value: T[keyof T]) => [string, T[keyof T]]
  ) =>
  (obj: T): T =>
    fromEntries(Object.entries(obj).map(([k, v]) => f(k, v)))

/**
 * Returns the entries of an object as an array of key-value pairs
 */
export const entries = <T extends Dict>(obj: T): [keyof T, T[keyof T]][] =>
  Object.entries(obj)

/**
 * Assign object properties to an existing object in a pipeline
 */
export function assign<T extends Dict, K extends Dict>(
  v: K | ((obj: T) => K)
): (obj: T) => Assign<[T, K]>
export function assign(v: any) {
  return (obj: any) => ({
    ...obj,
    ...(isFunc(v) ? v(obj) : v),
  })
}

/**
 * Assigns a value in a pipeline to a key in an object
 */
export const assignTo =
  <K extends string, T extends Dict>(key: K) =>
  (prev: T): Record<K, T> =>
    fromEntries([[key, prev]])

/**
 * Returns a new object that specified key whose value is the result of calling the provided function
 */
export const bind: Bind = (key, fn) => (obj) =>
  cast({
    ...obj,
    [key]: fn(obj),
  })

/**
 * Returns the keys of an object
 */
export const keys = <T extends Dict>(obj: T): (keyof T)[] =>
  Object.keys(obj) as string[]

/**
 * Filters an object entries by a predicate function
 */
export const filter =
  <T extends Dict>(f: (key: keyof T, value: T[keyof T]) => boolean) =>
  (obj: T): T =>
    fromEntries(Object.entries(obj).filter(([k, v]) => f(k, v)))

/**
 * Returns a new object with nullish values removed
 */
export const compact = <T extends Dict>(obj: T): Compact<T> =>
  filter((_, v) => v != null)(obj) as any

/**
 * Split an object into multiple objects based on a predicate function
 */
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

/**
 * Merge multiple objects to an object in a pipeline
 */
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

/**
 * Omit properties from an object in a pipeline
 */
export const omit =
  <T extends Dict, K extends keyof T>(keys: K[]) =>
  (obj: T): Simplify<Omit<T, K>> => {
    const clone: any = { ...obj }
    for (let i = 0; i < keys.length; i++) {
      delete clone[keys[i]]
    }
    return clone
  }

/**
 * Pick properties from an object in a pipeline
 */
export const pick =
  <T extends Dict, K extends keyof T>(keys: K[]) =>
  (obj: T): Simplify<Pick<T, K>> => {
    const clone: any = {}
    for (let i = 0; i < keys.length; i++) {
      clone[keys[i]] = obj[keys[i]]
    }
    return clone as any
  }

/**
 * Assign default values to an object in a pipeline
 */
export const defaults =
  <T extends Dict, K extends Partial<T>>(defaults: K) =>
  (obj: T): Defaults<T, K> =>
    cast({
      ...defaults,
      ...obj,
    })

const isSafeKey = (key: any) =>
  key !== '__proto__' && key !== 'prototype' && key !== 'constructor'

/**
 * Get a property from an object by dot notation
 */
export const get =
  <T extends Dict, K extends Path<T>>(path: K, undef?: T[K]) =>
  (obj: T): T[K] => {
    const keys = Array.isArray(path) ? path : path.split('.')
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (
        !obj ||
        !Object.prototype.hasOwnProperty.call(obj, key) ||
        !isSafeKey(key)
      ) {
        // @ts-ignore
        obj = undefined
        break
      }
      obj = obj[key]
    }
    return cast(obj ?? undef)
  }
