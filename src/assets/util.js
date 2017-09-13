/**
 * 格式化时间
 * @param  {Number | String} date 待格式化的时间
 * @return {String}     返回的时间
 */
export function tranTime (date) {
  var date = new Date(date);
  var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return '';
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前';
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前';
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '个小时前';
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前';
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '个月前';
  } else {
    return parseInt(time / 31536000000) + '年前';
  }
};

/**
* 将tab类型转换成汉子
* @param {String} tab 待转换的tab类型
* @return {String} 翻译之后的tab类型
*/
export function translateTab (tab) {
  if (tab === 'share') {
    return '分享'
  }
  if (tab === 'ask') {
    return '问答'
  }
  if (tab === 'job') {
    return '招聘'
  }
}
