/*
 * @Author: saber
 * @Date: 2021-11-25 16:23:55
 * @LastEditTime: 2023-04-12 11:08:07
 * @LastEditors: saber
 * @Description:
 */
chrome.runtime.onInstalled.addListener(() => {
  const umsDomain = "digitforce.com";
  chrome.storage.sync.set({ umsDomain });
});
