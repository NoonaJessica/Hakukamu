<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="p-4 border-b flex gap-4">
	<a href="/">Etusivu</a>
	<a href="/add">Lisää työpaikka</a>
	<a href="/applications">Hakemukset</a>
</nav>

<main class="p-4">
	{@render children()}
</main>