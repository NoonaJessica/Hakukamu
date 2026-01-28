import { db } from '$lib/server/db';
import { jobApplication } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';

const STATUSES = ['LAHETETTY', 'HAASTATTELU', 'TARJOUS', 'HYLATTY'] as const;
type Status = (typeof STATUSES)[number];

function isStatus(v: string): v is Status {
	return (STATUSES as readonly string[]).includes(v);
}

export const actions = {
	create: async ({ request }) => {
		const fd = await request.formData();

		const company = String(fd.get('company') ?? '').trim();
		const role = String(fd.get('role') ?? '').trim();
		const statusRaw = String(fd.get('status') ?? 'LAHETETTY').trim();
		const url = String(fd.get('url') ?? '').trim() || null;
		const notes = String(fd.get('notes') ?? '').trim() || null;

		const status: Status = isStatus(statusRaw) ? statusRaw : 'LAHETETTY';

		if (!company || !role) {
			return fail(400, { error: 'Täytä yritys ja rooli.', company, role, status, url, notes });
		}

		await db.insert(jobApplication).values({
			company,
			role,
			status, 
			url,
			notes
		});

		throw redirect(303, '/applications');
	}
};