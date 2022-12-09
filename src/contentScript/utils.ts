export const isObj = (val: unknown): val is Record<any, any> => {
  return val !== null && typeof val === 'object'
}
