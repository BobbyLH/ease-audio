"use strict";
exports.__esModule = true;
/**
 * generation ua object accroding to navigator.userAgent
 * @param {string} u navigator.userAgent
 * @return {false | Iua} ua object
 */
function getUA(u) {
    if (!u)
        return false;
    var ua = {
        edge: u.indexOf('Edge') > -1,
        trident: u.indexOf('Trident') > -1,
        presto: u.indexOf('Presto') > -1,
        webKit: u.indexOf('AppleWebKit') > -1,
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/Mobile/g),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        iPhone: u.indexOf('iPhone') > -1,
        iPad: u.indexOf('iPad') > -1,
        webApp: u.indexOf('Safari') === -1,
        weixin: u.indexOf('MicroMessenger') > -1,
        weibo: u.indexOf('Weibo') > -1,
        facebook: u.indexOf('FBAN') > -1,
        twitter: u.indexOf('Twitter') > -1,
        instagram: u.indexOf('Instagram') > -1,
        qq: !!u.match(/\sQQ/i),
        hmlyApp: /himalaya/i.test(u) // 是否在 himalaya app
    };
    return ua;
}
exports.getUA = getUA;
exports["default"] = getUA;
