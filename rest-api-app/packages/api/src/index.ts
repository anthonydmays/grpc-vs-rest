import {
  Contact,
  ErrorResponse,
  GetContactResponse,
  GetContactsResponse,
} from 'apiTypes/src/index.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { json, Response } from 'express';
import {
  getContact,
  getContacts,
  getContactsCount,
  updateContact,
} from './contacts.js';
import { getContactLinks, getPagingLinks } from './links.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 9090;

app.use(json());
app.use(cors());

app.get('/', (req, res) => {
  res.redirect('/contacts');
});

app.get('/contacts', (req, res: Response<GetContactsResponse>) => {
  const pageSize = Number(req.query.pageSize) || 25;
  const pageNumber = Number(req.query.pageNumber) || 0;
  const orderBy = String(req.query.orderBy) || 'lastName';
  const totalCount = getContactsCount();

  // Assemble list of contacts and paging information.
  const data = {
    list: getContacts({ pageSize, pageNumber, orderBy }),
    pageSize,
    pageNumber,
    totalCount,
  };

  // Assemble links providing options for client to navigate between pages of
  // data.
  const _links = getPagingLinks({ req, pageNumber, pageSize, totalCount });

  res.json({ data, _links });
});

app.get(
  '/contacts/:id',
  (req, res: Response<GetContactResponse | ErrorResponse>) => {
    const id = Number(req.params.id);

    const contact = getContact(Number(id));

    // If the contact isn't found, return the not found status.
    if (!contact) {
      res.status(404);
      res.json({ message: 'Contact not found' });
      return;
    }

    // Assemble the contact data.
    const data = { ...contact };

    // Provide contextual links informing the client of useful resources related to this contact.
    const _links = getContactLinks(req, id);

    res.json({ data, _links });
  },
);

app.put(
  '/contacts/:id',
  (req, res: Response<GetContactResponse | ErrorResponse>) => {
    const id = Number(req.params.id);

    if (!getContact(id)) {
      res.status(404);
      res.json({ message: 'Contact not found' });
      return;
    }

    try {
      updateContact(id, req.body as Contact);
    } catch (error) {
      res.status(400);
      res.json({ message: 'Bad request' });
      return;
    }

    const data = {
      ...getContact(id)!,
    };

    const _links = getContactLinks(req, id);

    res.json({ data, _links });
  },
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
