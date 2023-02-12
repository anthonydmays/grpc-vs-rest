import { createHandlers, mergeHandlers } from '@bufbuild/connect-node';
import { ContactsService } from '@grpc-vs-rest/api-types';
import http2 from 'http2';
import {
  getContact,
  getContacts,
  getContactsCount,
  updateContact,
} from './contacts.js';

const handlers = createHandlers(ContactsService, {
  listContacts(req) {
    let { pageNumber, pageSize, orderBy } = req;
    pageSize = pageSize ?? 25;
    pageNumber = pageNumber ?? 0;
    orderBy = orderBy || 'lastName';
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
});

http2
  .createServer({}, mergeHandlers(handlers))
  .listen(9090, () =>
    console.log(`⚡️[server]: Server is running at http://localhost:9090`),
  );
