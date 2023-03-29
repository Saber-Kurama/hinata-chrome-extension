import "../styles/global.css";
import App from "./App.svelte";

console.log("window", localStorage.length);
console.log("saber---", window.location);

setTimeout(() => {
  const spaceDom = document.querySelectorAll(
    ".iconbox-lib-detail-banner-inner-yvqev > .arco-space"
  );
  console.log("spaceDom", spaceDom);
  const dom = spaceDom.length && spaceDom[1] ? spaceDom[1] : document.body;
  console.log("dom", dom);
  const app = new App({
    target: dom,
  });
}, 1000);
const initApp = {};
export default initApp;
