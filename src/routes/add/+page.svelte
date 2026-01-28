<script lang="ts">
	export let data: any;
</script>

<h1>Lisää työpaikka</h1>

{#if data?.error}
	<p style="color:red;">{data.error}</p>
{/if}

<form method="POST" action="?/create" style="display:grid; gap:10px; max-width:520px;">
	<label>
		Yritys*
		<input name="company" required value={data?.company ?? ''} />
	</label>

	<label>
		Rooli*
		<input name="role" required value={data?.role ?? ''} />
	</label>

	<label>
		Status
		<select name="status" value={data?.status ?? 'LAHETETTY'}>
			<option value="LAHETETTY">Lähetetty</option>
			<option value="HAASTATTELU">Haastattelu</option>
			<option value="TARJOUS">Tarjous</option>
			<option value="HYLATTY">Hylätty</option>
		</select>
	</label>

	<label>
		Linkki
		<input name="url" value={data?.url ?? ''} />
	</label>

	<label>
		Muistiinpanot
		<textarea name="notes" rows="4">{data?.notes ?? ''}</textarea>
	</label>

	<button type="submit">Tallenna</button>
</form>