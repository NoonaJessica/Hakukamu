<script lang="ts">
	export let data: any;

	const statusLabel: Record<string, string> = {
		LAHETETTY: 'Lähetetty',
		HAASTATTELU: 'Haastattelu',
		TARJOUS: 'Tarjous',
		HYLATTY: 'Hylätty'
	};
</script>

<h1>Hakemukset</h1>
<p>Hakemuksia: {data.applications.length}</p>

{#if data.applications.length === 0}
	<p>Ei vielä hakemuksia. <a href="/add">Lisää ensimmäinen</a>.</p>
{:else}
	<ul style="display:grid; gap:12px; padding:0; list-style:none;">
		{#each data.applications as app}
			<li style="border:1px solid #ddd; padding:12px; border-radius:8px;">
				<div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;">
					<div>
						<strong>{app.company}</strong> – {app.role}
						<div style="opacity:.8; font-size:.9em;">
							Status: {statusLabel[app.status] ?? app.status}
						</div>
					</div>

					<!-- Status vaihto -->
					<form method="POST" action="?/setStatus" style="display:flex; gap:8px; align-items:center;">
						<input type="hidden" name="id" value={app.id} />
						<select name="status" value={app.status}>
							<option value="LAHETETTY">Lähetetty</option>
							<option value="HAASTATTELU">Haastattelu</option>
							<option value="TARJOUS">Tarjous</option>
							<option value="HYLATTY">Hylätty</option>
						</select>
						<button type="submit">Vaihda</button>
					</form>
				</div>

				{#if app.url}
				
					<div style="margin-top:6px;">
						<a href={app.url} target="_blank" rel="noreferrer">Linkki</a>
					</div>
				{/if}

				

				<!-- Muokkaus "listan sisällä" -->
				<details style="margin-top:10px;">
					<summary>Muokkaa</summary>

					<form method="POST" action="?/update" style="display:grid; gap:8px; margin-top:10px;">
						<input type="hidden" name="id" value={app.id} />

						<label>
							Yritys*
							<input name="company" required value={app.company} />
						</label>

						<label>
							Rooli*
							<input name="role" required value={app.role} />
						</label>

						<label>
							Linkki
							<input name="url" value={app.url ?? ''} />
						</label>

						<label>
							Muistiinpanot
							<textarea name="notes" rows="3">{app.notes ?? ''}</textarea>
						</label>

						<div style="display:flex; gap:8px; align-items:center;">
							<button type="submit">Tallenna muutokset</button>

							<button
								type="submit"
								formaction="?/delete"
								on:click={(e) => {
									if (!confirm('Poistetaanko tämä hakemus?')) {
										e.preventDefault();
									}
								}}
							>
								Poista
							</button>
						</div>
					</form>
				</details>
			</li>
		{/each}
	</ul>
{/if}