import { ContactsServiceClient } from '@grpc-vs-rest/api-types';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	const pageNumber = Number(url.searchParams.get('pageNumber')) || 0;
	const orderBy = url.searchParams.get('orderBy') || '';

	const baseUrl = 'http://0.0.0.0:8080';
	const transport = new GrpcWebFetchTransport({
		baseUrl,
		format: 'binary'
	});
	const client = new ContactsServiceClient(transport);
	const call = await client.listContacts({ pageNumber, pageSize: 25, orderBy });

	return call.response;
}) satisfies PageLoad;
