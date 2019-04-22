import getUA from './getUA';
let ua;
if (typeof window !== 'undefined') {
    try {
        ua = getUA(window.navigator.userAgent);
    }
    catch (error) {
        console.error(`[IE]: ${error}`);
    }
}
export const isIE = ua && ua.trident;
export const isEdge = ua && ua.edge;
//# sourceMappingURL=IE.js.map