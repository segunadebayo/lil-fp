type Ok<T> = { res: T; err: null }
type Err<E = any> = { res: null; err: E }

type Result<T, E = any> = Ok<T> | Err<E>
type Task<T> = Promise<Result<T>>

/* -----------------------------------------------------------------------------
 * Basic constructors
 * -----------------------------------------------------------------------------*/

const ok = <T>(v: T): Ok<T> => ({ res: v, err: null })
const error = <E>(e: E): Err => ({ res: null, err: toError(e) })

const isOk = <T>(v: any): v is Ok<T> => v.res !== null
const isError = (v: any): v is Err<any> => v.err !== null
const isResult = (v: any): v is Result<any, any> =>
  typeof v === 'object' && 'res' in v && 'err' in v

export const toError = (e: any) => (e instanceof Error ? e : new Error(e))

/* -----------------------------------------------------------------------------
 * Conversion
 * -----------------------------------------------------------------------------*/

export const from = <T>(p: T): Task<T> => Promise.resolve(ok(p))

export const fromPromise = async <T>(p: Promise<T>): Task<T> => {
  try {
    const res = await p
    return ok(res)
  } catch (e) {
    return error(e)
  }
}

export const tryCatch = async <U, K>(
  fn: () => Promise<U>,
  onError?: (err: unknown) => K
) => {
  try {
    return ok(await fn())
  } catch (e) {
    return error(onError?.(e))
  }
}

export const all = async <T>(ps: Promise<T>[]): Task<T[]> => {
  try {
    const res = await Promise.all(ps)
    return ok(res)
  } catch (e) {
    return error(e)
  }
}

/* -----------------------------------------------------------------------------
 * Combinators (maps)
 * -----------------------------------------------------------------------------*/

export const map =
  <T, U>(f: (v: T) => U) =>
  async (p: Task<T>) => {
    try {
      const v = await p
      return isOk(v) ? ok(f(v.res)) : v
    } catch (e) {
      return error(e)
    }
  }

export const mapErr =
  <E, F>(f: (e: E) => F) =>
  async (p: Task<any>) => {
    try {
      const v = await p
      return isError(v) ? error(f(v.err)) : v
    } catch (e) {
      return error(e)
    }
  }

export const flatMap =
  <T, U>(f: (v: T) => U) =>
  async (p: Task<Task<T>>): Task<U> => {
    try {
      const outer = await p
      if (isOk(outer)) {
        const inner = await outer.res
        return isOk(inner) ? ok(f(inner.res)) : inner
      }
      return outer
    } catch (e) {
      return error(e)
    }
  }

export const tap =
  <T>(f: (v: T) => void | Promise<void>) =>
  async (p: Task<T>) => {
    try {
      const v = await p
      if (isOk(v)) await f(v.res)
      return p
    } catch (e) {
      return error(e)
    }
  }

export const tapErr =
  <E>(f: (e: E) => void) =>
  async (p: Task<any>) => {
    try {
      const v = await p
      if (isError(v)) f(v.err)
      return v
    } catch (e) {
      return error(e)
    }
  }

/* -----------------------------------------------------------------------------
 * Combinators (binds)
 * -----------------------------------------------------------------------------*/

export const bindTo =
  <T, K extends string>(key: K) =>
  async (p: Task<T>) => {
    try {
      const v = await p
      return isOk(v) ? ok({ [key]: v.res }) : v
    } catch (e) {
      return error(e)
    }
  }

export const bind =
  <T, K extends string, U>(key: K, f: (v: T) => U | Promise<U> | Task<U>) =>
  async (p: Task<T>): Task<T & { [k in K]: U }> => {
    try {
      const outer = await p
      if (isOk(outer)) {
        const inner = await f(outer.res)
        return ok<any>({
          ...outer.res,
          [key]: isResult(inner) ? inner.res : inner,
        })
      }
      return outer
    } catch (e) {
      return error(e)
    }
  }

/* -----------------------------------------------------------------------------
 * Matches
 * -----------------------------------------------------------------------------*/

export const match =
  <T, U>(onError: (e: Error) => U, onOK: (v: T) => U) =>
  async (p: Task<T>) => {
    try {
      const v = await p
      return isOk(v) ? onOK(v.res) : onError(v.err)
    } catch (e) {
      return onError(toError(e))
    }
  }

/* -----------------------------------------------------------------------------
 * Refinement
 * -----------------------------------------------------------------------------*/

export const orElse =
  <T>(onError: (e: any) => T) =>
  async (p: Task<T>) => {
    try {
      const v = await p
      return isOk(v) ? v.res : onError(v.err)
    } catch (e) {
      return onError(e)
    }
  }

export const filterOrElse =
  <T>(predicate: (v: T) => boolean, onError: (v: T) => any) =>
  async (p: Task<T>) => {
    try {
      const v = await p
      return isOk(v) ? (predicate(v.res) ? v.res : onError(v.res)) : v
    } catch (e) {
      return error(e)
    }
  }

/* -----------------------------------------------------------------------------
 * Conversion
 * -----------------------------------------------------------------------------*/

export const fold =
  <T>() =>
  async (p: Task<T>) =>
    new Promise<T>(async (res, rej) => {
      const outer = await p
      if (isOk(outer)) {
        res(outer.res)
      } else {
        rej(outer.err)
      }
    })
