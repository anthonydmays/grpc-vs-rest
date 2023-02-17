import { env } from '$env/dynamic/private';
import { Contact, ContactsServiceClient } from '@grpc-vs-rest/api-types';
import { ChannelCredentials } from '@grpc/grpc-js';
import { GrpcTransport } from '@protobuf-ts/grpc-transport';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

/** Handles loading data for the page. */
export const load = (async ({ fetch, url, params }) => {
	const uri = url.searchParams.get('uri') || '';
	if (!uri) {
		return {};
	}

	const client = getApiClient();

	const call = await client.getContact({
		uri
	});

	return { ...call.response.contact };
}) satisfies PageServerLoad;

/** Handles saving updated contact information. */
export const actions = {
	update: async ({ fetch, request, params }) => {
		const data = await request.formData();

		const contact: Contact = {
			firstName: String(data.get('firstName')),
			lastName: String(data.get('lastName')),
			email: String(data.get('email')),
			uri: String(data.get('uri') || '')
		};

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
		await client.deleteContact({ uri });

		throw redirect(303, '/');
	}
} satisfies Actions;

function getApiClient(): ContactsServiceClient {
	const host = env.API_ENDPOINT || '0.0.0.0:9090';
	const transport = new GrpcTransport({
		host,
		channelCredentials: ChannelCredentials.createInsecure()
	});
	return new ContactsServiceClient(transport);
}
