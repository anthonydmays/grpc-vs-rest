import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { GetContactsResponse } from '@grpc-vs-rest/api-types';
import { env } from '$env/dynamic/private';

export const load = (async ({ fetch, params }) => {
	const apiEndpoint = env.API_ENDPOINT || 'http://localhost:9090/contacts';
	const res = (await (await fetch(`${apiEndpoint}`)).json()) as GetContactsResponse;

	if (res) {
		return res;
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
