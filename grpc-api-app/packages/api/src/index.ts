import { createHandlers, mergeHandlers } from '@bufbuild/connect-node';
import { ContactsService } from '@grpc-vs-rest/api-types';
import http2 from 'http2';
import { getContacts } from './contacts.js';

const handlers = createHandlers(ContactsService, {
  listContacts(req) {
    const { pageNumber, pageSize, orderBy } = req;
    const contacts = getContacts({ pageNumber, pageSize, orderBy });
    return { contacts };
  },
  getContact(req) {
    return {};
  },
  updateContact(req) {
    return {};
  },
});

http2
  .createServer({}, mergeHandlers(handlers))
  .listen(9090, () =>
    console.log(`⚡️[server]: Server is running at http://localhost:9090`),
  );
