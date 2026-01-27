import { db } from '$lib/server/db';
import { jobApplication } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load = async () => {
	// TESTI: lisää yksi hakemus jos taulu on tyhjä
	const existing = await db.select().from(jobApplication).limit(1);
	if (existing.length === 0) {
		await db.insert(jobApplication).values({
			company: 'Testi Oy',
			role: 'Junior Developer',
			status: 'LAHETETTY'
		});
	}

	const applications = await db
		.select()
		.from(jobApplication)
		.orderBy(desc(jobApplication.updatedAt));

	return { applications };
};