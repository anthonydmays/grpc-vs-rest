import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { GetContactsResponse } from '@grpc-vs-rest/api-types';

export const load = (async ({ fetch, params }) => {
	const res = (await (await fetch('/api/contacts')).json()) as GetContactsResponse;

	if (res) {
		return res;
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
