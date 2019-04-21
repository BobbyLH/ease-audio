"use strict";
exports.__esModule = true;
/**
 * @param {string} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {boolean} useCapture bubble or capture
 */
exports.removeListener = (function () {
    if (typeof window === 'undefined')
        return function () { };
    if (!window.removeEventListener) {
        return function (event, fn, dom) {
            var eventDOM = dom || window;
            eventDOM.detachEvent("on" + event, fn);
        };
    }
    return function (event, fn, dom, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        var eventDOM = dom || window;
        eventDOM.removeEventListener(event, fn, useCapture);
    };
})();
exports["default"] = exports.removeListener;
