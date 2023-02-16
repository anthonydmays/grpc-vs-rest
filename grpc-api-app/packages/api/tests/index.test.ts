import { HandlerContext } from '@bufbuild/connect-node';
import {
  CreateContactRequest,
  DeleteContactRequest,
  GetContactRequest,
  ListContactsRequest,
  UpdateContactRequest,
} from '@grpc-vs-rest/api-types';
import { expect, it } from '@jest/globals';
import { describe } from 'node:test';
import { contactsServiceImpl } from '../src/index';

const { objectContaining, stringMatching } = expect;
const DEFAULT_CONTEXT = {} as HandlerContext;

describe('API', () => {
  it('should list contacts', async () => {
    const req = new ListContactsRequest();

    const res = await contactsServiceImpl.listContacts(req, DEFAULT_CONTEXT);

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
    const req = new ListContactsRequest({
      pageNumber: 1,
      pageSize: 5,
      orderBy: 'firstName',
    });

    const res = await contactsServiceImpl.listContacts(
      req,
      {} as HandlerContext,
    );

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
    const req = new GetContactRequest({
      uri: 'contacts/184',
    });

    const res = await contactsServiceImpl.getContact(req, DEFAULT_CONTEXT);

    expect(res.contact?.firstName).toBe('Malachi');
    expect(res.contact?.lastName).toBe('Klehn');
    expect(res.contact?.email).toBe('mklehn53@pcworld.com');
  });

  it('should create a contact', async () => {
    const req = new CreateContactRequest({
      contact: {
        firstName: 'Anthony',
        lastName: 'Mays',
        email: 'my@email.com',
      },
    });

    const res = await contactsServiceImpl.createContact(req, DEFAULT_CONTEXT);

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
    const req = new UpdateContactRequest({
      contact: {
        uri: 'contacts/184',
        firstName: 'Malachai',
        lastName: 'Clayn',
        email: 'somenew@email.com',
      },
    });

    const res = await contactsServiceImpl.updateContact(req, DEFAULT_CONTEXT);

    expect(res.contact).toEqual(
      objectContaining({
        firstName: 'Malachai',
        lastName: 'Clayn',
        email: 'somenew@email.com',
      }),
    );
  });

  it('should delete a contact', async () => {
    const req = new DeleteContactRequest({
      uri: 'contacts/72',
    });

    const res = await contactsServiceImpl.deleteContact(req, DEFAULT_CONTEXT);

    expect(res).toEqual({});

    expect(() =>
      contactsServiceImpl.getContact(
        new GetContactRequest({ uri: 'contacts/72' }),
        DEFAULT_CONTEXT,
      ),
    ).toThrow();
  });
});
