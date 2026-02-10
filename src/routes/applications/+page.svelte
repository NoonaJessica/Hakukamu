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
					<th>Tapaaminen</th>
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
							<span class="status-pill {app.status}">
								{statusLabel[app.status] ?? app.status}
							</span>
						</td>

						<td>
							{#if app.meetingAt}
								📅 {new Date(app.meetingAt * 1000).toLocaleDateString('fi-FI')}
							{:else}
								<span class="muted">—</span>
							{/if}
						</td>

						<td class="actions">
							<details class="row-details">
								<summary class="btn pill">Avaa</summary>

								<div class="details-card">
									<button 
										type="button"
										class="close-btn"
										on:click={(e) => {
											const details = e.currentTarget.closest('details');
											if (details) details.open = false;
										}}
										aria-label="Sulje"
									>
										×
									</button>
									<div class="details-grid">
										<div>
											<div class="label">Muistiinpanot</div>
											<div class="notes">{app.notes ?? '—'}</div>
											<div class="calendar-section">
												<div class="label">Tapaaminen</div>
												<div class="meeting-date">
													{#if app.meetingAt}
														{new Date(app.meetingAt * 1000).toLocaleDateString('fi-FI')}
													{:else}
														—
													{/if}
												</div>
											</div>
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
											<span>Status</span>
											<select name="status" class="status-select">
												<option value="LAHETETTY" selected={app.status === 'LAHETETTY'}>Lähetetty</option>
												<option value="HAASTATTELU" selected={app.status === 'HAASTATTELU'}>Haastattelu</option>
												<option value="TARJOUS" selected={app.status === 'TARJOUS'}>Tarjous</option>
												<option value="HYLATTY" selected={app.status === 'HYLATTY'}>Hylätty</option>
											</select>
										</label>

										<label class="field">
											<span>Muistiinpanot</span>
											<textarea name="notes" rows="3">{app.notes ?? ''}</textarea>
										</label>
										<label class="field">
											<span>Tapaamisen päivämäärä</span>
											<input 
												type="date" 
												name="meetingAt" 
												value={app.meetingAt ? new Date(app.meetingAt * 1000).toISOString().split('T')[0] : ''}
											/>
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
						<td colspan="6" class="empty">
							Ei hakemuksia tällä suodatuksella. <a href="/add">Lisää uusi</a>.
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</section>
