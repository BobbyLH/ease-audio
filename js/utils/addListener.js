/**
 * @param {string} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {boolean} useCapture bubble or capture
 */
export const addListener = (function () {
    if (typeof window === 'undefined')
        return function () { };
    if (!window.addEventListener) {
        return function (event, fn, dom) {
            const eventDOM = dom || window;
            eventDOM.attachEvent(`on${event}`, fn);
        };
    }
    return function (event, fn, dom, useCapture = false) {
        const eventDOM = dom || window;
        eventDOM.addEventListener(event, fn, useCapture);
    };
})();
export default addListener;
//# sourceMappingURL=addListener.js.map