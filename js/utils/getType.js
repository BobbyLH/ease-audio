/**
 * get element type
 * @param {any} ele the target element
 * @return {string} the element type
 */
export const getType = ele => {
    if (typeof ele !== 'object')
        return typeof ele;
    const len = Object.prototype.toString.call(ele).length - 1;
    return Object.prototype.toString.call(ele).slice(8, len).toLowerCase();
};
export default getType;
//# sourceMappingURL=getType.js.map