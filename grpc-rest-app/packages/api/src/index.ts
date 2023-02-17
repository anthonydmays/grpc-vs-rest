import api = require('@grpc-vs-rest/api-types');
import { Server, ServerCredentials } from '@grpc/grpc-js';
import { adaptService } from '@protobuf-ts/grpc-backend';
import { ServerCallContext } from '@protobuf-ts/runtime-rpc';
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
  async listContacts(
    request: api.ListContactsRequest,
    context: ServerCallContext,
  ): Promise<api.ListContactsResponse> {
    let { pageNumber, pageSize, orderBy } = request;
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
  }
  async getContact(
    request: api.GetContactRequest,
    context: ServerCallContext,
  ): Promise<api.GetContactResponse> {
    const contact = getContact(`contacts/${request.id}`);
    if (!contact) {
      throw new Error('Contact not found.');
    }
    return { contact };
  }
  async updateContact(
    request: api.UpdateContactRequest,
    context: ServerCallContext,
  ): Promise<api.UpdateContactResponse> {
    const req = request;

    if (!req.contact?.uri || !getContact(req.contact.uri)) {
      throw new Error('Contact not found.');
    }

    updateContact(req.contact.uri, req.contact);
    const contact = getContact(req.contact.uri);
    return { contact };
  }
  async deleteContact(
    request: api.DeleteContactRequest,
    context: ServerCallContext,
  ): Promise<api.Empty> {
    const req = request;

    if (!req.id || !getContact(`contacts/${req.id}`)) {
      throw new Error('Contact not found.');
    }

    deleteContact(`contacts/${req.id}`);

    return {};
  }
  async createContact(
    request: api.CreateContactRequest,
    context: ServerCallContext,
  ): Promise<api.CreateContactResponse> {
    const update = request.contact;

    if (!update) {
      throw new Error('Must provide a contact to create.');
    }

    const contact = createContact(update!);

    return { contact };
  }
}

if (!process.env.DISABLE_SERVER_FOR_TESTS) {
  server.bindAsync('0.0.0.0:9090', ServerCredentials.createInsecure(), () => {
    server.start();

    server.addService(
      ...adaptService(api.ContactsService, new ContactsService()),
    );

    console.log('server is running on 0.0.0.0:9090');
  });
}
