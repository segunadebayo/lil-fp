export const startsWith = <T extends string>(search: string, pos?: number) => {
  return (str: T) => str.startsWith(search, pos)
}

export const endsWith = <T extends string>(search: string, pos?: number) => {
  return (str: T) => str.endsWith(search, pos)
}

export const split = <T extends string>(
  separator: string | RegExp,
  limit?: number
) => {
  return (str: T) => str.split(separator, limit)
}

export const includes = <T extends string>(search: string, pos?: number) => {
  return (str: T) => str.includes(search, pos)
}

export const lower = <T extends string>() => {
  return (str: T): Lowercase<T> => str.toLowerCase() as Lowercase<T>
}

export const upper = <T extends string>() => {
  return (str: T): Uppercase<T> => str.toUpperCase() as Uppercase<T>
}

export const upperFirst = <T extends string>() => {
  return (str: T) => str.charAt(0).toUpperCase() + str.slice(1)
}

const SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g]
const STRIP_REGEXP = /[^A-Z0-9]+/gi

export interface StripOptions {
  splitRegexp?: RegExp | RegExp[]
  stripRegexp?: RegExp | RegExp[]
  delimiter?: string
  transform?: (part: string, index: number, parts: string[]) => string
}

export const strip =
  <T extends string>(opts: StripOptions = {}) =>
  (str: T) => {
    const {
      splitRegexp = SPLIT_REGEXP,
      stripRegexp = STRIP_REGEXP,
      transform = (s) => s.toLowerCase(),
      delimiter = ' ',
    } = opts

    const p1 = replace(splitRegexp, '$1\0$2')
    const p2 = replace(stripRegexp, '\0')
    let result = p1(p2(str))

    let start = 0
    let end = result.length

    while (result.charAt(start) === '\0') start++
    while (result.charAt(end - 1) === '\0') end--

    return result.slice(start, end).split('\0').map(transform).join(delimiter)
  }

export const replace = (re: RegExp | RegExp[], value: string) => {
  return (v: string) => {
    if (re instanceof RegExp) return v.replace(re, value)
    return re.reduce((input, re) => input.replace(re, value), v)
  }
}

export const kebab = () => strip({ delimiter: '-' })

export const snake = () => strip({ delimiter: '_' })

const pascalTransform = (input: string) =>
  input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()

export const pascal = () =>
  strip({
    transform: pascalTransform,
    delimiter: '',
  })

const camelTransform = (input: string, index: number) =>
  index === 0 ? input.toLowerCase() : pascalTransform(input)

export const camel = () =>
  strip({
    transform: camelTransform,
    delimiter: '',
  })
