import { pipe } from './func'
import { Dict, PromiseFactory } from './types'
import pAll, { Options as PAllOptions } from 'p-all'

export const toError = (err: any) =>
  err instanceof Error ? err : new Error(err)

type Ok<T> = { result: T; error: never }
type Err = { result: never; error: any }

type Result<T> = Ok<T> | Err
type Task<T> = Promise<Result<T>>

const ok = <T>(result: T): Ok<T> => ({ result, error: null! })
const err = (error: any): Err => ({ result: null!, error })
const toTask = <T>(result: T, error: any): Result<T> =>
  error != null ? err(error) : ok(result)

export const tryCatch = async <T>(
  f: () => T | Promise<T>,
  onReject: (err: any) => any
) => {
  try {
    return ok(await f())
  } catch (reason) {
    return err(onReject(reason))
  }
}

export const fromPromise = async <T>(promise: Promise<T>) =>
  tryCatch(() => promise, toError)

export const fromCallback = async <T>(
  f: (cb: (err: any, result: T) => void) => void
) =>
  tryCatch(
    () =>
      new Promise<T>((res, rej) => {
        f((err, result) => {
          if (err) rej(err)
          else res(result)
        })
      }),
    toError
  )

export const map =
  <T, U>(f: (t: T) => U | Promise<U>) =>
  async (task: Task<T>) => {
    const { result, error } = await task
    return toTask(await f(result), error)
  }

export const getOrElse =
  <T>(f: () => T | Promise<T>) =>
  async (task: Task<T>) =>
    pipe(
      task,
      map((v) => v ?? f())
    )

export const filterOrElse =
  <T>(predicate: (t: T) => boolean, onFalse: (t: T) => any) =>
  async (task: Task<T>) =>
    pipe(
      task,
      map((v) => (predicate(v) ? v : onFalse(v)))
    )

export const tap =
  <T>(f: (t: T) => any) =>
  async (task: Task<T>) =>
    pipe(
      task,
      map((v) => {
        f(v)
        return v
      })
    )

export const makeEmpty = () => Promise.resolve({})

export const bind =
  <T extends Dict, K extends string, U>(key: K, f: (t: T) => Promise<U>) =>
  async (task: Task<T>) =>
    pipe(
      task,
      map(f),
      map((v) => ({ ...v, [key]: v }))
    )

export const bindTo =
  <T, K extends string>(key: K) =>
  (task: Task<T>) =>
    pipe(
      task,
      map((v) => ({ [key]: v } as Record<K, T>))
    )

export function all<T extends PromiseFactory[]>(
  tasks: readonly [...T],
  options?: PAllOptions
): Promise<{
  [P in keyof T]: T[P] extends () => unknown ? Awaited<ReturnType<T[P]>> : T[P]
}>
export function all(items: any, options?: PAllOptions) {
  return pAll(items, options)
}
