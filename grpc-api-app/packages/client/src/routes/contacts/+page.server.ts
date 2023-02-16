import { env } from '$env/dynamic/private';
import {
	createGrpcTransport,
	createPromiseClient,
	type PromiseClient
} from '@bufbuild/connect-node';
import { ContactsService, GetContactResponse, type Contact } from '@grpc-vs-rest/api-types';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

/** Handles loading data for the page. */
export const load = (async ({ fetch, url, params }) => {
	if (!url.searchParams.get('uri')) {
		return {};
	}

	const client = getApiClient();

	const uri = url.searchParams.get('uri') || '';
	const res: GetContactResponse = await client.getContact({
		uri
	});

	return { ...res.contact };
}) satisfies PageServerLoad;

/** Handles saving updated contact information. */
export const actions = {
	update: async ({ fetch, request, params }) => {
		const data = await request.formData();

		const contact: Partial<Contact> = {};
		contact.firstName = String(data.get('firstName'));
		contact.lastName = String(data.get('lastName'));
		contact.email = String(data.get('email'));
		contact.uri = String(data.get('uri') || '');

		const client = getApiClient();

		if (contact.uri) {
			await client.updateContact({ contact });
		} else {
			await client.createContact({ contact });
		}

		throw redirect(303, '/');
	},
	delete: async ({ fetch, request, params }) => {
		const data = await request.formData();
		const uri = String(data.get('uri'));

		const client = getApiClient();

		const res = await client.deleteContact({ uri });

		throw redirect(303, '/');
	}
} satisfies Actions;

function getApiClient(): PromiseClient<typeof ContactsService> {
	const baseUrl = env.API_ENDPOINT || 'http://localhost:9090';

	const transport = createGrpcTransport({
		httpVersion: '2',
		baseUrl
	});
	return createPromiseClient(ContactsService, transport);
}
