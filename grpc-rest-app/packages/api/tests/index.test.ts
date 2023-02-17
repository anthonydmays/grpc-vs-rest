import {
  CreateContactRequest,
  CreateContactResponse,
  DeleteContactRequest,
  Empty,
  GetContactRequest,
  GetContactResponse,
  ListContactsRequest,
  ListContactsResponse,
  UpdateContactRequest,
  UpdateContactResponse,
} from '@grpc-vs-rest/api-types';
import { ServerUnaryCall, StatusObject } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { expect, it } from '@jest/globals';
import { describe } from 'node:test';
import { ContactsService } from '../src/index';

const { objectContaining } = expect;

describe('API', () => {
  it('should list contacts', async () => {
    const contactsService = new ContactsService();
    const res = await new Promise<ListContactsResponse>((resolve) => {
      contactsService.listContacts(
        {
          request: { pageNumber: 0, pageSize: 0, orderBy: '' },
        } as ServerUnaryCall<ListContactsRequest, ListContactsResponse>,
        (err, res) => {
          resolve(res!);
        },
      );
    });

    // Expect a JSON response.
    expect(res.pageNumber).toBe(0);
    expect(res.pageSize).toBe(25);
    expect(res.pageNumber).toBe(0);
    expect(res.totalCount).toBe(207);

    const contacts = res.contacts!;
    expect(contacts.length).toBe(25);
    expect(contacts[0].lastName).toBe('Ready');
  });

  it('should list contacts with params', async () => {
    const contactsService = new ContactsService();
    const res = await new Promise<ListContactsResponse>((resolve) => {
      contactsService.listContacts(
        {
          request: { pageNumber: 1, pageSize: 5, orderBy: 'firstName' },
        } as ServerUnaryCall<ListContactsRequest, ListContactsResponse>,
        (err, res) => {
          resolve(res!);
        },
      );
    });

    // Expect a list of contacts.
    expect(res.contacts?.length).toBe(5);

    // Expect a contact to have the correct data.
    const resource = res.contacts![0];
    expect(resource.lastName).toBe('Simms');

    // Expect the correct paging information.
    expect(res.pageNumber).toBe(1);
    expect(res.pageSize).toBe(5);
    expect(res.totalCount).toBe(207);
  });

  it('should retrieve a contact', async () => {
    const contactsService = new ContactsService();
    const res = await new Promise<GetContactResponse>((resolve) => {
      contactsService.getContact(
        {
          request: { id: '184' },
        } as ServerUnaryCall<GetContactRequest, GetContactResponse>,
        (err, res) => {
          resolve(res!);
        },
      );
    });

    expect(res.contact?.firstName).toBe('Malachi');
    expect(res.contact?.lastName).toBe('Klehn');
    expect(res.contact?.email).toBe('mklehn53@pcworld.com');
  });

  it('should create a contact', async () => {
    const contactsService = new ContactsService();
    const res = await new Promise<CreateContactResponse>((resolve) => {
      contactsService.createContact(
        {
          request: {
            contact: {
              uri: '',
              firstName: 'Anthony',
              lastName: 'Mays',
              email: 'my@email.com',
            },
          },
        } as ServerUnaryCall<CreateContactRequest, CreateContactResponse>,
        (err, res) => {
          resolve(res!);
        },
      );
    });

    expect(res.contact).toEqual(
      objectContaining({
        uri: 'contacts/208',
        firstName: 'Anthony',
        lastName: 'Mays',
        email: 'my@email.com',
      }),
    );
  });

  it('should update a contact', async () => {
    const contactsService = new ContactsService();
    const res = await new Promise<UpdateContactResponse>((resolve) => {
      contactsService.updateContact(
        {
          request: {
            contact: {
              uri: 'contacts/184',
              firstName: 'Malachai',
              lastName: 'Clayn',
              email: 'somenew@email.com',
            },
          },
        } as ServerUnaryCall<UpdateContactRequest, UpdateContactResponse>,
        (err, res) => {
          resolve(res!);
        },
      );
    });

    expect(res.contact).toEqual(
      objectContaining({
        firstName: 'Malachai',
        lastName: 'Clayn',
        email: 'somenew@email.com',
      }),
    );
  });

  it('should delete a contact', async () => {
    const contactsService = new ContactsService();
    const res = await new Promise<Empty>((resolve) => {
      contactsService.deleteContact(
        {
          request: {
            id: '72',
          },
        } as ServerUnaryCall<DeleteContactRequest, Empty>,
        (err, res) => {
          resolve(res!);
        },
      );
    });

    expect(res).toEqual({});

    const getRes = await new Promise<Partial<StatusObject>>((resolve) => {
      contactsService.getContact(
        {
          request: {
            id: '72',
          },
        } as ServerUnaryCall<GetContactRequest, Empty>,
        (err, res) => {
          resolve(err as Partial<StatusObject>);
        },
      );
    });

    expect(getRes).toEqual(
      objectContaining({
        code: Status.NOT_FOUND,
        details: 'Contact not found.',
      }),
    );
  });
});
