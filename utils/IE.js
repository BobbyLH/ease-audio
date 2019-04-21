"use strict";
exports.__esModule = true;
var getUA_1 = require("./getUA");
var ua;
if (typeof window !== 'undefined') {
    try {
        ua = getUA_1["default"](window.navigator.userAgent);
    }
    catch (error) {
        console.error("[IE]: " + error);
    }
}
exports.isIE = ua && ua.trident;
exports.isEdge = ua && ua.edge;
