/**
 * @param {string} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {boolean} useCapture bubble or capture
 */
export const removeListener = (function () {
    if (typeof window === 'undefined')
        return function () { };
    if (!window.removeEventListener) {
        return function (event, fn, dom) {
            const eventDOM = dom || window;
            eventDOM.detachEvent(`on${event}`, fn);
        };
    }
    return function (event, fn, dom, useCapture = false) {
        const eventDOM = dom || window;
        eventDOM.removeEventListener(event, fn, useCapture);
    };
})();
export default removeListener;
//# sourceMappingURL=removeListener.js.map