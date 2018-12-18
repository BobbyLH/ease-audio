'use strict'
// adapt IE add event
export const addListener = (event, fn, dom) => {
  if (!window) return false
  const eventDOM = dom || window
  if (window.addEventListener) {
    eventDOM.addEventListener(event, fn, false)
  } else {
    eventDOM.attachEvent(`on${event}`, fn)
  }
}
// adapt IE remove event
export const removeListener = (event, fn, dom) => {
  if (!window) return false
  const eventDOM = dom || window
  if (window.removeEventListener) {
    eventDOM.removeEventListener(event, fn, false)
  } else {
    eventDOM.detachEvent(`on${event}`, fn)
  }
}
// prevent default
export const preventEvent = event => {
  const e = event || window.event
  if (e && e.preventDefault) {
    e.cancelable && !e.defaultPrevented && e.preventDefault()
  } else {
    e.returnValue = false
  }
  return false
}
// stop propagat
export const stopEvent = event => {
  const e = event || window.event
  if (e && e.stopPropagation) {
    e.stopPropagation()
  } else {
    e.cancelBubble = true
  }
}
