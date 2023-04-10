/**
 * Combines multiple boolean predicates using OR → a || b.
 */
export function or<A, B extends A, C extends A>(
  a: (v: A) => v is B,
  b: (v: A) => v is C
): (v: A) => v is B | C
export function or<A, B extends A, C extends A, D extends A>(
  a: (v: A) => v is B,
  b: (v: A) => v is C,
  c: (v: A) => v is D
): (v: A) => v is B | C | D
export function or<A, B extends A, C extends A, D extends A, E extends A>(
  a: (v: A) => v is B,
  b: (v: A) => v is C,
  c: (v: A) => v is D,
  d: (v: A) => v is E
): (v: A) => v is B | C | D | E
export function or(...fns: any[]) {
  return (v: any) => fns.some((fn) => fn(v))
}

/**
 * Inverts a boolean predicate.
 */
export const not =
  <T>(predicate: (arg: T) => boolean): ((arg: T) => boolean) =>
  (arg: T) =>
    !predicate(arg)

/**
 * Combines multiple boolean predicates using AND → a && b.
 */
export function and<A, B extends A, C extends A, D extends A, E extends A>(
  a: (v: A) => v is B,
  b: (v: A) => v is C,
  c: (v: A) => v is D,
  d: (v: A) => v is E
): (v: A) => v is B & C & D & E
export function and<A, B extends A, C extends A, D extends A>(
  a: (v: A) => v is B,
  b: (v: A) => v is C,
  c: (v: A) => v is D
): (v: A) => v is B & C & D
export function and<A, B extends A, C extends A>(
  a: (v: A) => v is B,
  b: (v: A) => v is C
): (v: A) => v is B & C
export function and<T>(
  ...predicates: ((arg: T) => boolean)[]
): (arg: T) => boolean {
  return (arg: T) => predicates.every((predicate) => predicate(arg))
}
