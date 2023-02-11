import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { type GetContactResponse, Contact } from '@grpc-vs-rest/api-types';

export const load = (async ({ fetch, url, params }) => {
	const res = (await (await fetch(`${url.searchParams.get('url')}`)).json()) as GetContactResponse;

	if (res) {
		return res;
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ fetch, request, params }) => {
		const data = await request.formData();

		const contact = new Contact();
		contact.setFirstName(String(data.get('firstName')));
		contact.setLastName(String(data.get('lastName')));
		contact.setEmail(String(data.get('email')));

		const contactUrl = String(data.get('url'));

		await fetch(`${contactUrl}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(contact)
		});

		throw redirect(303, '/');
	}
} satisfies Actions;
