export const isBool = (x: any): x is boolean => typeof x === 'boolean'
export const isNum = (x: any): x is number => typeof x === 'number'
export const isStr = (x: any): x is string => typeof x === 'string'
export const isArr = (x: any): x is any[] => Array.isArray(x)
export const isObj = (x: any): x is Record<string, any> =>
  x !== null && typeof x === 'object' && !isArr(x)
export const isFunc = (x: any): x is Function => typeof x === 'function'
