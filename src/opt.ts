type Option<T> = None | Some<T>
type None = { _tag: 'None' }
type Some<T> = { _tag: 'Some'; value: T }

export const none: Option<never> = { _tag: 'None' }
export const some = <T>(value: T): Option<T> => ({ _tag: 'Some', value })
export const from = <T>(value: T): Option<T> => some(value)

export const fromNullable = <T>(value: T | null | undefined): Option<T> =>
  value == null ? none : some(value)

export const fromExecution = <T>(
  value: () => T | null | undefined
): Option<T> => {
  try {
    return fromNullable(value())
  } catch {
    return none
  }
}

export const isNone = <T>(o: Option<T>): o is None => o._tag === 'None'
export const isSome = <T>(o: Option<T>): o is Some<T> => o._tag === 'Some'
const isOption = <T>(o: any): o is Option<T> =>
  o._tag === 'None' || o._tag === 'Some'

export const map =
  <T, U>(f: (value: T) => U) =>
  (o: Option<T>): Option<U> =>
    isNone(o) ? none : some(f(o.value))

export const flatMap =
  <T, U>(f: (value: T) => Option<U>) =>
  (o: Option<T>): Option<U> =>
    isNone(o) ? none : f(o.value)

export const getOrElse =
  <T>(def: () => T) =>
  (o: Option<T>): T =>
    isNone(o) ? def() : o.value

export const getOrThrow =
  <T>(msg: string) =>
  (o: Option<T>): T => {
    if (isNone(o)) throw new Error(msg)
    return o.value
  }

export const match =
  <T, U>(onSome: (v: T) => U, onNone: () => U) =>
  (o: Option<T>): U =>
    isNone(o) ? onNone() : onSome(o.value)

export const alt =
  <T>(v: () => Option<T> | T) =>
  (o: Option<T>): Option<T> => {
    const vv = v()
    if (isOption(vv)) return isNone(o) ? vv : o
    return isNone(o) ? some(vv) : o
  }

export const tap =
  <T>(f: (v: T) => void) =>
  (o: Option<T>): Option<T> => {
    if (isSome(o)) f(o.value)
    return o
  }
