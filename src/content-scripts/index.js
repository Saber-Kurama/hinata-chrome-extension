import "../styles/global.css";
import App from "./App.svelte";

setTimeout(() => {
  // const spaceDom = document.querySelectorAll(
  //   ".iconbox-lib-detail-banner-BqIpx"
  // );
  // console.log("spaceDom", spaceDom);
  // const dom = spaceDom.length && spaceDom[0] && spaceDom[0];
  const dom = document.body;
  const app = new App({
    target: dom,
  });
}, 3000);
const initApp = {};
export default initApp;
