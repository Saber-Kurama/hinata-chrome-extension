/*
 * @Author: saber
 * @Date: 2021-11-22 20:10:16
 * @LastEditTime: 2022-01-26 20:13:52
 * @LastEditors: saber
 * @Description: 
 */
chrome.runtime.sendMessage(["getLogicCode"], (e) => {
  try {
    if (!e) return;
    e.version, e.lastModified, e.content && window.eval(e.content);
  } catch (t) {
    t.message;
  }
});
