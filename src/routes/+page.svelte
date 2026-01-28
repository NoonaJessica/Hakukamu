<script lang="ts">
	export let data: any;
</script>

<h1>Työhakemusseuranta</h1>


<p>Hakemuksia: {data?.applications?.length ?? 0}</p>

{#if !data?.applications || data.applications.length === 0}
	<p>Ei vielä hakemuksia. Lisää ensimmäinen hakemus.</p>
{:else}
	<ul>
		{#each data.applications as app}
			<li>
				<strong>{app.company}</strong> – {app.role} ({app.status})
			</li>
		{/each}
	</ul>
{/if}