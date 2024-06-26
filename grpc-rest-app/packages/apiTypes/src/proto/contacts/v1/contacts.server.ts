// @generated by protobuf-ts 2.9.4 with parameter generate_dependencies,long_type_string,server_generic,client_generic
// @generated from protobuf file "proto/contacts/v1/contacts.proto" (package "proto.contacts.v1", syntax proto3)
// tslint:disable
import { ServerCallContext } from '@protobuf-ts/runtime-rpc';
import { Empty } from '../../../google/protobuf/empty.js';
import {
  CreateContactRequest,
  CreateContactResponse,
  DeleteContactRequest,
  GetContactRequest,
  GetContactResponse,
  ListContactsRequest,
  ListContactsResponse,
  UpdateContactRequest,
  UpdateContactResponse,
} from './contacts.js';
/**
 * An API for managing a collection of contacts.
 *
 * @generated from protobuf service proto.contacts.v1.ContactsService
 */
export interface IContactsService<T = ServerCallContext> {
  /**
   * List all available contacts.
   *
   * @generated from protobuf rpc: ListContacts(proto.contacts.v1.ListContactsRequest) returns (proto.contacts.v1.ListContactsResponse);
   */
  listContacts(
    request: ListContactsRequest,
    context: T,
  ): Promise<ListContactsResponse>;
  /**
   * Retrieves a specific contact.
   *
   * @generated from protobuf rpc: GetContact(proto.contacts.v1.GetContactRequest) returns (proto.contacts.v1.GetContactResponse);
   */
  getContact(
    request: GetContactRequest,
    context: T,
  ): Promise<GetContactResponse>;
  /**
   * Updates a contact with the provided information.
   *
   * @generated from protobuf rpc: UpdateContact(proto.contacts.v1.UpdateContactRequest) returns (proto.contacts.v1.UpdateContactResponse);
   */
  updateContact(
    request: UpdateContactRequest,
    context: T,
  ): Promise<UpdateContactResponse>;
  /**
   * Deletes a contact with the provided id.
   *
   * @generated from protobuf rpc: DeleteContact(proto.contacts.v1.DeleteContactRequest) returns (google.protobuf.Empty);
   */
  deleteContact(request: DeleteContactRequest, context: T): Promise<Empty>;
  /**
   * Creates a contact.
   *
   * @generated from protobuf rpc: CreateContact(proto.contacts.v1.CreateContactRequest) returns (proto.contacts.v1.CreateContactResponse);
   */
  createContact(
    request: CreateContactRequest,
    context: T,
  ): Promise<CreateContactResponse>;
}
