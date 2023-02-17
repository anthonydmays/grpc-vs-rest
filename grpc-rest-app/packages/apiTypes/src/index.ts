export {
  Contact,
  CreateContactRequest,
  CreateContactResponse,
  DeleteContactRequest,
  GetContactRequest,
  GetContactResponse,
  ListContactsRequest,
  ListContactsResponse,
  UpdateContactRequest,
  UpdateContactResponse,
} from "./proto/contacts/v1/contacts.js";
export {
  contactsServiceDefinition,
  IContactsService,
} from "./proto/contacts/v1/contacts.grpc-server.js";
export { ContactsServiceClient } from "./proto/contacts/v1/contacts.grpc-client.js";
export { ContactsService as ContactsServiceWeb } from "./proto/contacts/v1/contacts_connectweb.js";
export { Empty } from "./google/protobuf/empty.js";
