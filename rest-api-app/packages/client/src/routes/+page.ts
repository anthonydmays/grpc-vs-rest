import { env } from '$env/dynamic/public';
import type { ListContactsResponse } from '@grpc-vs-rest/api-types';
import type { PageLoad } from './$types';

/** Handles loading data for the page. */
export const load = (async ({ url }) => {
  const apiEndpoint =
    url.searchParams.get('url') ||
    env.PUBLIC_API_ENDPOINT ||
    'http://localhost:9090/v1/contacts';

  const res = (await (
    await fetch(`${apiEndpoint}`)
  ).json()) as ListContactsResponse;

  return res;
}) satisfies PageLoad;
