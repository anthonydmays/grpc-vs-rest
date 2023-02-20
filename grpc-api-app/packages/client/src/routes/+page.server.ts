import { env } from '$env/dynamic/public';
import { ContactsServiceClient } from '@grpc-vs-rest/api-types';
import { ChannelCredentials } from '@grpc/grpc-js';
import { GrpcTransport } from '@protobuf-ts/grpc-transport';
import type { PageServerLoad } from './$types';

/** Handles loading data for the page. */
export const load = (async ({ url }) => {
  const pageNumber = Number(url.searchParams.get('pageNumber')) || 0;
  const orderBy = url.searchParams.get('orderBy') || '';

  const host = env.PUBLIC_API_ENDPOINT || 'localhost:9090';
  const transport = new GrpcTransport({
    host,
    channelCredentials: ChannelCredentials.createInsecure(),
  });
  const client = new ContactsServiceClient(transport);
  const call = await client.listContacts({ pageNumber, pageSize: 25, orderBy });

  // The default response is not Svelte serializable by default.
  return JSON.parse(JSON.stringify(call.response));
}) satisfies PageServerLoad;
