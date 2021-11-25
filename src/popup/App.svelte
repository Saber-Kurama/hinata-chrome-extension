<script>
  const cookieHandle = () => {
    console.log("???");
  };
  let domain = "";
  let port = "";

  // 从ums的登录地址域名中 拷贝 cookies 到 本地开发环境
  const copyUmsCookies = async () => {
	const domain = 'developer.mozilla.org'  
	const cookies = await chrome.cookies.getAll({ domain });
	console.log('cookiescookies', cookies)
	let pending = cookies.map(copyCookies);
    await Promise.all(pending);
  }
  const copyCookies = async (cookie) => {
	  try {
		await chrome.cookies.set({  expirationDate: cookie.expirationDate, name: cookie.namme, value: cookie.value, domain: 'localhost:9000', url:'localhost:9000' }); 
	  } catch (error) {
		  
	  }
  }
  const getDomainCookies = async () => {};
  export let name;
</script>

<main>
  <div class="flex w-full items-center">
    <input
      type="text"
      bind:value={port}
      placeholder="输入本地端口"
      class="input input-bordered flex-1 mr-2"
    />
    <button class="btn btn-primary" on:click={copyUmsCookies}>ums cookie 拷贝</button>
  </div>

  <div class="divider" />
  <div class="flex w-full items-center">
    <input
      type="text"
      bind:value={domain}
      placeholder="输入网址"
      class="input input-bordered flex-1"
    />
    <button class="btn btn-primary" on:click={getDomainCookies}
      >查看cookie</button
    >
  </div>
  <table />
</main>

<style>
  main {
    padding: 1em;
    width: 600px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
