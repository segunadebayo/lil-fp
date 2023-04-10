/**
 * An Option represents a value that may or may not be present.
 */

type Option<T> = None | Some<T>

type None = { _tag: 'None' }

type Some<T> = { _tag: 'Some'; value: T }

/**
 * The None value represents the absence of a value.
 */
export const none: Option<never> = Object.freeze({ _tag: 'None' })

/**
 * The Some value represents the presence of a value.
 */
export const some = <T>(value: T): Option<T> =>
  Object.freeze({ _tag: 'Some', value })

/**
 * Creates an Option from a predicate function.
 * If the predicate returns true, the value is wrapped in a Some, otherwise None is returned.
 */
export function fromPredicate<T, U extends T>(
  predicate: (v: T) => v is U
): (v: T) => Option<U>
export function fromPredicate<T>(predicate: (v: T) => boolean) {
  return (v: T): Option<T> => (predicate(v) ? some(v) : none)
}

/**
 * Creates an Option from a nullable value.
 * If the value is null or undefined, None is returned, otherwise the value is wrapped in a Some.
 */
export const fromNullable = <T>(value: T | null | undefined): Option<T> =>
  value == null ? none : some(value)

/**
 * Creates an Option from a function that may throw an error.
 * If the function throws an error, None is returned, otherwise the result is wrapped in a Some.
 */
export const fromExecution = <T>(
  value: () => T | null | undefined
): Option<T> => {
  try {
    return fromNullable(value())
  } catch {
    return none
  }
}

/**
 * Whether the given value is a None
 */
export const isNone = <T>(o: Option<T>): o is None => o._tag === 'None'

/**
 * Whether the given value is a Some
 */
export const isSome = <T>(o: Option<T>): o is Some<T> => o._tag === 'Some'

/**
 * Whether the given value is an Option
 */
const isOption = <T>(o: any): o is Option<T> =>
  o._tag === 'None' || o._tag === 'Some'

/**
 * Calls the specified callback function on the value of an option if is a Some.
 */
export const map =
  <T, U>(f: (value: T) => U) =>
  (o: Option<T>): Option<U> =>
    isNone(o) ? none : some(f(o.value))

/**
 * Calls the specified callback function on the value of an option if is a Some.
 * It also flattens any nested options.
 */
export const flatMap =
  <T, U>(f: (value: T) => Option<U>) =>
  (o: Option<T>): Option<U> =>
    isNone(o) ? none : f(o.value)

/**
 * Returns the value of an option if is a Some, otherwise returns the specified default value.
 */
export const getOrElse =
  <T>(def: () => T) =>
  (o: Option<T>): T =>
    isNone(o) ? def() : o.value

/**
 * Returns the value of an option if is a Some(value), otherwise it throws an error.
 */
export const getOrThrow =
  <T>(msg: string) =>
  (o: Option<T>): T => {
    if (isNone(o)) throw new Error(msg)
    return o.value
  }

/**
 * Returns the result of someFn if option is Some, otherwise, returns the result of noneFn.
 */
export const match =
  <T, U>(onSome: (v: T) => U, onNone: () => U) =>
  (o: Option<T>): U =>
    isNone(o) ? onNone() : onSome(o.value)

/**
 * Returns the value of an option if is a Some, otherwise returns the result of the alternative function.
 */
export const orElse =
  <T>(v: () => Option<T> | T) =>
  (o: Option<T>): Option<T> => {
    const vv = v()
    if (isOption(vv)) return isNone(o) ? vv : o
    return isNone(o) ? some(vv) : o
  }

/**
 * Calls the specified callback function on the value of an option if is a Some.
 * Returns the original option.
 */
export const tap =
  <T>(f: (v: T) => void) =>
  (o: Option<T>): Option<T> => {
    if (isSome(o)) f(o.value)
    return o
  }

/**
 * Returns a None if the option is a Some and the value does not satisfy the predicate.
 */
export const filter =
  <T>(f: (v: T) => boolean) =>
  (o: Option<T>): Option<T> =>
    isNone(o) ? none : f(o.value) ? o : none
