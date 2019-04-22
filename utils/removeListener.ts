/**
 * @param {string} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {boolean} useCapture bubble or capture
 */
export const removeListener: Function = (function () {
  if (typeof window === 'undefined') return function () {}

  if (!window.removeEventListener) {
    return function (event: string, fn: EventListenerOrEventListenerObject, dom: HTMLElement) {
      const eventDOM: any = dom || window
      eventDOM.detachEvent(`on${event}`, fn)
    }
  }

  return function (event: string, fn: EventListenerOrEventListenerObject, dom: HTMLElement, useCapture: boolean = false) {
    const eventDOM = dom || window
    eventDOM.removeEventListener(event, fn, useCapture)
  }
})()

export default removeListener
