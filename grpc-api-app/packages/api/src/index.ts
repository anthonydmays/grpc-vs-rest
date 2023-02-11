import {
  Contact,
  ContactsServiceService,
  GetContactRequest,
  GetContactResponse,
  IContactsServiceServer,
  ListContactsRequest,
  ListContactsResponse,
  UpdateContactRequest,
  UpdateContactResponse,
} from '@grpc-vs-rest/api-types';
import { handleUnaryCall, Server, ServerCredentials } from '@grpc/grpc-js';
import { getContacts } from './contacts.js';

class ContactsServiceImpl implements IContactsServiceServer {
  [name: string]: import('@grpc/grpc-js').UntypedHandleCall;

  listContacts: handleUnaryCall<ListContactsRequest, ListContactsResponse> = (
    call,
    callback,
  ) => {
    const pageSize = call.request.getPageSize();
    const pageNumber = call.request.getPageNumber();
    const orderBy = call.request.getOrderBy();

    const contacts = getContacts({ pageSize, pageNumber, orderBy });
    const mapped = contacts.map((c) => {
      const proto = new Contact();
      proto.setUri(c.uri);
      proto.setFirstName(c.firstName);
      proto.setLastName(c.lastName);
      proto.setEmail(c.email);
      return proto;
    });

    const response = new ListContactsResponse();
    response.setContactsList(mapped);

    callback(null, response);
  };

  getContact: handleUnaryCall<GetContactRequest, GetContactResponse> = (
    call,
    callback,
  ) => {};

  updateContact: handleUnaryCall<UpdateContactRequest, UpdateContactResponse> =
    (call, callback) => {};
}

const server = new Server();
server.addService(ContactsServiceService, new ContactsServiceImpl());

server.bindAsync(
  '0.0.0.0:9090',
  ServerCredentials.createInsecure(),
  (err: Error | null, port: number) => {
    if (err) {
      throw err;
    }

    console.log(`⚡️[server]: Server is  running at http://localhost:${port}`);

    server.start();
  },
);
