<script>
  const cookieHandle = () => {
    console.log("???");
  };
  let domain = "";
  let port = "";

  // 从ums的登录地址域名中 拷贝 cookies 到 本地开发环境
  const copyUmsCookies = async () => {
    const res = await chrome.storage.sync.get("umsDomain");
    console.log('res---', res)
    const cookies = await chrome.cookies.getAll({ domain: res.umsDomain });
    console.log('cookiescookies', cookies)
    let pending = cookies.filter((cookie) => !cookie.hostOnly).map(copyLoacalCookies);
    await Promise.all(pending);
  }
  const copyLoacalCookies = async (cookie) => {
    const {hostOnly, session, ...resetProp} = cookie;
	  try {
		  await chrome.cookies.set({ ...resetProp, domain: 'localhost', url:'http://localhost:3000' });
      await chrome.cookies.set({ ...resetProp, domain: '127.0.0.1', url:'http://127.0.0.1:3000' });
      return '' 
	  } catch (error) {
		  console.log(error)
      return ''
	  }
  }
  const getDomainCookies = async () => {};
  export let name;
</script>

<main>
  <!-- <div class="flex items-center w-full">
    <input
      type="text"
      bind:value={port}
      placeholder="输入本地端口"
      class="flex-1 mr-2 input input-bordered"
    />
    <button class="btn btn-primary" on:click={copyUmsCookies}>ums cookie 拷贝</button>
  </div>

  <div class="divider" />
  <div class="flex items-center w-full">
    <input
      type="text"
      bind:value={domain}
      placeholder="输入网址"
      class="flex-1 input input-bordered"
    />
    <button class="btn btn-primary" on:click={getDomainCookies}
      >查看cookie</button
    >
  </div>
  <table /> -->
  <ul class="shadow-lg menu bg-base-100 ">
    <li class="menu-title">
      <span> 开发助手 </span>
    </li>
    <li>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a on:click={copyUmsCookies}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-5 h-5 mr-2 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        同步umscookie</a
      >
    </li>
    <li>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-5 h-5 mr-2 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        管理cookie和storage
      </a>
    </li>
    <li>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-5 h-5 mr-2 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        设置
      </a>
    </li>
  </ul>
</main>

<style>
  main {
    padding: 0;
    width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
