import api = require('@grpc-vs-rest/api-types');
import {
  handleUnaryCall,
  Server,
  ServerCredentials,
  UntypedHandleCall,
} from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants.js';
import { Empty } from 'apiTypes/dist/cjs/google/protobuf/empty.js';
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  getContactsCount,
  updateContact,
} from './contacts.js';
const server = new Server();

export class ContactsService implements api.IContactsService {
  [name: string]: UntypedHandleCall;

  listContacts: handleUnaryCall<
    api.ListContactsRequest,
    api.ListContactsResponse
  > = (call, callback) => {
    let { pageNumber, pageSize, orderBy } = call.request;
    pageSize = pageSize || 25;
    pageNumber = pageNumber ?? 0;
    const contacts = getContacts({ pageNumber, pageSize, orderBy });

    callback(null, {
      contacts,
      pageNumber,
      pageSize,
      orderBy,
      totalCount: getContactsCount(),
    });
  };

  getContact: handleUnaryCall<api.GetContactRequest, api.GetContactResponse> = (
    call,
    callback,
  ) => {
    const contact = getContact(`contacts/${call.request.id}`);
    if (!contact) {
      callback({ code: Status.NOT_FOUND, details: 'Contact not found.' }, null);
      return;
    }
    callback(null, { contact });
  };

  updateContact: handleUnaryCall<
    api.UpdateContactRequest,
    api.UpdateContactResponse
  > = (call, callback) => {
    const req = call.request;

    if (!req.contact?.uri || !getContact(req.contact.uri)) {
      callback({ code: Status.NOT_FOUND, details: 'Contact not found.' }, null);
      return;
    }

    updateContact(req.contact.uri, req.contact);
    const contact = getContact(req.contact.uri);
    return callback(null, { contact });
  };

  deleteContact: handleUnaryCall<api.DeleteContactRequest, Empty> = (
    call,
    callback,
  ) => {
    const req = call.request;

    if (!req.id || !getContact(`contacts/${req.id}`)) {
      callback({ code: Status.NOT_FOUND, details: 'Contact not found.' }, null);
      return;
    }

    deleteContact(`contacts/${req.id}`);

    callback(null, {});
  };

  createContact: handleUnaryCall<
    api.CreateContactRequest,
    api.CreateContactResponse
  > = (call, callback) => {
    const update = call.request.contact;

    if (!update) {
      throw new Error('Must provide a contact to create.');
    }

    const contact = createContact(update!);

    return callback(null, { contact });
  };
}

if (!process.env.DISABLE_SERVER_FOR_TESTS) {
  server.bindAsync('0.0.0.0:9090', ServerCredentials.createInsecure(), () => {
    server.start();

    server.addService(api.contactsServiceDefinition, new ContactsService());

    console.log('server is running on 0.0.0.0:9090');
  });
}
