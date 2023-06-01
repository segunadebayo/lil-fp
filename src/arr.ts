/**
 * Creates an array from an iterable object.
 */
export const from = <T>(v: Iterable<T> | ArrayLike<T> | T[]): T[] =>
  Array.from(v)

/**
 * Returns the elements of an array that meet the condition specified in a callback function.
 */
export const filter =
  <T>(f: (v: T, index: number, array: T[]) => boolean) =>
  (arr: T[]): T[] => {
    const len = arr.length
    const filtered: T[] = []
    for (let i = 0; i < len; i++) {
      if (f(arr[i], i, arr)) {
        filtered.push(arr[i])
      }
    }
    return filtered
  }

/**
 * Calls a defined callback function on each element of an array, and returns an array that contains the results.
 */
export const map =
  <T, U>(f: (v: T, index: number, array: T[]) => U) =>
  (arr: T[]): U[] => {
    const len = arr.length
    const mapped = new Array<U>(len)
    for (let i = 0; i < len; i++) {
      mapped[i] = f(arr[i], i, arr)
    }
    return mapped
  }

/**
 * Calls the specified callback function for all the elements in an array.
 *
 * The return value of the callback function is the accumulated result,
 * and is provided as an argument in the next call to the callback function.
 */
export const reduce =
  <T, U>(f: (acc: U, v: T, index: number, array: T[]) => U, init: U) =>
  (arr: T[]): U => {
    const len = arr.length
    let acc = init
    for (let i = 0; i < len; i++) {
      acc = f(acc, arr[i], i, arr)
    }
    return acc
  }

/**
 * Performs the specified action for each element in an array.
 */
export const forEach =
  <T>(f: (v: T, index: number, array: T[]) => void) =>
  (arr: T[]): void => {
    const len = arr.length
    for (let i = 0; i < len; i++) {
      f(arr[i], i, arr)
    }
  }

/**
 * Returns the next element of an array based on the current index.
 */
export const next =
  <T>(i: number, loop: boolean) =>
  (arr: T[]): T | undefined =>
    arr[(i + 1) % (loop ? arr.length : arr.length - 1)]

/**
 * Returns the previous element of an array based on the current index.
 */
export const prev =
  <T>(i: number, loop: boolean) =>
  (arr: T[]): T | undefined =>
    arr[(i - 1 + (loop ? arr.length : 0)) % arr.length]

/**
 * Returns the first element of an array.
 */
export const head = <T>(arr: T[]): T | undefined => arr[0]

/**
 * Returns the last element of an array.
 */
export const tail = <T>(arr: T[]): T | undefined => arr[arr.length - 1]

/**
 * Returns the element of an array at the specified index.
 */
export const at =
  <T>(i: number) =>
  (arr: T[]): T | undefined => {
    const index = i < 0 ? arr.length + i : i
    return arr[index]
  }

/**
 * Returns the unique elements of an array.
 */
export const uniq = <T>(arr: T[]): T[] => Array.from(new Set(arr))

/**
 * Determines whether the specified callback function returns true for any element of an array.
 */
export const some =
  <T>(f: (v: T, index: number, array: T[]) => boolean) =>
  (arr: T[]): boolean => {
    const len = arr.length
    for (let i = 0; i < len; i++) {
      if (f(arr[i], i, arr)) {
        return true
      }
    }
    return false
  }

/**
 * Determines whether the specified callback function returns true for all elements of an array.
 */
export const every =
  <T>(f: (v: T, index: number, array: T[]) => boolean) =>
  (arr: T[]): boolean => {
    const len = arr.length
    for (let i = 0; i < len; i++) {
      if (!f(arr[i], i, arr)) {
        return false
      }
    }
    return true
  }

/**
 * Determines whether an array includes a certain element
 */
export const has =
  <T>(v: T) =>
  (arr: T[]): boolean =>
    arr.includes(v)

/**
 * Combines two or more arrays
 */
export const concat =
  <T>(...others: T[][]) =>
  (v: T[]): T[] =>
    v.concat(...others)

/**
 * Removes nullish values from an array
 */
export const compact = <T>(arr: (T | null | undefined)[]): T[] =>
  arr.filter((v) => v != null) as T[]

/**
 * Flattens an array of arrays
 */
export const flat =
  <T>() =>
  (arr: T[][]) =>
    arr.flat()
