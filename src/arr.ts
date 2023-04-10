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
  (arr: T[]): T[] =>
    arr.filter(f)

/**
 * Calls a defined callback function on each element of an array, and returns an array that contains the results.
 */
export const map =
  <T, U>(f: (v: T, index: number, array: T[]) => U) =>
  (arr: T[]): U[] =>
    arr.map(f)

/**
 * Calls the specified callback function for all the elements in an array.
 *
 * The return value of the callback function is the accumulated result,
 * and is provided as an argument in the next call to the callback function.
 */
export const reduce =
  <T, U>(f: (acc: U, v: T, index: number, array: T[]) => U, init: U) =>
  (arr: T[]): U =>
    arr.reduce(f, init)

/**
 * Calls the specified callback function for all the elements in an array.
 * The return value is the non-nullable result of the callback function.
 */
export const filterMap =
  <T, U>(f: (v: T, index: number, array: T[]) => U | undefined | null) =>
  (arr: T[]): U[] =>
    arr.reduce((acc, v, index, arr) => {
      const x = f(v, index, arr)
      return x == null ? acc : [...acc, x]
    }, [] as U[])

/**
 * Performs the specified action for each element in an array.
 */
export const forEach =
  <T>(f: (v: T, index: number, array: T[]) => void) =>
  (arr: T[]): void =>
    arr.forEach(f)

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
  (arr: T[]): T | undefined =>
    arr.at(i)

/**
 * Returns the unique elements of an array.
 */
export const uniq = <T>(arr: T[]): T[] => [...new Set(arr)]

/**
 * Determines whether the specified callback function returns true for any element of an array.
 */
export const some =
  <T>(f: (v: T, index: number, array: T[]) => boolean) =>
  (arr: T[]): boolean =>
    arr.some(f)

/**
 * Determines whether the specified callback function returns true for all elements of an array.
 */
export const every =
  <T>(f: (v: T, index: number, array: T[]) => boolean) =>
  (arr: T[]): boolean =>
    arr.every(f)

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
