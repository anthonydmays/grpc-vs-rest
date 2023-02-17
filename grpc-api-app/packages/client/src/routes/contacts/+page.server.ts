import { env } from '$env/dynamic/private';
import {
	Contact,
	ContactsServiceClient,
	CreateContactResponse,
	type GetContactResponse
} from '@grpc-vs-rest/api-types';
import { credentials } from '@grpc/grpc-js';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

/** Handles loading data for the page. */
export const load = (async ({ fetch, url, params }) => {
	const uri = url.searchParams.get('uri') || '';
	if (!uri) {
		return {};
	}

	const client = getApiClient();

	const res = await new Promise<GetContactResponse | undefined>((resolve, reject) =>
		client.getContact(
			{
				uri
			},
			(err, res) => {
				if (err) reject(err);
				else resolve(res);
			}
		)
	);

	return { ...res!.contact };
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
			await updateContact(contact);
		} else {
			await createContact(contact);
		}

		throw redirect(303, '/');
	},
	delete: async ({ fetch, request, params }) => {
		const data = await request.formData();
		const uri = String(data.get('uri'));

		const client = getApiClient();

		const res = await deleteContact(uri);

		throw redirect(303, '/');
	}
} satisfies Actions;

function updateContact(contact: Contact) {
	const client = getApiClient();
	return new Promise<GetContactResponse | undefined>((resolve, reject) =>
		client.updateContact(
			{
				contact
			},
			(err, res) => {
				if (err) reject(err);
				else resolve(res);
			}
		)
	);
}

function createContact(contact: Contact) {
	const client = getApiClient();
	return new Promise<CreateContactResponse | undefined>((resolve, reject) =>
		client.createContact(
			{
				contact
			},
			(err, res) => {
				if (err) reject(err);
				else resolve(res);
			}
		)
	);
}

function deleteContact(uri: string) {
	const client = getApiClient();
	return new Promise<CreateContactResponse | undefined>((resolve, reject) =>
		client.deleteContact(
			{
				uri
			},
			(err, res) => {
				if (err) reject(err);
				else resolve(res);
			}
		)
	);
}

function getApiClient(): ContactsServiceClient {
	const baseUrl = env.API_ENDPOINT || 'localhost:9090';
	return new ContactsServiceClient(baseUrl, credentials.createInsecure());
}
