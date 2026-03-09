import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { text } = await request.json();

	const prompt = `
Anna lyhyt palaute tästä työhakemuksesta.
Kerro mitä voisi parantaa.

Hakemus:
${text}
`;

	const res = await fetch('http://localhost:11434/api/generate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model: 'llama3',
			prompt: prompt,
			stream: false
		})
	});

	const data = await res.json();

	return json({ feedback: data.response });
}
