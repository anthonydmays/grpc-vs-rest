import { env } from '$env/dynamic/public';
import type { GetContactsResponse } from '@grpc-vs-rest/api-types';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

/** Handles loading data for the page. */
export const load = (async ({ url }) => {
	const apiEndpoint =
		url.searchParams.get('url') || env.PUBLIC_API_ENDPOINT || 'http://localhost:9090/v1/contacts';

	const res = (await (await fetch(`${apiEndpoint}`)).json()) as GetContactsResponse;
	if (res) {
		return res;
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;
