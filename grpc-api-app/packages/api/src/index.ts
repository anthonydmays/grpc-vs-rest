import { createHandlers, mergeHandlers } from '@bufbuild/connect-node';
import {
  ContactsService,
  GetContactRequest,
  ListContactsRequest,
  ListContactsResponse,
  UpdateContactRequest,
} from '@grpc-vs-rest/api-types';
import http2 from 'http2';
import { getContacts } from './contacts.js';

// @ts-ignore
const handlers = createHandlers(ContactsService, {
  listContacts(req: ListContactsRequest): ListContactsResponse {
    const { pageNumber, pageSize, orderBy } = req;
    const contacts = getContacts({ pageNumber, pageSize, orderBy });
    return { contacts };
  },
  getContact(req: GetContactRequest) {
    return {};
  },
  updateContact(req: UpdateContactRequest) {
    return {};
  },
});

http2
  .createServer({}, mergeHandlers(handlers))
  .listen(9090, () =>
    console.log(`⚡️[server]: Server is running at http://localhost:9090`),
  );
