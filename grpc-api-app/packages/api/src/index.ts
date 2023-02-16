import {
  createHandlers,
  mergeHandlers,
  ServiceImpl,
} from '@bufbuild/connect-node';
import { ContactsService } from '@grpc-vs-rest/api-types';
import http2 from 'http2';
import {
  deleteContact,
  getContact,
  getContacts,
  getContactsCount,
  updateContact,
} from './contacts.js';

export const contactsServiceImpl: ServiceImpl<typeof ContactsService> = {
  listContacts(req) {
    let { pageNumber, pageSize, orderBy } = req;
    pageSize = pageSize || 25;
    pageNumber = pageNumber ?? 0;
    const contacts = getContacts({ pageNumber, pageSize, orderBy });
    return {
      contacts,
      pageNumber,
      pageSize,
      orderBy,
      totalCount: getContactsCount(),
    };
  },
  getContact(req) {
    const contact = getContact(req.uri);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return { contact };
  },
  updateContact(req) {
    if (!req.contact?.uri || !getContact(req.contact.uri)) {
      throw new Error('Contact not found.');
    }

    updateContact(req.contact.uri, req.contact);
    const contact = getContact(req.contact.uri);
    return { contact };
  },
  deleteContact(req) {
    if (!req.uri || !getContact(req.uri)) {
      throw new Error('Contact not found.');
    }

    deleteContact(req.uri);

    return {};
  },
};

// Create gRPC handlers.
const handlers = createHandlers(ContactsService, contactsServiceImpl);

http2
  .createServer({}, mergeHandlers(handlers))
  .listen(9090, () =>
    console.log(`⚡️[server]: Server is running at http://localhost:9090`),
  );
