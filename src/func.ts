/**
 * Performs left-to-right function composition (the first argument must be a value).
 */
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
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  value: A,
  fn1: (arg: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G,
  fn7: (arg: G) => H,
  fn8: (arg: H) => I,
  fn9: (arg: I) => J,
  fn10: (arg: J) => K
): K
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
  value: A,
  fn1: (arg: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G,
  fn7: (arg: G) => H,
  fn8: (arg: H) => I,
  fn9: (arg: I) => J,
  fn10: (arg: J) => K,
  fn11: (arg: K) => L
): L
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  value: A,
  fn1: (arg: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G,
  fn7: (arg: G) => H,
  fn8: (arg: H) => I,
  fn9: (arg: I) => J,
  fn10: (arg: J) => K,
  fn11: (arg: K) => L,
  fn12: (arg: L) => M
): M
export function pipe(input: any, ...functions: any[]) {
  return functions.reduce((acc, fn) => fn(acc), input)
}

/**
 * Performs left-to-right function composition and returns a new function, the first argument may have any arity, the remaining arguments must be unary.
 */
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

/**
 * Invokes the given function with the given value, and then returns the same value.
 */
export function tap<T>(fn: (value: T) => void) {
  return (value: T) => {
    fn(value)
    return value
  }
}

/**
 * Useful for logging values in a pipeline
 */
export const log =
  <T>(label: string, fn?: (a: T) => any) =>
  (v: T) => {
    console.log(`${label}: `, fn?.(v) ?? v)
    return v
  }

/**
 * Casts a value to a specific type
 */
export const cast = <T>(v: any): T => v

/**
 * Empty, no-op function
 */
export const noop = () => void 0

/**
 * Identity function
 */
export const identity = <T>(v: T) => v

/**
 * Returns a function with memoized results
 */
export const memo = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = Object.create(null)
  const func = (arg: any) => {
    if (cache[arg] === undefined) cache[arg] = fn(arg)
    return cache[arg]
  }
  return func as T
}

/**
 * Run a execution in a try/catch block, and return the result of the function or the result of the onError function
 */
export const tryCatch =
  <T, U, K>(fn: (v: T) => U, onError?: (err: unknown, v: T) => K) =>
  (v: T): U | (K extends void ? undefined : K) => {
    try {
      return fn(v)
    } catch (err) {
      return cast(onError?.(err, v))
    }
  }
