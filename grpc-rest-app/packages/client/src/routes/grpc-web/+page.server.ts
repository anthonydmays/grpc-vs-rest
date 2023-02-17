import { createGrpcWebTransport, createPromiseClient } from '@bufbuild/connect-web';
import { ContactsServiceWeb } from '@grpc-vs-rest/api-types';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const pageNumber = Number(url.searchParams.get('pageNumber')) || 0;
	const orderBy = url.searchParams.get('orderBy') || '';

	const baseUrl = 'http://0.0.0.0:8080';
	const transport = createGrpcWebTransport({
		baseUrl
	});
	const client = createPromiseClient(ContactsServiceWeb, transport);
	const res = await client.listContacts({ pageNumber, pageSize: 25, orderBy });

	const contacts = JSON.parse(JSON.stringify(res.contacts));
	return { ...res, contacts };
}) satisfies PageServerLoad;
