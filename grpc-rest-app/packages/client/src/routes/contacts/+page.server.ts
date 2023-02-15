import { env } from '$env/dynamic/private';
import type { Contact, GetContactResponse } from '@grpc-vs-rest/api-types';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

/** Handles loading data for the page. */
export const load = (async ({ fetch, url, params }) => {
	const uri = url.searchParams.get('uri') || '';

	const res = (await (await fetch(getContactUrl(uri))).json()) as GetContactResponse;

	return { ...res.contact };
}) satisfies PageServerLoad;

/** Handles saving updated contact information. */
export const actions = {
	default: async ({ fetch, request, params }) => {
		const data = await request.formData();

		const contact: Partial<Contact> = {};
		contact.firstName = String(data.get('firstName'));
		contact.lastName = String(data.get('lastName'));
		contact.email = String(data.get('email'));
		contact.uri = String(data.get('uri'));

		await fetch(getContactUrl(contact.uri), {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(contact)
		});

		throw redirect(303, '/');
	}
} satisfies Actions;

function getContactUrl(uri: string): string {
	const baseUrl = env.API_ENDPOINT || 'http://0.0.0.0:8080/v1/contacts';
	const id = uri.replace('contacts/', '');
	return `${baseUrl}/${id}`;
}
