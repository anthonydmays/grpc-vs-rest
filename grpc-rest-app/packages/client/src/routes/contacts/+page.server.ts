import { env } from '$env/dynamic/public';
import type { Contact, GetContactResponse } from '@grpc-vs-rest/api-types';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

/** Handles loading data for the page. */
export const load = (async ({ url }) => {
  const uri = url.searchParams.get('uri') || '';
  if (!uri) {
    return {};
  }

  const res = (await (
    await fetch(getContactUrl(uri))
  ).json()) as GetContactResponse;
  if (res) {
    return { ...res.contact };
  }

  throw error(404, 'Not found');
}) satisfies PageServerLoad;

/** Handles saving updated contact information. */
export const actions = {
  update: async ({ request }) => {
    const data = await request.formData();

    const contact: Contact = {
      firstName: String(data.get('firstName')),
      lastName: String(data.get('lastName')),
      email: String(data.get('email')),
      uri: String(data.get('uri') || ''),
    };

    const isNew = !contact.uri;
    const endpointUrl = isNew ? getBaseUrl() : getContactUrl(contact.uri);

    await fetch(endpointUrl, {
      method: isNew ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    throw redirect(303, '/');
  },
  delete: async ({ fetch, request, params }) => {
    const data = await request.formData();
    const uri = String(data.get('uri'));

    await fetch(getContactUrl(uri), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    throw redirect(303, '/');
  },
} satisfies Actions;

function getContactUrl(uri: string): string {
  const baseUrl = getBaseUrl();
  const id = uri.replace('contacts/', '');
  return `${baseUrl}/${id}`;
}

function getBaseUrl(): string {
  return env.PUBLIC_API_ENDPOINT || 'http://localhost:8080/v1/contacts';
}
