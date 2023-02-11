import { Contact } from 'apiTypes/src/index.js';
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

export function getContact(id: number): Contact | undefined {
  return _(db.data?.contacts).find((c) => c.id === id);
}

export function updateContact(id: number, contact: Contact) {
  const index = db.data?.contacts.findIndex((c) => c.id === id) ?? -1;
  if (index < 0) {
    throw new Error('Contact not found');
  }

  const oldContact = db.data!.contacts[index];
  db.data!.contacts[index] = { ...oldContact, ...contact, id };
}

export function getContactsCount(): number {
  return db.data?.contacts.length || 0;
}
