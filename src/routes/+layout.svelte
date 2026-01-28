<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import logo from '$lib/assets/hakukamu_logo.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<aside class="sidebar">
		<div class="brand">
			<img class="logo-img" src={logo} alt="Hakukamu logo" />
		</div>

		<nav class="side-nav">
			<a class="nav-item" href="/">Etusivu</a>
			<a class="nav-item" href="/add">Lisää työpaikka</a>
			<a class="nav-item" href="/applications">Hakemukset</a>
		</nav>

		<div class="sidebar-footer">
			<div class="hint">Vinkki: pidä muistiinpanot ajan tasalla ✍️</div>
		</div>
	</aside>

	<div class="content">
		<div class="content-card">
			{@render children()}
		</div>
	</div>
</div>