// package: proto.contacts.v1
// file: proto/contacts/v1/contacts.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ListContactsRequest extends jspb.Message { 
    getPageSize(): number;
    setPageSize(value: number): ListContactsRequest;
    getPageNumber(): number;
    setPageNumber(value: number): ListContactsRequest;
    getOrderBy(): string;
    setOrderBy(value: string): ListContactsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListContactsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListContactsRequest): ListContactsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListContactsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListContactsRequest;
    static deserializeBinaryFromReader(message: ListContactsRequest, reader: jspb.BinaryReader): ListContactsRequest;
}

export namespace ListContactsRequest {
    export type AsObject = {
        pageSize: number,
        pageNumber: number,
        orderBy: string,
    }
}

export class ListContactsResponse extends jspb.Message { 
    clearContactsList(): void;
    getContactsList(): Array<Contact>;
    setContactsList(value: Array<Contact>): ListContactsResponse;
    addContacts(value?: Contact, index?: number): Contact;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListContactsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListContactsResponse): ListContactsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListContactsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListContactsResponse;
    static deserializeBinaryFromReader(message: ListContactsResponse, reader: jspb.BinaryReader): ListContactsResponse;
}

export namespace ListContactsResponse {
    export type AsObject = {
        contactsList: Array<Contact.AsObject>,
    }
}

export class GetContactRequest extends jspb.Message { 
    getUri(): string;
    setUri(value: string): GetContactRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetContactRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetContactRequest): GetContactRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetContactRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetContactRequest;
    static deserializeBinaryFromReader(message: GetContactRequest, reader: jspb.BinaryReader): GetContactRequest;
}

export namespace GetContactRequest {
    export type AsObject = {
        uri: string,
    }
}

export class GetContactResponse extends jspb.Message { 

    hasContact(): boolean;
    clearContact(): void;
    getContact(): Contact | undefined;
    setContact(value?: Contact): GetContactResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetContactResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetContactResponse): GetContactResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetContactResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetContactResponse;
    static deserializeBinaryFromReader(message: GetContactResponse, reader: jspb.BinaryReader): GetContactResponse;
}

export namespace GetContactResponse {
    export type AsObject = {
        contact?: Contact.AsObject,
    }
}

export class UpdateContactRequest extends jspb.Message { 

    hasContact(): boolean;
    clearContact(): void;
    getContact(): Contact | undefined;
    setContact(value?: Contact): UpdateContactRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateContactRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateContactRequest): UpdateContactRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateContactRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateContactRequest;
    static deserializeBinaryFromReader(message: UpdateContactRequest, reader: jspb.BinaryReader): UpdateContactRequest;
}

export namespace UpdateContactRequest {
    export type AsObject = {
        contact?: Contact.AsObject,
    }
}

export class UpdateContactResponse extends jspb.Message { 

    hasContact(): boolean;
    clearContact(): void;
    getContact(): Contact | undefined;
    setContact(value?: Contact): UpdateContactResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateContactResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateContactResponse): UpdateContactResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateContactResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateContactResponse;
    static deserializeBinaryFromReader(message: UpdateContactResponse, reader: jspb.BinaryReader): UpdateContactResponse;
}

export namespace UpdateContactResponse {
    export type AsObject = {
        contact?: Contact.AsObject,
    }
}

export class Contact extends jspb.Message { 
    getUri(): string;
    setUri(value: string): Contact;
    getFirstName(): string;
    setFirstName(value: string): Contact;
    getLastName(): string;
    setLastName(value: string): Contact;
    getEmail(): string;
    setEmail(value: string): Contact;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Contact.AsObject;
    static toObject(includeInstance: boolean, msg: Contact): Contact.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Contact, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Contact;
    static deserializeBinaryFromReader(message: Contact, reader: jspb.BinaryReader): Contact;
}

export namespace Contact {
    export type AsObject = {
        uri: string,
        firstName: string,
        lastName: string,
        email: string,
    }
}
