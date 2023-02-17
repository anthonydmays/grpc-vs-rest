import { expect, it } from '@jest/globals';
import { ServerCallContext } from '@protobuf-ts/runtime-rpc';
import { describe } from 'node:test';
import { ContactsService } from '../src/index';

const { objectContaining } = expect;

describe('API', () => {
  it('should list contacts', async () => {
    const contactsService = new ContactsService();
    const res = await contactsService.listContacts(
      { pageNumber: 0, pageSize: 0, orderBy: '' },
      {} as ServerCallContext,
    );

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
    const res = await contactsService.listContacts(
      { pageNumber: 1, pageSize: 5, orderBy: 'firstName' },
      {} as ServerCallContext,
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
    const contactsService = new ContactsService();
    const res = await contactsService.getContact(
      { id: '184' },
      {} as ServerCallContext,
    );

    expect(res.contact?.firstName).toBe('Malachi');
    expect(res.contact?.lastName).toBe('Klehn');
    expect(res.contact?.email).toBe('mklehn53@pcworld.com');
  });

  it('should create a contact', async () => {
    const contactsService = new ContactsService();
    const res = await contactsService.createContact(
      {
        contact: {
          uri: '',
          firstName: 'Anthony',
          lastName: 'Mays',
          email: 'my@email.com',
        },
      },
      {} as ServerCallContext,
    );

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
    const res = await contactsService.updateContact(
      {
        id: '184',
        contact: {
          uri: 'contacts/184',
          firstName: 'Malachai',
          lastName: 'Clayn',
          email: 'somenew@email.com',
        },
      },
      {} as ServerCallContext,
    );

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
    const res = await contactsService.deleteContact(
      {
        id: '72',
      },
      {} as ServerCallContext,
    );

    expect(res).toEqual({});

    try {
      await contactsService.getContact(
        {
          id: '72',
        },
        {} as ServerCallContext,
      );
    } catch (e: unknown) {
      expect((e as Error).message).toBe('Contact not found.');
    }
  });
});
