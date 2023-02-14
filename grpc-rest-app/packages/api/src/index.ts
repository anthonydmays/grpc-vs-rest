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
    const contact = getContact(`contacts/${req.id}`);
    return { contact };
  },
  updateContact(req) {
    if (!req.id) {
      throw new Error('Contact not found.');
    }

    if (!req.contact) {
      throw new Error('Property "contact" missing from request.');
    }

    const uri = `contacts/${req.id}`;

    updateContact(uri, req.contact!);
    const contact = getContact(uri);
    return { contact };
  },
});

http2
  .createServer({}, mergeHandlers(handlers))
  .listen(9090, () =>
    console.log(`⚡️[server]: Server is running at http://localhost:9090`),
  );
