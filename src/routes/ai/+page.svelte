<script lang="ts">
	let feedbackText = '';
	let feedback = '';
	let isLoading = false;

	async function analyzeFeedback() {
		if (!feedbackText.trim()) return;

		isLoading = true;
		feedback = '';
		try {
			console.log('Lähetetään palaute pyyntö...');
			const res = await fetch('/api/ai-feedback', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ text: feedbackText })
			});

			console.log('Vastauksen status:', res.status);
			
			if (!res.ok) {
				throw new Error(`API virhe: ${res.status} ${res.statusText}`);
			}

			const data = await res.json();
			console.log('Saatu data:', data);
			feedback = data.feedback || 'Ei palautetta saatu.';
		} catch (error) {
			console.error('Virhe:', error);
			feedback = `Virhe AI-palautteen haussa: ${error instanceof Error ? error.message : 'Tuntematon virhe'}. Varmista, että Ollama on käynnissä osoitteessa http://localhost:11434`;
		} finally {
			isLoading = false;
		}
	}
</script>

<header class="page-header">
	<h1 class="page-title">🤖 AI Palaute</h1>
	<a class="btn ghost" href="/">Takaisin</a>
</header>

<section class="ai-page">
	<div class="ai-card">
		<h2>Anna tekstistä AI-palaute</h2>
		<p class="description">
			Kirjoita työhakemuksesi, CV:si tai mitä tahansa tekstiä, niin saat siitä älykästä palautetta.
		</p>

		<div class="feedback-form">
			<label class="field">
				<span>Teksti analysoitavaksi</span>
				<textarea 
					bind:value={feedbackText} 
					rows="8" 
					placeholder="Liitä tähän työhakemus, CV tai muu teksti, jonka haluat analysoida..."
					class="large-textarea"
				></textarea>
			</label>

			<button 
				class="btn btn-large"
				on:click={analyzeFeedback}
				disabled={isLoading || !feedbackText.trim()}
			>
				{isLoading ? '⏳ Analysoidaan...' : '✨ Anna AI-palaute'}
			</button>
		</div>

		{#if feedback}
			<div class="feedback-result">
				<h3>📝 AI Palaute</h3>
				<p>{feedback}</p>
				<button 
					class="btn btn-small"
					on:click={() => {
						feedbackText = '';
						feedback = '';
					}}
				>
					Tyhjennä ja kirjoita uusi
				</button>
			</div>
		{/if}
	</div>

	<aside class="ai-tips">
		<h3>💡 Vinkkejä</h3>
		<ul>
			<li>Kirjoita koko työhakemus analysoitavaksi</li>
			<li>Tai liitä vain ne osiot, joissa haluat palautetta</li>
			<li>Voit pyytää palautetta monesta eri tekstistä peräkkäin</li>
			<li>AI ehdottaa parannuksia ja kehityskohteita</li>
		</ul>
	</aside>
</section>

<style>
	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 24px;
	}

	.ai-page {
		display: grid;
		grid-template-columns: 1fr 0.6fr;
		gap: 20px;
		align-items: start;
	}

	@media (max-width: 768px) {
		.ai-page {
			grid-template-columns: 1fr;
		}
	}

	.ai-card {
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(0, 0, 0, 0.06);
		border-radius: 16px;
		padding: 24px;
	}

	.ai-card h2 {
		margin: 0 0 8px;
		font-size: 1.3rem;
		color: #1f2937;
	}

	.description {
		margin: 0 0 20px;
		color: #6b7280;
		line-height: 1.5;
	}

	.feedback-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 20px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.field span {
		font-weight: 600;
		color: #1f2937;
		font-size: 0.95rem;
	}

	.large-textarea {
		padding: 12px;
		border: 1px solid rgba(0, 0, 0, 0.12);
		border-radius: 8px;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-size: 0.95rem;
		line-height: 1.5;
		resize: vertical;
	}

	.large-textarea:focus {
		outline: none;
		border-color: #3730a3;
		box-shadow: 0 0 0 3px rgba(55, 48, 163, 0.1);
	}

	.btn-large {
		padding: 12px 24px;
		font-size: 1rem;
		font-weight: 600;
		background: linear-gradient(135deg, #3730a3 0%, #1e1b4b 100%);
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: transform 0.15s, box-shadow 0.15s;
	}

	.btn-large:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 16px rgba(55, 48, 163, 0.3);
	}

	.btn-large:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.btn-small {
		padding: 8px 16px;
		font-size: 0.9rem;
		background: rgba(55, 48, 163, 0.1);
		color: #3730a3;
		border: 1px solid rgba(55, 48, 163, 0.2);
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.15s;
		margin-top: 12px;
	}

	.btn-small:hover {
		background: rgba(55, 48, 163, 0.15);
		border-color: rgba(55, 48, 163, 0.3);
	}

	.feedback-result {
		margin-top: 24px;
		padding: 20px;
		border-radius: 12px;
		background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%);
		border: 1px solid rgba(16, 185, 129, 0.2);
		color: #065f46;
	}

	.feedback-result h3 {
		margin: 0 0 12px;
		font-size: 1rem;
		font-weight: 600;
		color: #045f46;
	}

	.feedback-result p {
		margin: 0 0 16px;
		line-height: 1.6;
		white-space: pre-wrap;
		word-wrap: break-word;
		color: #064e3b;
	}

	.ai-tips {
		background: rgba(108, 92, 231, 0.08);
		border: 1px solid rgba(108, 92, 231, 0.2);
		border-radius: 12px;
		padding: 16px;
		height: fit-content;
	}

	.ai-tips h3 {
		margin: 0 0 12px;
		font-size: 0.95rem;
		color: #3730a3;
	}

	.ai-tips ul {
		margin: 0;
		padding-left: 16px;
		color: #3730a3;
		font-size: 0.9rem;
	}

	.ai-tips li {
		margin-bottom: 8px;
		line-height: 1.4;
	}
</style>
