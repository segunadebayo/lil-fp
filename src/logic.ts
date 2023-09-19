export function match<T extends string | number, R>(
  lookup: Record<T | '_', R | (() => R)>
) {
  return (value: T): R => {
    if (value in lookup || '_' in lookup) {
      const returnValue = value in lookup ? lookup[value] : lookup['_']
      return typeof returnValue === 'function' ? returnValue() : returnValue
    }

    const handlers = Object.keys(lookup)
      .map((key) => `"${key}"`)
      .join(', ')

    const error = new Error(
      `Tried to handle "${value}" but there is no handler defined. Only defined handlers are: ${handlers}.`
    )

    Error.captureStackTrace?.(error, match)

    throw error
  }
}
