export const guard = <T, R>(...fns: ((v: T) => R)[]) => {
  return (v: T) => {
    for (const fn of fns) {
      const x = fn(v)
      if (x !== undefined) return x
    }
  }
}

export function when<T, U extends T, R>(
  predicate: (v: T) => boolean,
  fn: (v: U) => R
): (v: T) => R | undefined
export function when<T, U extends T, R>(
  predicate: (v: T) => v is U,
  fn: (v: U) => R
): (v: T) => R | undefined
export function when(predicate: (v: any) => boolean, fn: (v: any) => any) {
  return (v: any) => {
    if (predicate(v)) return fn(v)
  }
}

export const otherwise =
  <T, R>(fn: (v: T) => R) =>
  (v: T) =>
    when(() => true, fn)(v)

export const alt =
  <T, U>(u: U | (() => U)) =>
  (v: T | undefined): T | U =>
    // @ts-ignore
    v === undefined ? (typeof u === 'function' ? u() : u) : v
