import { db } from '$lib/server/db';
import { jobApplication } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';

const STATUSES = ['LAHETETTY', 'HAASTATTELU', 'TARJOUS', 'HYLATTY'] as const;
type Status = (typeof STATUSES)[number];

function isStatus(v: string): v is Status {
	return (STATUSES as readonly string[]).includes(v);
}

export const load = async () => {
	const applications = await db
		.select()
		.from(jobApplication)
		.orderBy(desc(jobApplication.updatedAt));

	return { applications };
};

export const actions = {
	delete: async ({ request }) => {
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		if (!id) return fail(400, { error: 'Virheellinen id' });

		await db.delete(jobApplication).where(eq(jobApplication.id, id));
		return { ok: true };
	},

	setStatus: async ({ request }) => {
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		const statusRaw = String(fd.get('status') ?? '').trim();

		if (!id) return fail(400, { error: 'Virheellinen id' });

		const status: Status = isStatus(statusRaw) ? statusRaw : 'LAHETETTY';

		await db
			.update(jobApplication)
			.set({ status, updatedAt: new Date().getTime() })
			.where(eq(jobApplication.id, id));

		return { ok: true };
	},

	update: async ({ request }) => {
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		const company = String(fd.get('company') ?? '').trim();
		const role = String(fd.get('role') ?? '').trim();
		const url = String(fd.get('url') ?? '').trim() || null;
		const notes = String(fd.get('notes') ?? '').trim() || null;
		const meetingAtStr = String(fd.get('meetingAt') ?? '').trim();
		const meetingAt = meetingAtStr ? Math.floor(new Date(meetingAtStr).getTime() / 1000) : null;
		const statusRaw = String(fd.get('status') ?? '').trim();
		const status: Status | null = isStatus(statusRaw) ? statusRaw : null;

		if (!id || !company || !role) {
			return fail(400, { error: 'Täytä yritys ja rooli.' });
		}

		await db
			.update(jobApplication)
			.set({ company, role, url, notes, meetingAt, ...(status ? { status } : {}), updatedAt: new Date().getTime() })
			.where(eq(jobApplication.id, id));

		return { ok: true };
	}
};
