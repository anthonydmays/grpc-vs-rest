import { env } from '$env/dynamic/private';
import { Contact, ContactsServiceClient, ListContactsRequest } from '@grpc-vs-rest/api-types';
import { credentials } from '@grpc/grpc-js';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const apiEndpoint = env.API_ENDPOINT || 'http://localhost:9090/contacts';

	const client = new ContactsServiceClient(apiEndpoint, credentials.createInsecure());
	const request = new ListContactsRequest();
	request.setPageSize(25);
	request.setPageNumber(0);
	request.setOrderBy('lastName');

	const contacts = await new Promise<Contact.AsObject[]>((resolve) => {
		client.listContacts(request, (err, res) => {
			const contacts = res.getContactsList().map((p) => p.toObject());
			resolve(contacts);
		});
	});

	return { contacts };
}) satisfies PageServerLoad;
