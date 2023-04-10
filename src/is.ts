/**
 * Whether the value is a boolean
 */
export const isBool = (x: any): x is boolean => typeof x === 'boolean'

/**
 * Whether the value is a number
 */
export const isNum = (x: any): x is number => typeof x === 'number'

/**
 * Whether the value is a string
 */
export const isStr = (x: any): x is string => typeof x === 'string'

/**
 * Whether the value is an array
 */
export const isArr = (x: any): x is any[] => Array.isArray(x)

/**
 * Whether the value is an object
 */
export const isObj = (x: any): x is Record<string, any> =>
  x !== null && typeof x === 'object' && !isArr(x)

/**
 * Whether the value is a function
 */
export const isFunc = (x: any): x is Function => typeof x === 'function'
