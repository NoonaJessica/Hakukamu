<script lang="ts">
	import './mainpage.css';
	export let data: any;

	const STATUSES = ['LAHETETTY', 'HAASTATTELU', 'TARJOUS', 'HYLATTY'] as const;

	const statusLabel: Record<string, string> = {
		LAHETETTY: 'Lähetetty',
		HAASTATTELU: 'Haastattelu',
		TARJOUS: 'Tarjous',
		HYLATTY: 'Hylätty'
	};

	// sama värikoodi palloille ja diagrammille
	const statusColor: Record<string, string> = {
		LAHETETTY: '#3730a3',
		HAASTATTELU: '#c2410c',
		TARJOUS: '#065f46',
		HYLATTY: '#991b1b'
	};

	$: apps = data.applications ?? [];

	$: counts = STATUSES.reduce((acc: any, s) => {
		acc[s] = apps.filter((a: any) => a.status === s).length;
		return acc;
	}, {});

	$: total = STATUSES.reduce((sum, s) => sum + (counts[s] ?? 0), 0);

	// Donitsi-SVG laskenta
	const r = 54;
	const c = 2 * Math.PI * r;

	$: segments = (() => {
		let offset = 0;
		return STATUSES.map((s) => {
			const value = counts[s] ?? 0;
			const dash = total === 0 ? 0 : (value / total) * c;
			const seg = { key: s, value, dash, offset };
			offset += dash;
			return seg;
		});
	})();
</script>

<header class="home-header">
	<div>
		<h1 class="home-title">Hakukamu apuna työn haussa </h1>
		<p class="home-sub">Seuraa työnhakua yhdellä silmäyksellä.</p>
	</div>

	<a class="home-cta" href="/add"> Lisää työpaikka</a>
</header>

<!-- Selite väreille -->
<section class="legend">
	{#each STATUSES as s}
		<div class="legend-item">
			<span class="dot" style={`background:${statusColor[s]}`}></span>
			<span class="legend-text">{statusLabel[s]}</span>
			<span class="legend-count">{counts[s] ?? 0}</span>
		</div>
	{/each}
</section>

<div class="home-grid">
	<!-- vasen: lista -->
	<section class="card">
		<div class="card-head">
			<h2>Viimeisimmät hakemukset</h2>
			<a class="link" href="/applications">Katso kaikki →</a>
		</div>

		{#if apps.length === 0}
			<p class="muted">Ei vielä hakemuksia. Lisää ensimmäinen hakemus.</p>
		{:else}
			<ul class="home-list">
				{#each apps.slice(0, 6) as app (app.id)}
					<li class="home-row">
						<div class="row-left">
							<span class="dot" style={`background:${statusColor[app.status] ?? '#9ca3af'}`}></span>
							<div class="row-text">
								<div class="row-title">{app.company}</div>
								<div class="row-sub">{app.role}</div>
							</div>
						</div>

						<div class="row-right">
							<span class="pill">{statusLabel[app.status] ?? app.status}</span>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</section>

	<!-- oikea: donitsi -->
	<section class="card">
		<div class="card-head">
			<h2>Jakauma statuksen mukaan</h2>
			<span class="muted">Yhteensä: {total}</span>
		</div>

		<div class="donut-wrap">
			<svg class="donut" viewBox="0 0 140 140" role="img" aria-label="Hakemusten jakauma">
				<!-- taustarengas -->
				<g transform="rotate(-90 70 70)">
					<circle cx="70" cy="70" r={r} fill="transparent" stroke="rgba(0,0,0,0.06)" stroke-width="16" />

					{#each segments as seg (seg.key)}
						{#if seg.value > 0}
							<circle
								cx="70"
								cy="70"
								r={r}
								fill="transparent"
								stroke={statusColor[seg.key]}
								stroke-width="16"
								stroke-linecap="round"
								stroke-dasharray={`${seg.dash} ${c - seg.dash}`}
								stroke-dashoffset={-seg.offset}
							/>
						{/if}
					{/each}
				</g>

				<!-- keskiteksti -->
				<text x="70" y="66" text-anchor="middle" class="donut-total">{total}</text>
				<text x="70" y="86" text-anchor="middle" class="donut-label">hakemusta</text>
			</svg>

			<div class="donut-side">
				{#each STATUSES as s}
					<div class="donut-row">
						<span class="dot" style={`background:${statusColor[s]}`}></span>
						<span class="donut-name">{statusLabel[s]}</span>
						<span class="donut-val">{counts[s] ?? 0}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>

