<script lang="ts">
	let feedbackText = '';
	let feedback = '';
	let isLoading = false;
	let charCount = 0;
	let copiedFeedback = false;

	$: charCount = feedbackText.length;

	function copyFeedback() {
		if (feedback) {
			navigator.clipboard.writeText(feedback);
			copiedFeedback = true;
			setTimeout(() => {
				copiedFeedback = false;
			}, 2000);
		}
	}

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
	<div class="ai-input-panel">
		<div class="ai-card input-card">
			<div class="skill-bar">
				<div class="skill-label">AI-analyysi</div>
				<div class="skill-indicator" class:active={isLoading}>
					{#if isLoading}
						<div class="spinner"></div>
						Analysoidaan...
					{:else}
						<div class="idle-dot"></div>
						Valmis
					{/if}
				</div>
			</div>

			<h2>Anna tekstistä AI-palaute</h2>
			<p class="description">
				Kirjoita työhakemuksesi, CV:si tai mitä tahansa tekstiä.
			</p>

			<div class="feedback-form">
				<label class="field">
					<div class="field-header">
						<span>Teksti analysoitavaksi</span>
						<span class="char-count" class:max={charCount > 3000}>{charCount} / 3000</span>
					</div>
					<textarea 
						bind:value={feedbackText} 
						rows="6" 
						maxlength="3000"
						placeholder="Liitä tähän työhakemus, CV tai muu teksti..."
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

			<aside class="ai-tips">
				<h3>💡 Vinkkejä</h3>
				<ul>
					<li>Kirjoita koko työhakemus analysoitavaksi</li>
					<li>Tai liitä vain ne osiot, joissa haluat palautetta</li>
					<li>Voit pyytää palautetta monesta eri tekstistä peräkkäin</li>
					<li>AI ehdottaa parannuksia ja kehityskohteita</li>
				</ul>
			</aside>
		</div>
	</div>

	<div class="ai-feedback-panel">
		<div class="ai-card feedback-card">
			{#if feedback}
				<div class="feedback-header">
					<h3>📝 AI Palaute</h3>
					<button 
						class="btn btn-copy" 
						title="Kopioi palaute"
						on:click={copyFeedback}
					>
						{copiedFeedback ? '✓ Kopioitu!' : '📋 Kopioi'}
					</button>
				</div>
				<div class="feedback-content">
					<p>{feedback}</p>
				</div>
				<div class="feedback-actions">
					<button 
						class="btn btn-secondary"
						on:click={() => {
							feedbackText = '';
							feedback = '';
						}}
					>
						↻ Analysoida uusi
					</button>
				</div>
			{:else}
				<div class="no-feedback">
					<div class="empty-state">
						<div class="empty-icon">💭</div>
						<p>Laita teksti analysoitavaksi vasemmalla</p>
						<span>Palaute näkyy tässä</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
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
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		height: calc(100vh - 180px);
		overflow: hidden;
	}

	.ai-feedback-panel {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
	}

	.ai-input-panel {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
	}

	.input-card {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	@media (max-width: 768px) {
		.ai-page {
			grid-template-columns: 1fr;
			height: auto;
			overflow: auto;
		}
		
		.ai-feedback-panel,
		.ai-input-panel {
			height: auto;
			overflow: auto;
		}
		
		.input-card {
			height: auto;
			overflow: auto;
		}
	}

	.ai-card {
		background: rgba(255, 255, 255, 0.95);
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 18px;
		padding: 28px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		backdrop-filter: blur(10px);
	}

	.feedback-card {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow-y: auto;
	}

	.feedback-card h3 {
		margin: 0;
		font-size: 1.2rem;
		color: #1f2937;
		font-weight: 600;
	}

	.skill-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: linear-gradient(135deg, rgba(55, 48, 163, 0.08) 0%, rgba(108, 92, 231, 0.08) 100%);
		border: 1.5px solid rgba(108, 92, 231, 0.35);
		border-radius: 12px;
		padding: 14px 16px;
		margin-bottom: 18px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
		backdrop-filter: blur(5px);
	}

	.skill-label {
		font-weight: 700;
		color: #3730a3;
		font-size: 0.9rem;
		letter-spacing: 0.3px;
	}

	.skill-indicator {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.85rem;
		color: #6b7280;
		font-weight: 500;
	}

	.skill-indicator.active {
		color: #10b981;
	}

	.spinner {
		display: inline-block;
		width: 12px;
		height: 12px;
		border: 2px solid rgba(16, 185, 129, 0.3);
		border-top-color: #10b981;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.idle-dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		background: #9ca3af;
		border-radius: 50%;
	}

	.no-feedback {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: #9ca3af;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		text-align: center;
	}

	.empty-icon {
		font-size: 3rem;
		opacity: 0.5;
	}

	.empty-state p {
		margin: 0;
		font-weight: 500;
		color: #6b7280;
	}

	.empty-state span {
		font-size: 0.9rem;
		color: #9ca3af;
		font-style: italic;
	}

	.feedback-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 2px solid rgba(108, 92, 231, 0.15);
		margin-bottom: 16px;
	}

	.feedback-content {
		display: flex;
		flex-direction: column;
		gap: 12px;
		flex: 1;
		overflow-y: auto;
		padding-right: 8px;
		margin-bottom: 16px;
	}

	.feedback-content::-webkit-scrollbar {
		width: 6px;
	}

	.feedback-content::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.05);
		border-radius: 10px;
	}

	.feedback-content::-webkit-scrollbar-thumb {
		background: rgba(108, 92, 231, 0.4);
		border-radius: 10px;
	}

	.feedback-content::-webkit-scrollbar-thumb:hover {
		background: rgba(108, 92, 231, 0.6);
	}

	.feedback-content p {
		margin: 0;
		line-height: 1.7;
		white-space: pre-wrap;
		word-wrap: break-word;
		color: #374151;
		font-size: 0.95rem;
	}

	.feedback-actions {
		display: flex;
		gap: 8px;
		padding-top: 12px;
		border-top: 1px solid rgba(0, 0, 0, 0.06);
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

	.field-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.field span {
		font-weight: 600;
		color: #1f2937;
		font-size: 0.95rem;
	}

	.char-count {
		font-size: 0.85rem;
		color: #9ca3af;
		font-weight: 500;
	}

	.char-count.max {
		color: #ef4444;
		font-weight: 600;
	}

	.large-textarea {
		padding: 14px;
		border: 2px solid rgba(0, 0, 0, 0.08);
		border-radius: 12px;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-size: 0.95rem;
		line-height: 1.6;
		resize: none;
		max-height: 180px;
		background: rgba(255, 255, 255, 0.8);
		transition: all 0.2s;
		color: #1f2937;
	}

	.large-textarea::placeholder {
		color: #d1d5db;
	}

	.large-textarea:focus {
		outline: none;
		border-color: #3730a3;
		background: white;
		box-shadow: 0 0 0 4px rgba(55, 48, 163, 0.08);
	}

	.btn-large {
		padding: 14px 28px;
		font-size: 1rem;
		font-weight: 600;
		background: linear-gradient(135deg, #3730a3 0%, #1e1b4b 100%);
		color: white;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.2s;
		box-shadow: 0 4px 12px rgba(55, 48, 163, 0.25);
	}

	.btn-large:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(55, 48, 163, 0.35);
	}

	.btn-large:active:not(:disabled) {
		transform: translateY(0px);
	}

	.btn-large:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
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
		align-self: flex-start;
	}

	.btn-small:hover {
		background: rgba(55, 48, 163, 0.15);
		border-color: rgba(55, 48, 163, 0.3);
	}

	.btn-copy {
		padding: 6px 12px;
		font-size: 0.85rem;
		background: rgba(16, 185, 129, 0.1);
		color: #059669;
		border: 1px solid rgba(16, 185, 129, 0.3);
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
		font-weight: 500;
		white-space: nowrap;
	}

	.btn-copy:hover {
		background: rgba(16, 185, 129, 0.15);
		border-color: rgba(16, 185, 129, 0.5);
		transform: scale(1.02);
	}

	.btn-secondary {
		flex: 1;
		padding: 10px 16px;
		font-size: 0.9rem;
		background: rgba(108, 92, 231, 0.1);
		color: #3730a3;
		border: 1px solid rgba(108, 92, 231, 0.3);
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
		font-weight: 500;
	}

	.btn-secondary:hover {
		background: rgba(108, 92, 231, 0.15);
		border-color: rgba(108, 92, 231, 0.5);
		transform: translateY(-1px);
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
		background: linear-gradient(135deg, rgba(108, 92, 231, 0.08) 0%, rgba(108, 92, 231, 0.04) 100%);
		border: 1.5px solid rgba(108, 92, 231, 0.25);
		border-radius: 12px;
		padding: 16px;
		margin-top: auto;
		backdrop-filter: blur(5px);
	}

	.ai-tips h3 {
		margin: 0 0 12px;
		font-size: 0.95rem;
		color: #3730a3;
		font-weight: 600;
	}

	.ai-tips ul {
		margin: 0;
		padding-left: 18px;
		color: #4b5563;
		font-size: 0.9rem;
		list-style: disc;
	}

	.ai-tips li {
		margin-bottom: 8px;
		line-height: 1.5;
		color: #4b5563;
	}
</style>
