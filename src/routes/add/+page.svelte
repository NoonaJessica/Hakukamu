<script lang="ts">
	import './add.css';
	export let data: any;
</script>

<header class="page-header">
	<h1 class="page-title">Lisää työpaikka</h1>
	<a class="btn ghost" href="/applications">Näytä hakemukset</a>
</header>

<section class="add-shell">
	<div class="add-pattern" aria-hidden="true"></div>

	<div class="add-grid">
		<div class="add-card">
			{#if data?.error}
				<p class="form-error">{data.error}</p>
			{/if}

			<form method="POST" action="?/create" class="form-grid">
				<label class="field">
					<span>Yritys*</span>
					<input name="company" required value={data?.company ?? ''} placeholder="Esim. Yritys Oy" />
				</label>

				<label class="field">
					<span>Rooli*</span>
					<input name="role" required value={data?.role ?? ''} placeholder="Esim. Frontend Developer" />
				</label>

				<label class="field">
					<span>Status</span>
					<select name="status" value={data?.status ?? 'LAHETETTY'}>
						<option value="LAHETETTY">Lähetetty</option>
						<option value="HAASTATTELU">Haastattelu</option>
						<option value="TARJOUS">Tarjous</option>
						<option value="HYLATTY">Hylätty</option>
					</select>
				</label>

				<label class="field">
					<span>Mahdollinen tapaaminen (kalenteri)</span>
					<input
						type="datetime-local"
						name="meetingAt"
						value={data?.meetingAtRaw ?? ''}
					/>
					<small class="help">Voit lisätä esim. haastattelun ajankohdan.</small>
				</label>

				<label class="field">
					<span>Linkki</span>
					<input name="url" value={data?.url ?? ''} placeholder="https://..." />
				</label>

				<label class="field">
					<span>Muistiinpanot</span>
					<textarea name="notes" rows="4" placeholder="Muistiinpanot, kysymykset, fiilikset...">{data?.notes ?? ''}</textarea>
				</label>

				<div class="form-actions">
					<button class="btn" type="submit">Tallenna</button>
					<a class="btn pill" href="/applications">Peruuta</a>
				</div>
			</form>
		</div>

		<!-- oikea palsta: ohje / muistilista -->
		<aside class="side-card">
			<h2>Muistilista</h2>
			<ul class="checklist">
				<li>Kirjoita rooli mahdollisimman tarkasti.</li>
				<li>Lisää linkki työpaikkailmoitukseen.</li>
				<li>Kirjaa ylös kysymykset haastatteluun.</li>
				<li>Lisää tapaamisen aika, jos sovittu.</li>
			</ul>

			<div class="tip">
				Vinkki: Kun tapaaminen on kirjattu, näet sen myöhemmin listalta ja voit päivittää statuksen.
			</div>
		</aside>
	</div>
</section>
