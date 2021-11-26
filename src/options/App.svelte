<script>
	import { onMount } from 'svelte';
	let umsDomain = ''
	onMount(async () => {
		const res = await chrome.storage.sync.get("umsDomain");
		console.log('res---', res)
		umsDomain = res.umsDomain || ''
	})
	const changeUmsDomain = async () => {
		await chrome.storage.async.set({umsDomain})
	}
	export let name;
</script>

<main class="">
  <h1 class="text-center">{name}</h1>
  <div class="flex items-center">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="mr-2 label">
      <span class="label-text">UMS的域名：</span>
    </label>
		<div class="flex flex-1 space-x-2">
			<input bind:value={ umsDomain } type="text" placeholder="Search" class="w-full input input-primary input-bordered"> 
			<button class="btn btn-primary" on:click={changeUmsDomain}>设置</button>
		</div>
  </div>
</main>

<style>
  main {
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
