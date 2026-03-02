import { db } from '$lib/server/db';
import { jobApplication } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load = async () => {
const applications = await db
	.select()
	.from(jobApplication)
	.orderBy(desc(jobApplication.updatedAt));

const now = Math.floor(Date.now() / 1000);
const futureMeetings = applications
	.filter((app: any) => app.meetingAt && app.meetingAt > now)
	.sort((a: any, b: any) => a.meetingAt - b.meetingAt);

return { applications, futureMeetings };
};
