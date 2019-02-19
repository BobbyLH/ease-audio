import getUA from './handleUA'

let ua

try {
  ua = typeof window !== 'undefined' && window.navigator && window.navigator.userAgent
} catch (error) {
  console.error(`[isIE]: ${error}`)
}

export const isIE = ua ? getUA(ua).trident : false

export const isEdge = ua ? getUA(ua).edge : false
