/*
 * @Author: saber
 * @Date: 2021-11-25 16:23:55
 * @LastEditTime: 2023-03-29 11:29:37
 * @LastEditors: saber
 * @Description:
 */
chrome.runtime.onInstalled.addListener(() => {
  console.log("on installed");
  const umsDomain = "dev.digitforce.com";
  chrome.storage.sync.set({ umsDomain });
});
