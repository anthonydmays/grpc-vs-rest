import { env } from '$env/dynamic/public';
import { ContactsServiceClient } from '@grpc-vs-rest/api-types';
import { ChannelCredentials } from '@grpc/grpc-js';
import { GrpcTransport } from '@protobuf-ts/grpc-transport';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const pageNumber = Number(url.searchParams.get('pageNumber')) || 0;
	const orderBy = url.searchParams.get('orderBy') || '';

	const host = env.PUBLIC_API_ENDPOINT || '0.0.0.0:9090';
	const transport = new GrpcTransport({
		host,
		channelCredentials: ChannelCredentials.createInsecure()
	});
	const client = new ContactsServiceClient(transport);
	const call = await client.listContacts({ pageNumber, pageSize: 25, orderBy });

	return JSON.parse(JSON.stringify(call.response));
}) satisfies PageServerLoad;
