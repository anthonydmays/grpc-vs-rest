import { env } from '$env/dynamic/private';
import { ContactsServiceClient, ListContactsResponse } from '@grpc-vs-rest/api-types';
import { credentials } from '@grpc/grpc-js';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, url, params }) => {
	const baseUrl = env.API_ENDPOINT || 'localhost:9090';
	const pageNumber = Number(url.searchParams.get('pageNumber')) || 0;
	const orderBy = url.searchParams.get('orderBy') || '';

	const client = new ContactsServiceClient(baseUrl, credentials.createInsecure());

	const res = await new Promise<ListContactsResponse | undefined>((resolve, reject) =>
		client.listContacts(
			{
				pageSize: 25,
				pageNumber,
				orderBy
			},
			(err, res) => {
				if (err) reject(err);
				else resolve(res);
			}
		)
	);

	const contacts = JSON.parse(JSON.stringify(res?.contacts || []));
	return { ...res, contacts };
}) satisfies PageServerLoad;
