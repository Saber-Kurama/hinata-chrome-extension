<script>
  import { optimize } from "svgo/dist/svgo.browser.js";
  // https://digit-force.coding.net/dashboard

  console.log("下载菜单icon插件启动");
  const SVG_W = 18;
  const SVG_H = 18;
  const geneSvgInfo = async (svgString, svgName, svgViewBox) => {
    const svgInfo = {
      body: "",
    };
    const name = svgName.toLowerCase();
    // const result = await optimize(
    //   '<svg width="24" height="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M1.50000091,15.9999991 L16.5000009,15.9999991 C16.7761424,15.9999991 17.0000009,16.2238568 17.0000009,16.4999991 C17.0000009,16.7761414 16.7761424,16.9999991 16.5000009,16.9999991 L1.50000091,16.9999991 C1.22385852,16.9999991 1.00000091,16.7761414 1.00000091,16.4999991 C1.00000091,16.2238568 1.22385852,15.9999991 1.50000091,15.9999991 Z M9.00000033,1 C6.92893273,1 5.25000043,2.67893209 5.25000043,4.74999978 C5.25000043,5.91888801 5.78891955,6.99982635 6.6921227,7.70588926 C7.24179072,8.13558239 7.28307571,9.07759868 6.79737849,9.29289527 C5.97753689,9.6563091 4.79501492,9.74890484 3.25423664,9.5522844 C3.16888511,9.54151395 3.08383064,9.53614801 2.99886494,9.53619626 C1.89429576,9.53682361 0.999373998,10.4327623 1.00000033,11.5373315 L1.00000033,14.5 C1.00000033,14.7761416 1.22385852,15 1.50000033,15 L16.5000003,15 C16.7761424,15 17.0000003,14.7761416 17.0000003,14.5 L17.0000003,11.5370477 C17.0000003,11.4517953 16.9946074,11.3663561 16.983716,11.2815285 C16.843056,10.1859969 15.8409483,9.41188481 14.7453713,9.55235395 C13.2048298,9.74895679 12.0223543,9.65635245 11.2026652,9.29291427 C10.7171438,9.07764113 10.7587534,8.13533109 11.3084587,7.70543536 C12.211322,6.9993533 12.75,5.91862826 12.75,4.74999978 C12.75,2.67893209 11.0710681,1 9.00000033,1 Z M9.00000036,1.99999994 C10.5187834,1.99999994 11.75,3.23121681 11.75,4.74999978 C11.75,5.56250734 11.3959004,6.31568504 10.7948653,6.83360446 L10.6924247,6.91771591 C9.60979753,7.76438181 9.52681023,9.6437524 10.7973354,10.2070847 C11.8092515,10.6557535 13.1660812,10.7620123 14.8722545,10.5442715 C15.4204142,10.4739895 15.9215252,10.8610896 15.991858,11.4088773 L15.9995036,11.5047151 L16.0000004,13.9999999 L2.00000036,13.9999999 L2.00000036,11.5370477 C1.99968727,10.9844792 2.44714823,10.5365097 2.99943286,10.536196 C3.04217729,10.5361718 3.08523308,10.5388881 3.12834885,10.5443286 C4.83374251,10.7619563 6.19059133,10.6557101 7.20262262,10.2071037 C8.4436929,9.6569705 8.3939785,7.85126655 7.38192431,6.9787549 L7.30800256,6.91804926 C6.6447145,6.39953569 6.25000027,5.60783693 6.25000027,4.74999978 C6.25000027,3.23121681 7.48121745,1.99999994 9.00000036,1.99999994 Z" fill="currentColor" fill-rule="evenodd"></path></svg>',
    //   {}
    // );
    const result = await optimize(svgString, {});
    const optimizedSvgString = result.data;
    svgInfo.body = optimizedSvgString
      .replace(/^<svg[^>]*?>/, "")
      .replace(/<\/svg>$/, "");
    if (svgViewBox) {
      const svgViewBoxArr = svgViewBox.split(" ");

      const svgViewBoxW = parseInt(svgViewBoxArr[2]) || SVG_W;
      const svgViewBoxH = parseInt(svgViewBoxArr[3]) || SVG_H;
      if (svgViewBoxW !== SVG_W) {
        svgInfo.width = svgViewBoxW;
      }
      if (svgViewBoxH !== SVG_H) {
        svgInfo.height = svgViewBoxH;
      }
    }
    return {
      key: name,
      value: svgInfo,
    };
  };
  const handleClick = async () => {
    const checkedElements = document.getElementsByClassName(
      "iconbox-icon-box-checked-117Lh"
    );
    const asyncSvg = [];
    Array.from(checkedElements).forEach((element) => {
      const svgEle = element.querySelector(
        ".iconbox-icon-box-icon-DX3Te > svg"
      );
      // const svgString = element.getElementsByClassName(
      //   "iconbox-icon-box-icon-DX3Te"
      // )?.[0]?.innerHTML;
      const svgString = svgEle?.outerHTML;
      const svgViewBox = svgEle.getAttribute("viewBox");
      const svgName = element.getElementsByClassName(
        "iconbox-icon-box-text-lnhAc"
      )?.[0]?.innerText;
      if (svgString && svgName) {
        asyncSvg.push(geneSvgInfo(svgString, svgName, svgViewBox));
      }
    });
    const result = await Promise.all(asyncSvg);

    const menuInfoData = {
      prefix: "",
      width: 18,
      height: 18,
      icons: {},
    };
    result.forEach((d) => {
      menuInfoData.icons[d.key] = d.value;
    });
    const str = JSON.stringify(menuInfoData, null, 2);
    const url = `data:,${str}`;
    download(url, "menu-icons.json");
  };
  const download = (url, name) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  };
</script>

<div
  class="arco-space-item absolute"
  on:click={handleClick}
  style="position: fixed; top: 104px; right: 18px;z-index: 1000;"
>
  <button
    class="arco-btn arco-btn-primary arco-btn-status-success arco-btn-size-default arco-btn-shape-square"
    type="button"
    ><svg
      fill="none"
      stroke="currentColor"
      stroke-width="4"
      viewBox="0 0 48 48"
      width="1em"
      height="1em"
      class="arco-icon arco-icon-export"
      ><path
        d="M31.928 33.072 41 24.002l-9.072-9.072M16.858 24h24M31 41H7V7h24"
      /></svg
    ><span>下载菜单icon</span></button
  >
</div>

<style>
</style>
