import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import type { GetContactResponse, Contact } from '@grpc-vs-rest/api-types';

export const load = (async ({ fetch, params }) => {
	const res = (await (await fetch(`/api/contacts/${params.id}`)).json()) as GetContactResponse;

	if (res) {
		return res;
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ fetch, request, params }) => {
		const data = await request.formData();

		const contact: Partial<Contact> = {};
		contact.firstName = String(data.get('firstName'));
		contact.lastName = String(data.get('lastName'));
		contact.email = String(data.get('email'));

		await fetch(`/api/contacts/${params.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(contact)
		});

		throw redirect(303, '/');
	}
} satisfies Actions;
