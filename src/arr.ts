export const from = <T>(
  v: IterableIterator<T> | Iterable<T> | Set<T> | T[]
): T[] => Array.from(v)

export const filter =
  <T>(f: (v: T, index: number, array: T[]) => boolean) =>
  (arr: T[]): T[] =>
    arr.filter(f)

export const map =
  <T, U>(f: (v: T, index: number, array: T[]) => U) =>
  (arr: T[]): U[] =>
    arr.map(f)

export const reduce =
  <T, U>(f: (acc: U, v: T, index: number, array: T[]) => U, init: U) =>
  (arr: T[]): U =>
    arr.reduce(f, init)

export const filterMap =
  <T, U>(f: (v: T, index: number, array: T[]) => U | undefined) =>
  (arr: T[]): U[] =>
    arr.reduce((acc, v, index, arr) => {
      const x = f(v, index, arr)
      return x === undefined ? acc : [...acc, x]
    }, [] as U[])

export const forEach =
  <T>(f: (v: T, index: number, array: T[]) => void) =>
  (arr: T[]): void =>
    arr.forEach(f)

export const next =
  <T>(i: number, loop: boolean) =>
  (arr: T[]): T | undefined =>
    arr[(i + 1) % (loop ? arr.length : arr.length - 1)]

export const prev =
  <T>(i: number, loop: boolean) =>
  (arr: T[]): T | undefined =>
    arr[(i - 1 + (loop ? arr.length : 0)) % arr.length]

export const head = <T>(arr: T[]): T | undefined => arr[0]

export const tail = <T>(arr: T[]): T | undefined => arr[arr.length - 1]

export const at =
  <T>(i: number) =>
  (arr: T[]): T | undefined =>
    arr.at(i)

export const uniq = <T>(arr: T[]): T[] => [...new Set(arr)]

export const some =
  <T>(f: (v: T, index: number, array: T[]) => boolean) =>
  (arr: T[]): boolean =>
    arr.some(f)

export const every =
  <T>(f: (v: T, index: number, array: T[]) => boolean) =>
  (arr: T[]): boolean =>
    arr.every(f)

export const has =
  <T>(v: T) =>
  (arr: T[]): boolean =>
    arr.includes(v)

export const concat =
  <T>(...others: T[][]) =>
  (v: T[]): T[] =>
    v.concat(...others)

export const compact = <T>(arr: (T | undefined)[]): T[] =>
  arr.filter((v) => v !== undefined) as T[]

export const flat = <T>(arr: T[][]): T[] => arr.flat()
