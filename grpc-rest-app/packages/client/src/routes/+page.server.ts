import { env } from '$env/dynamic/private';
import type { ListContactsResponse } from '@grpc-vs-rest/api-types';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, url, params }) => {
	const baseUrl = env.API_ENDPOINT || 'http://0.0.0.0:8080';
	const pageNumber = Number(url.searchParams.get('pageNumber')) || 0;
	const orderBy = url.searchParams.get('orderBy');
	const apiUrl = `${baseUrl}/v1/contacts?pageSize=25&pageNumber=${pageNumber}&orderBy=${orderBy}`;

	const res = (await (await fetch(apiUrl)).json()) as ListContactsResponse;

	return res;
}) satisfies PageServerLoad;
