// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_contacts_v1_contacts_pb = require('../../../proto/contacts/v1/contacts_pb.js');

function serialize_proto_contacts_v1_GetContactRequest(arg) {
  if (!(arg instanceof proto_contacts_v1_contacts_pb.GetContactRequest)) {
    throw new Error('Expected argument of type proto.contacts.v1.GetContactRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_contacts_v1_GetContactRequest(buffer_arg) {
  return proto_contacts_v1_contacts_pb.GetContactRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_contacts_v1_GetContactResponse(arg) {
  if (!(arg instanceof proto_contacts_v1_contacts_pb.GetContactResponse)) {
    throw new Error('Expected argument of type proto.contacts.v1.GetContactResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_contacts_v1_GetContactResponse(buffer_arg) {
  return proto_contacts_v1_contacts_pb.GetContactResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_contacts_v1_ListContactsRequest(arg) {
  if (!(arg instanceof proto_contacts_v1_contacts_pb.ListContactsRequest)) {
    throw new Error('Expected argument of type proto.contacts.v1.ListContactsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_contacts_v1_ListContactsRequest(buffer_arg) {
  return proto_contacts_v1_contacts_pb.ListContactsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_contacts_v1_ListContactsResponse(arg) {
  if (!(arg instanceof proto_contacts_v1_contacts_pb.ListContactsResponse)) {
    throw new Error('Expected argument of type proto.contacts.v1.ListContactsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_contacts_v1_ListContactsResponse(buffer_arg) {
  return proto_contacts_v1_contacts_pb.ListContactsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_contacts_v1_UpdateContactRequest(arg) {
  if (!(arg instanceof proto_contacts_v1_contacts_pb.UpdateContactRequest)) {
    throw new Error('Expected argument of type proto.contacts.v1.UpdateContactRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_contacts_v1_UpdateContactRequest(buffer_arg) {
  return proto_contacts_v1_contacts_pb.UpdateContactRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_contacts_v1_UpdateContactResponse(arg) {
  if (!(arg instanceof proto_contacts_v1_contacts_pb.UpdateContactResponse)) {
    throw new Error('Expected argument of type proto.contacts.v1.UpdateContactResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_contacts_v1_UpdateContactResponse(buffer_arg) {
  return proto_contacts_v1_contacts_pb.UpdateContactResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ContactsServiceService = exports.ContactsServiceService = {
  listContacts: {
    path: '/proto.contacts.v1.ContactsService/ListContacts',
    requestStream: false,
    responseStream: false,
    requestType: proto_contacts_v1_contacts_pb.ListContactsRequest,
    responseType: proto_contacts_v1_contacts_pb.ListContactsResponse,
    requestSerialize: serialize_proto_contacts_v1_ListContactsRequest,
    requestDeserialize: deserialize_proto_contacts_v1_ListContactsRequest,
    responseSerialize: serialize_proto_contacts_v1_ListContactsResponse,
    responseDeserialize: deserialize_proto_contacts_v1_ListContactsResponse,
  },
  getContact: {
    path: '/proto.contacts.v1.ContactsService/GetContact',
    requestStream: false,
    responseStream: false,
    requestType: proto_contacts_v1_contacts_pb.GetContactRequest,
    responseType: proto_contacts_v1_contacts_pb.GetContactResponse,
    requestSerialize: serialize_proto_contacts_v1_GetContactRequest,
    requestDeserialize: deserialize_proto_contacts_v1_GetContactRequest,
    responseSerialize: serialize_proto_contacts_v1_GetContactResponse,
    responseDeserialize: deserialize_proto_contacts_v1_GetContactResponse,
  },
  updateContact: {
    path: '/proto.contacts.v1.ContactsService/UpdateContact',
    requestStream: false,
    responseStream: false,
    requestType: proto_contacts_v1_contacts_pb.UpdateContactRequest,
    responseType: proto_contacts_v1_contacts_pb.UpdateContactResponse,
    requestSerialize: serialize_proto_contacts_v1_UpdateContactRequest,
    requestDeserialize: deserialize_proto_contacts_v1_UpdateContactRequest,
    responseSerialize: serialize_proto_contacts_v1_UpdateContactResponse,
    responseDeserialize: deserialize_proto_contacts_v1_UpdateContactResponse,
  },
};

exports.ContactsServiceClient = grpc.makeGenericClientConstructor(ContactsServiceService);
