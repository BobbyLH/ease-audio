export function getUA (u) {
  if (!u) return false
  // console.log(u)
  const obj = {
    edge: u.indexOf('Edge') > -1, // Edge内核
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/Mobile/g), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
    weibo: u.indexOf('Weibo') > -1, // 是否微博
    facebook: u.indexOf('FBAN') > -1, // 是否facebook
    twitter: u.indexOf('FBAN') > -1, // 是否twitter
    qq: u.match(/\sQQ/i) === ' qq', // 是否QQ
    hmlyApp: /himalaya/i.test(u) // 是否在 himalaya app
  }
  return obj
}

export default getUA
