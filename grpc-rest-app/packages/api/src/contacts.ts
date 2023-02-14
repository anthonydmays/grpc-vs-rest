import { Contact } from '@grpc-vs-rest/api-types';
import _ from 'lodash';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

type DbData = {
  contacts: Contact[];
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'contacts.json');
const adapter = new JSONFile<DbData>(file);
const db = new Low(adapter);
await db.read();

export function getContacts(opts: {
  pageSize: number;
  pageNumber: number;
  orderBy: string;
}): Contact[] {
  const { pageSize, pageNumber, orderBy } = opts;
  return _(db.data?.contacts)
    .orderBy([orderBy || 'lastName'])
    .drop(pageSize * pageNumber)
    .take(pageSize)
    .value();
}

export function getContact(uri: string): Contact | undefined {
  return _(db.data?.contacts).find((c) => c.uri === uri);
}

export function updateContact(uri: string, contact: Contact) {
  const index = db.data?.contacts.findIndex((c) => c.uri === uri) ?? -1;
  if (index < 0) {
    throw new Error('Contact not found');
  }

  const oldContact = db.data!.contacts[index];
  // @ts-ignore
  db.data!.contacts[index] = { ...oldContact, ...contact, uri };
}

export function getContactsCount(): number {
  return db.data?.contacts.length || 0;
}
