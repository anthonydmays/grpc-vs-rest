import { env } from '$env/dynamic/private';
import type { GetContactsResponse } from '@grpc-vs-rest/api-types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/** Handles loading data for the page. */
export const load = (async ({ fetch, url, params }) => {
	const apiEndpoint =
		url.searchParams.get('url') || env.API_ENDPOINT || 'http://localhost:9090/v1/contacts';
	console.log('endpoint is', apiEndpoint);
	const res = (await (await fetch(`${apiEndpoint}`)).json()) as GetContactsResponse;
	if (res) {
		return res;
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
