import { db } from '$lib/server/db';
import { jobApplication } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load = async () => {
const applications = await db
.select()
.from(jobApplication)
.orderBy(desc(jobApplication.updatedAt));


return { applications };
};
