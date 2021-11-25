<script>
	const cookieHandle = () => {
		console.log('???')
	}
	export let name;
</script>

<main>
	<ul>
		<li on:click={cookieHandle}>cookie和storage管理</li>
		<li></li>
		<li></li>
	</ul>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}


	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
