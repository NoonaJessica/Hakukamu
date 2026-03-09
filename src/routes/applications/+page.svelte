<script lang="ts">
	export let data: any;

	const statusLabel: Record<string, string> = {
		LAHETETTY: 'Lähetetty',
		HAASTATTELU: 'Haastattelu',
		TARJOUS: 'Tarjous',
		HYLATTY: 'Hylätty'
	};

	let filter = 'ALL';
	let currentPage = 1;
	const itemsPerPage = 8;
	const statuses = ['ALL', 'LAHETETTY', 'HAASTATTELU', 'TARJOUS', 'HYLATTY'];

	$: filtered =
		filter === 'ALL' ? data.applications : data.applications.filter((a: any) => a.status === filter);

	$: totalPages = Math.ceil(filtered.length / itemsPerPage);

	$: paginatedItems = filtered.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: if (currentPage > totalPages && totalPages > 0) {
		currentPage = totalPages;
	}

	function goToPage(page: number) {
		currentPage = Math.max(1, Math.min(page, totalPages));
	}

	function confirmDelete() {
		return confirm('Poistetaanko tämä hakemus?');
	}
</script>

<header class="page-header">
	<h1 class="page-title"> 📝 Hakemukset</h1>
	<a class="btn ghost" href="/add">+ Lisää uusi</a>
</header>

<section class="panel">
	<div class="panel-head">
		<div class="panel-meta">{filtered.length}  hakemusta</div>
		<div class="page-actions">
			<div class="pill-select">
				<label for="status-filter">Suodata:</label>
				<select id="status-filter" bind:value={filter} on:change={() => (currentPage = 1)} aria-label="Suodata statuksen mukaan">
					{#each statuses as s}
						<option value={s}>{s === 'ALL' ? 'Kaikki' : '' + statusLabel[s]}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<div class="table-wrap">
		<table class="table">
			<thead>
				<tr>
					<th>🏢 Yritys</th>
					<th>💼 Rooli</th>
					<th>🔗 Linkki</th>
					<th>📊 Status</th>
					<th>📅 Tapaaminen</th>
					<th class="actions-col">⚙️</th>
				</tr>
			</thead>

			<tbody>
				{#each paginatedItems as app (app.id)}
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
								📅 {new Date(app.meetingAt * 1000).toLocaleDateString('fi-FI')} {new Date(app.meetingAt * 1000).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })}
							{:else}
								<span class="muted">—</span>
							{/if}
						</td>

						<td class="actions">
							<details class="row-details">
								<summary class="btn pill">Avaa</summary>

								<div class="details-card">
									
									<div class="details-grid">
										<div>
											<h1>Muokkaa työpaikkaa</h1>
											<div class="calendar-section">
												
												
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
										<label class="field">
											<span>Tapaamisen aika</span>
											<input 
												type="time" 
												name="meetingTime" 
												value={app.meetingAt ? new Date(app.meetingAt * 1000).toISOString().substring(11, 16) : ''}
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
							<div class="empty-state">
								<div class="empty-icon">📭</div>
								<p>Ei hakemuksia tällä suodatuksella</p>
								<a href="/add" class="btn">➕ Lisää ensimmäinen</a>
							</div>
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>

	<!-- Pagination controls -->
	<div class="pagination">
		<button 
			class="btn"
			on:click={() => goToPage(currentPage - 1)} 
			disabled={currentPage === 1}
		>
			← Edellinen
		</button>

		<div class="page-info">
			Sivu {currentPage} / {totalPages}
		</div>

		<button 
			class="btn"
			on:click={() => goToPage(currentPage + 1)} 
			disabled={currentPage === totalPages || totalPages === 0}
		>
			Seuraava →
		</button>
	</div>
</section>

<style>
	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16px;
		margin-top: 20px;
		padding: 16px 0;
	}

	.page-info {
		font-weight: 600;
		color: #1f2937;
		min-width: 100px;
		text-align: center;
	}

	:global(.pagination .btn:disabled) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	:global(.pagination .btn:disabled:hover) {
		background: #6c5ce7;
	}

	:global(.table tbody tr) {
		transition: background-color 0.15s;
	}

	:global(.table tbody tr:hover) {
		background-color: rgba(108, 92, 231, 0.05);
	}

	:global(.pill-select) {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	:global(.pill-select label) {
		font-weight: 600;
		color: #6b7280;
		font-size: 0.9rem;
	}

	:global(.pill-select select) {
		padding: 8px 12px;
		border-radius: 12px;
		border: 1.5px solid rgba(108, 92, 231, 0.3);
		background: rgba(108, 92, 231, 0.08);
		color: #3730a3;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s;
	}

	:global(.pill-select select:hover) {
		border-color: rgba(108, 92, 231, 0.5);
		background: rgba(108, 92, 231, 0.12);
	}

	:global(.pill-select select:focus) {
		outline: none;
		border-color: #3730a3;
		box-shadow: 0 0 0 3px rgba(55, 48, 163, 0.1);
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		padding: 40px 20px;
		text-align: center;
	}

	.empty-state :global(.empty-icon) {
		font-size: 3rem;
		opacity: 0.6;
	}

	.empty-state :global(p) {
		margin: 0;
		color: #6b7280;
		font-weight: 500;
	}

	.empty-state :global(.btn) {
		margin-top: 8px;
	}
</style>
