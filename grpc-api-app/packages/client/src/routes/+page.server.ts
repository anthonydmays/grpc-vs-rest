import { env } from '$env/dynamic/private';
import { createGrpcTransport, createPromiseClient } from '@bufbuild/connect-node';
import { ContactsService, ListContactsResponse } from '@grpc-vs-rest/api-types';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const baseUrl = env.API_ENDPOINT || 'http://localhost:9090';

	const transport = createGrpcTransport({
		httpVersion: '2',
		baseUrl
	});

	// @ts-ignore
	const client = createPromiseClient(ContactsService, transport);

	// @ts-ignore
	const res: ListContactsResponse = await client.listContacts({
		pageNumber: 0,
		pageSize: 25,
		orderBy: 'firstName'
	});

	console.log('what is this', JSON.stringify(res.contacts));

	return { contacts: JSON.parse(JSON.stringify(res.contacts)) };
}) satisfies PageServerLoad;
