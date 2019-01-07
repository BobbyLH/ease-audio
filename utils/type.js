export const getType = (obj) => {
  if (typeof obj !== 'object') return typeof obj
  const len = Object.prototype.toString.call(obj).length - 1
  return Object.prototype.toString.call(obj).slice(8, len).toLowerCase()
}
