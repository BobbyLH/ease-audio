// adapt IE add event
export const addListener = (function () {
  if (typeof window === 'undefined') return function () {}

  if (!window.addEventListener) {
    return function (event, fn, dom) {
      const eventDOM = dom || window
      eventDOM.attachEvent(`on${event}`, fn)
    }
  }

  return function (event, fn, dom, useCapture = false) {
    const eventDOM = dom || window
    eventDOM.addEventListener(event, fn, useCapture)
  }
})()
// adapt IE remove event
export const removeListener = (function () {
  if (typeof window === 'undefined') return function () {}

  if (!window.removeEventListener) {
    return function (event, fn, dom) {
      const eventDOM = dom || window
      eventDOM.detachEvent(`on${event}`, fn)
    }
  }

  return function (event, fn, dom, useCapture = false) {
    const eventDOM = dom || window
    eventDOM.removeEventListener(event, fn, useCapture)
  }
})()
// prevent default
export const preventEvent = event => {
  const e = event || (typeof window !== 'undefined' && window.event)
  if (e && e.preventDefault) {
    e.cancelable && !e.defaultPrevented && e.preventDefault()
  } else {
    e.returnValue = false
  }
  return false
}
// stop propagat
export const stopEvent = event => {
  const e = event || (typeof window !== 'undefined' && window.event)
  if (e && e.stopPropagation) {
    e.stopPropagation()
  } else {
    e.cancelBubble = true
  }
}
