export const match = <T, R>(...fns: ((v: T) => R)[]) => {
  return (v: T) => {
    for (const fn of fns) {
      const x = fn(v)
      if (x != null) return x
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
    if (predicate(v)) {
      return fn(v)
    }
  }
}

export const otherwise =
  <T, R>(fn: (v: T) => R) =>
  (v: T) =>
    when(() => true, fn)(v)

export const orElse =
  <T, U>(u: U | (() => U)) =>
  (v: T | null | undefined): T | U =>
    // @ts-ignore
    v == null ? (typeof u === 'function' ? u() : u) : v
