import getUA from './getUA'

let ua
if (typeof window !== 'undefined') {
  try {
    ua = getUA(window.navigator.userAgent)
  } catch (error) {
    console.error(`[IE]: ${error}`)
  }
}


export const isIE: boolean = ua && (<any>ua).trident

export const isEdge: boolean = ua && (<any>ua).edge
