export function pipe<A, B>(value: A, fn1: (arg: A) => B): B
export function pipe<A, B, C>(
  value: A,
  fn1: (arg: A) => B,
  fn2: (arg: B) => C
): C
export function pipe<A, B, C, D>(
  value: A,
  fn1: (arg: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D
): D
export function pipe<A, B, C, D, E>(
  value: A,
  fn1: (arg: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E
): E
export function pipe<A, B, C, D, E, F>(
  value: A,
  fn1: (arg: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F
): F
export function pipe<A, B, C, D, E, F, G>(
  value: A,
  fn1: (arg: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G
): G
export function pipe<A, B, C, D, E, F, G, H>(
  value: A,
  fn1: (arg: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G,
  fn7: (arg: G) => H
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
  value: A,
  fn1: (arg: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G,
  fn7: (arg: G) => H,
  fn8: (arg: H) => I
): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  value: A,
  fn1: (arg: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G,
  fn7: (arg: G) => H,
  fn8: (arg: H) => I,
  fn9: (arg: I) => J
): J
export function pipe(input: any, ...functions: any[]) {
  return functions.reduce((acc, fn) => fn(acc), input)
}

export function flow<A extends any[], B>(
  fn1: (...args: A) => B
): (...args: A) => B
export function flow<A extends any[], B, C>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C
): (...args: A) => C
export function flow<A extends any[], B, C, D>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D
): (...args: A) => D
export function flow<A extends any[], B, C, D, E>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E
): (...args: A) => E
export function flow<A extends any[], B, C, D, E, F>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F
): (...args: A) => F
export function flow<A extends any[], B, C, D, E, F, G>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G
): (...args: A) => G
export function flow<A extends any[], B, C, D, E, F, G, H>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G,
  fn7: (arg: G) => H
): (...args: A) => H
export function flow<A extends any[], B, C, D, E, F, G, H, I>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G,
  fn7: (arg: G) => H,
  fn8: (arg: H) => I
): (...args: A) => I
export function flow<A extends any[], B, C, D, E, F, G, H, I, J>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G,
  fn7: (arg: G) => H,
  fn8: (arg: H) => I,
  fn9: (arg: I) => J
): (...args: A) => J
export function flow(...functions: any[]) {
  return (input: any) => functions.reduce((acc, fn) => fn(acc), input)
}

export function tap<T>(fn: (value: T) => void) {
  return (value: T) => {
    fn(value)
    return value
  }
}

export const log =
  <T>(label: string) =>
  (v: T) => {
    console.log(`${label}: `, v)
    return v
  }

export const done = () => void 0

export const memo = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = Object.create(null)
  const func = (arg: any) => {
    if (cache[arg] === undefined) cache[arg] = fn(arg)
    return cache[arg]
  }
  return func as T
}
