"use strict";
exports.__esModule = true;
/**
 * get element type
 * @param {any} ele the target element
 * @return {string} the element type
 */
exports.getType = function (ele) {
    if (typeof ele !== 'object')
        return typeof ele;
    var len = Object.prototype.toString.call(ele).length - 1;
    return Object.prototype.toString.call(ele).slice(8, len).toLowerCase();
};
exports["default"] = exports.getType;
