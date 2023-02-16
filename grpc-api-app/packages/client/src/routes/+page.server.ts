import { env } from '$env/dynamic/private';
import { createGrpcTransport, createPromiseClient } from '@bufbuild/connect-node';
import { ContactsService, ListContactsResponse } from '@grpc-vs-rest/api-types';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, url, params }) => {
	const baseUrl = env.API_ENDPOINT || 'http://localhost:9090';
	const pageNumber = Number(url.searchParams.get('pageNumber')) || 0;
	const orderBy = url.searchParams.get('orderBy') || '';

	const transport = createGrpcTransport({
		httpVersion: '2',
		baseUrl
	});
	const client = createPromiseClient(ContactsService, transport);

	const res: ListContactsResponse = await client.listContacts({
		pageNumber,
		pageSize: 25,
		orderBy
	});

	const contacts = JSON.parse(JSON.stringify(res.contacts));
	return { ...res, contacts };
}) satisfies PageServerLoad;
