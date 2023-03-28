// import axios from "axios";
const axios = require("axios");

const pubNotice = async (version) => {
  axios.post(
    "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=67db89f6-7ccb-4319-8775-6dbbdaad5021",
    {
      msgtype: "markdown",
      markdown: {
        content: `# 🎉主题平台版本${version}发布成功\n主题发布成功，可点击以下链接进行查看\n[@arco-themes/vue-digitforce](https://www.npmjs.com/package/@arco-themes/vue-digitforce)`,
      },
    }
  );
};

pubNotice("0.0.46");
