<script lang="ts">
	export let data: any;

	const statusLabel: Record<string, string> = {
		LAHETETTY: 'Lähetetty',
		HAASTATTELU: 'Haastattelu',
		TARJOUS: 'Tarjous',
		HYLATTY: 'Hylätty'
	};

	let filter = 'ALL';
	const statuses = ['ALL', 'LAHETETTY', 'HAASTATTELU', 'TARJOUS', 'HYLATTY'];

	$: filtered =
		filter === 'ALL' ? data.applications : data.applications.filter((a: any) => a.status === filter);

	function confirmDelete() {
		return confirm('Poistetaanko tämä hakemus?');
	}
</script>

<header class="page-header">
	<h1 class="page-title">Hakemukset</h1>

</header>

<section class="panel">
	<div class="panel-head">
		
		<div class="panel-meta">Hakemuksia: {filtered.length}</div>
			<div class="page-actions">
		<div class="pill-select">
			<select bind:value={filter} aria-label="Suodata statuksen mukaan">
				{#each statuses as s}
					<option value={s}>{s === 'ALL' ? 'Kaikki' : statusLabel[s]}</option>
				{/each}
			</select>
		</div>
	</div>
	</div>

	<div class="table-wrap">
		<table class="table">
			<thead>
				<tr>
					<th>Yritys</th>
					<th>Rooli</th>
					<th>Linkki</th>
					<th>Status</th>
					<th class="actions-col"></th>
				</tr>
			</thead>

			<tbody>
				{#each filtered as app (app.id)}
					<tr>
						<td class="cell-strong">{app.company}</td>
						<td>{app.role}</td>
						<td>
							{#if app.url}
								<a class="table-link" href={app.url} target="_blank" rel="noreferrer">Avaa</a>
							{:else}
								<span class="muted">—</span>
							{/if}
						</td>

						<td>
							<form method="POST" action="?/setStatus" class="inline">
								<input type="hidden" name="id" value={app.id} />
								<div class="status-control">
									<span class="status-pill {app.status}">
										{statusLabel[app.status] ?? app.status}
									</span>

									<select name="status" class="status-select" value={app.status}>
										<option value="LAHETETTY">Lähetetty</option>
										<option value="HAASTATTELU">Haastattelu</option>
										<option value="TARJOUS">Tarjous</option>
										<option value="HYLATTY">Hylätty</option>
									</select>

									<button class="btn ghost" type="submit">Päivitä</button>
								</div>
							</form>
						</td>

						<td class="actions">
							<details class="row-details">
								<summary class="btn pill">Avaa</summary>

								<div class="details-card">
									<div class="details-grid">
										<div>
											<div class="label">Muistiinpanot</div>
											<div class="notes">{app.notes ?? '—'}</div>
										</div>

										<form method="POST" action="?/update" class="edit-form">
											<input type="hidden" name="id" value={app.id} />

											<label class="field">
												<span>Yritys</span>
												<input name="company" required value={app.company} />
											</label>

											<label class="field">
												<span>Rooli</span>
												<input name="role" required value={app.role} />
											</label>

											<label class="field">
												<span>Linkki</span>
												<input name="url" value={app.url ?? ''} />
											</label>

											<label class="field">
												<span>Muistiinpanot</span>
												<textarea name="notes" rows="3">{app.notes ?? ''}</textarea>
											</label>

											<div class="edit-actions">
												<button class="btn" type="submit">Tallenna</button>

												<button
													class="btn danger"
													type="submit"
													formaction="?/delete"
													on:click={(e) => {
														if (!confirmDelete()) e.preventDefault();
													}}
												>
													Poista
												</button>
											</div>
										</form>
									</div>
								</div>
							</details>
						</td>
					</tr>
				{/each}

				{#if filtered.length === 0}
					<tr>
						<td colspan="5" class="empty">
							Ei hakemuksia tällä suodatuksella. <a href="/add">Lisää uusi</a>.
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</section>