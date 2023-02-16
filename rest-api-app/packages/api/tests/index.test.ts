import { expect, it } from '@jest/globals';
import { describe } from 'node:test';
import request from 'supertest';
import { app } from '../src/index';

const { objectContaining, stringMatching } = expect;

describe('API', () => {
  it('should GET contacts', async () => {
    const res = await request(app).get('/v1/contacts');

    // Expect a JSON response.
    expect(res.header['content-type']).toMatch(/json/);

    // Expect the proper links.
    expect(res.body._links).toBeDefined();
    expect(res.body._links.self).toEqual(
      objectContaining({
        href: stringMatching(/\/v1\/contacts$/),
        type: 'GET',
      }),
    );
    expect(res.body._links.previousPage).toBeUndefined();
    expect(res.body._links.nextPage).toEqual(
      objectContaining({
        href: stringMatching(/\/v1\/contacts\?pageNumber=1$/),
        type: 'GET',
      }),
    );
    expect(res.body._links.lastPage).toEqual(
      objectContaining({
        href: stringMatching(/\/v1\/contacts\?pageNumber=8$/),
        type: 'GET',
      }),
    );

    // Expect a list of contacts.
    expect(res.body.resource.list.length).toBe(25);
    expect(res.body.resource.list[0].lastName).toBe('Ready');

    // Expect paging information.
    expect(res.body.resource.pageNumber).toBe(0);
    expect(res.body.resource.pageSize).toBe(25);
    expect(res.body.resource.totalCount).toBe(207);
  });

  it('should GET contacts with params', async () => {
    const res = await request(app).get(
      '/v1/contacts?pageNumber=1&pageSize=5&orderBy=firstName',
    );

    // Expect the proper links.
    expect(res.body._links).toBeDefined();
    expect(res.body._links.self).toEqual(
      objectContaining({
        href: stringMatching(
          /\/v1\/contacts\??pageNumber=1&orderBy=firstName$/,
        ),
        type: 'GET',
      }),
    );
    expect(res.body._links.previousPage).toEqual(
      objectContaining({
        href: stringMatching(/\/v1\/contacts\?orderBy=firstName$/),
        type: 'GET',
      }),
    );
    expect(res.body._links.nextPage).toEqual(
      objectContaining({
        href: stringMatching(/\/v1\/contacts\?pageNumber=2&orderBy=firstName$/),
        type: 'GET',
      }),
    );
    expect(res.body._links.lastPage).toEqual(
      objectContaining({
        href: stringMatching(
          /\/v1\/contacts\?pageNumber=41&orderBy=firstName$/,
        ),
        type: 'GET',
      }),
    );

    // Expect a list of contacts.
    expect(res.body.resource.list.length).toBe(5);

    // Expect a contact to have the correct data.
    const resource = res.body.resource.list[0];
    expect(resource.lastName).toBe('Simms');
    expect(resource._links.self).toEqual(
      objectContaining({
        href: stringMatching(/\/v1\/contacts\/157$/),
        type: 'GET',
      }),
    );

    // Expect the correct paging information.
    expect(res.body.resource.pageNumber).toBe(1);
    expect(res.body.resource.pageSize).toBe(5);
    expect(res.body.resource.totalCount).toBe(207);
  });

  it('should GET a contact', async () => {
    const res = await request(app).get('/v1/contacts/184');

    expect(res.header['content-type']).toMatch(/json/);
    expect(res.status).toBe(200);
    expect(res.body._links).not.toBeDefined();
    expect(res.body.resource._links).toBeDefined();
    expect(res.body.resource._links.self).toEqual(
      objectContaining({
        href: stringMatching(/\/v1\/contacts\/184$/),
        type: 'GET',
      }),
    );
    expect(res.body.resource._links.allContacts).toEqual(
      objectContaining({
        href: stringMatching(/\/v1\/contacts$/),
        type: 'GET',
      }),
    );
    expect(res.body.resource._links.delete).toEqual(
      objectContaining({
        href: stringMatching(/\/v1\/contacts\/184$/),
        type: 'DELETE',
      }),
    );
    expect(res.body.resource.firstName).toBe('Malachi');
    expect(res.body.resource.lastName).toBe('Klehn');
    expect(res.body.resource.email).toBe('mklehn53@pcworld.com');
  });

  it('should GET non-existent contact with 404', async () => {
    const res = await request(app).get('/v1/contacts/doesnotexist');

    expect(res.header['content-type']).toMatch(/json/);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Contact not found' });
  });

  it('should PUT a contact', async () => {
    const res = await request(app).put('/v1/contacts/184').send({
      firstName: 'Malachai',
      lastName: 'Clayn',
      email: 'somenew@email.com',
    });

    expect(res.header['content-type']).toMatch(/json/);
    expect(res.status).toBe(200);
    expect(res.body._links).toBeDefined();
    expect(res.body._links.self).toEqual(
      objectContaining({
        href: stringMatching(/\/v1\/contacts\/184$/),
        type: 'GET',
      }),
    );
    expect(res.body._links.allContacts).toEqual(
      objectContaining({
        href: stringMatching(/\/v1\/contacts$/),
        type: 'GET',
      }),
    );
    expect(res.body.resource).toEqual(
      objectContaining({
        firstName: 'Malachai',
        lastName: 'Clayn',
        email: 'somenew@email.com',
      }),
    );
  });

  it('should PUT a non-existent contact with 404', async () => {
    const res = await request(app)
      .put('/v1/contacts/doesnotexist')
      .send({ lastName: 'whoCares' });

    expect(res.header['content-type']).toMatch(/json/);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Contact not found' });
  });

  it('should DELETE a contact', async () => {
    const res = await request(app).delete('/v1/contacts/174');

    expect(res.header['content-type']).toMatch(/json/);
    expect(res.status).toBe(200);
    expect(res.body.resource).toBeUndefined();
    expect(res.body._links).not.toBeDefined();

    const getRes = request(app).get('/v1/contacts/174');
    expect((await getRes).status).toBe(404);
  });
});
