/*
 * @Author: saber
 * @Date: 2021-11-25 16:23:55
 * @LastEditTime: 2021-11-26 10:47:04
 * @LastEditors: saber
 * @Description: 
 */
chrome.runtime.onInstalled.addListener(() => {
  console.log('on installed');
  const umsDomain = 'digitforce.com'
  chrome.storage.sync.set({ umsDomain });
});
