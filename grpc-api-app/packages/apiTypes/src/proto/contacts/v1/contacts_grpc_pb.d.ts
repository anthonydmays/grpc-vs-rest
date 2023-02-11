// package: proto.contacts.v1
// file: proto/contacts/v1/contacts.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as proto_contacts_v1_contacts_pb from "../../../proto/contacts/v1/contacts_pb";

interface IContactsServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    listContacts: IContactsServiceService_IListContacts;
    getContact: IContactsServiceService_IGetContact;
    updateContact: IContactsServiceService_IUpdateContact;
}

interface IContactsServiceService_IListContacts extends grpc.MethodDefinition<proto_contacts_v1_contacts_pb.ListContactsRequest, proto_contacts_v1_contacts_pb.ListContactsResponse> {
    path: "/proto.contacts.v1.ContactsService/ListContacts";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proto_contacts_v1_contacts_pb.ListContactsRequest>;
    requestDeserialize: grpc.deserialize<proto_contacts_v1_contacts_pb.ListContactsRequest>;
    responseSerialize: grpc.serialize<proto_contacts_v1_contacts_pb.ListContactsResponse>;
    responseDeserialize: grpc.deserialize<proto_contacts_v1_contacts_pb.ListContactsResponse>;
}
interface IContactsServiceService_IGetContact extends grpc.MethodDefinition<proto_contacts_v1_contacts_pb.GetContactRequest, proto_contacts_v1_contacts_pb.GetContactResponse> {
    path: "/proto.contacts.v1.ContactsService/GetContact";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proto_contacts_v1_contacts_pb.GetContactRequest>;
    requestDeserialize: grpc.deserialize<proto_contacts_v1_contacts_pb.GetContactRequest>;
    responseSerialize: grpc.serialize<proto_contacts_v1_contacts_pb.GetContactResponse>;
    responseDeserialize: grpc.deserialize<proto_contacts_v1_contacts_pb.GetContactResponse>;
}
interface IContactsServiceService_IUpdateContact extends grpc.MethodDefinition<proto_contacts_v1_contacts_pb.UpdateContactRequest, proto_contacts_v1_contacts_pb.UpdateContactResponse> {
    path: "/proto.contacts.v1.ContactsService/UpdateContact";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proto_contacts_v1_contacts_pb.UpdateContactRequest>;
    requestDeserialize: grpc.deserialize<proto_contacts_v1_contacts_pb.UpdateContactRequest>;
    responseSerialize: grpc.serialize<proto_contacts_v1_contacts_pb.UpdateContactResponse>;
    responseDeserialize: grpc.deserialize<proto_contacts_v1_contacts_pb.UpdateContactResponse>;
}

export const ContactsServiceService: IContactsServiceService;

export interface IContactsServiceServer extends grpc.UntypedServiceImplementation {
    listContacts: grpc.handleUnaryCall<proto_contacts_v1_contacts_pb.ListContactsRequest, proto_contacts_v1_contacts_pb.ListContactsResponse>;
    getContact: grpc.handleUnaryCall<proto_contacts_v1_contacts_pb.GetContactRequest, proto_contacts_v1_contacts_pb.GetContactResponse>;
    updateContact: grpc.handleUnaryCall<proto_contacts_v1_contacts_pb.UpdateContactRequest, proto_contacts_v1_contacts_pb.UpdateContactResponse>;
}

export interface IContactsServiceClient {
    listContacts(request: proto_contacts_v1_contacts_pb.ListContactsRequest, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.ListContactsResponse) => void): grpc.ClientUnaryCall;
    listContacts(request: proto_contacts_v1_contacts_pb.ListContactsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.ListContactsResponse) => void): grpc.ClientUnaryCall;
    listContacts(request: proto_contacts_v1_contacts_pb.ListContactsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.ListContactsResponse) => void): grpc.ClientUnaryCall;
    getContact(request: proto_contacts_v1_contacts_pb.GetContactRequest, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.GetContactResponse) => void): grpc.ClientUnaryCall;
    getContact(request: proto_contacts_v1_contacts_pb.GetContactRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.GetContactResponse) => void): grpc.ClientUnaryCall;
    getContact(request: proto_contacts_v1_contacts_pb.GetContactRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.GetContactResponse) => void): grpc.ClientUnaryCall;
    updateContact(request: proto_contacts_v1_contacts_pb.UpdateContactRequest, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.UpdateContactResponse) => void): grpc.ClientUnaryCall;
    updateContact(request: proto_contacts_v1_contacts_pb.UpdateContactRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.UpdateContactResponse) => void): grpc.ClientUnaryCall;
    updateContact(request: proto_contacts_v1_contacts_pb.UpdateContactRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.UpdateContactResponse) => void): grpc.ClientUnaryCall;
}

export class ContactsServiceClient extends grpc.Client implements IContactsServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public listContacts(request: proto_contacts_v1_contacts_pb.ListContactsRequest, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.ListContactsResponse) => void): grpc.ClientUnaryCall;
    public listContacts(request: proto_contacts_v1_contacts_pb.ListContactsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.ListContactsResponse) => void): grpc.ClientUnaryCall;
    public listContacts(request: proto_contacts_v1_contacts_pb.ListContactsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.ListContactsResponse) => void): grpc.ClientUnaryCall;
    public getContact(request: proto_contacts_v1_contacts_pb.GetContactRequest, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.GetContactResponse) => void): grpc.ClientUnaryCall;
    public getContact(request: proto_contacts_v1_contacts_pb.GetContactRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.GetContactResponse) => void): grpc.ClientUnaryCall;
    public getContact(request: proto_contacts_v1_contacts_pb.GetContactRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.GetContactResponse) => void): grpc.ClientUnaryCall;
    public updateContact(request: proto_contacts_v1_contacts_pb.UpdateContactRequest, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.UpdateContactResponse) => void): grpc.ClientUnaryCall;
    public updateContact(request: proto_contacts_v1_contacts_pb.UpdateContactRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.UpdateContactResponse) => void): grpc.ClientUnaryCall;
    public updateContact(request: proto_contacts_v1_contacts_pb.UpdateContactRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_contacts_v1_contacts_pb.UpdateContactResponse) => void): grpc.ClientUnaryCall;
}
