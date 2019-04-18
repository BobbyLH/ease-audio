/**
 * @param {string} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {boolean} useCapture bubble or capture
 */
export const addListener: Function = (function () {
  if (typeof window === 'undefined') return function () {}

  if (!window.addEventListener) {
    return function (event: string, fn: EventListenerOrEventListenerObject, dom: HTMLElement) {
      const eventDOM: any = dom || window
      eventDOM.attachEvent(`on${event}`, fn)
    }
  }

  return function (event: string, fn: EventListenerOrEventListenerObject, dom: HTMLElement, useCapture: boolean = false) {
    const eventDOM = dom || window
    eventDOM.addEventListener(event, fn, useCapture)
  }
})()

export default addListener
