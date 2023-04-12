import "../styles/global.css";
import App from "./App.svelte";

setTimeout(() => {
  const spaceDom = document.querySelectorAll(
    ".iconbox-lib-detail-banner-inner-yvqev > .arco-space"
  );
  const dom = spaceDom.length && spaceDom[1] ? spaceDom[1] : document.body;
  const app = new App({
    target: dom,
  });
}, 1000);
const initApp = {};
export default initApp;
