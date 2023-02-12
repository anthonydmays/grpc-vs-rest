import {
  Contact,
  ErrorResponse,
  GetContactResponse,
  GetContactsResponse,
} from '@grpc-vs-rest/api-types';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { json, Request, Response } from 'express';
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
    list: getContactResources(req, { pageSize, pageNumber, orderBy }),
    pageSize,
    pageNumber,
    totalCount,
  };

  // Assemble links providing options for client to navigate between pages of
  // data.
  const _links = getPagingLinks({ req, pageNumber, pageSize, totalCount });

  res.json({ data, _links });
});

function getContactResources(
  req: Request,
  opts: {
    pageSize: number;
    pageNumber: number;
    orderBy: string;
  },
) {
  const contacts = getContacts(opts).map((c) => ({
    ...c,
    _links: getContactLinks(req, c.uri),
  }));
  return contacts;
}

app.get(
  '/contacts/:id',
  (req, res: Response<GetContactResponse | ErrorResponse>) => {
    const uri = req.path.slice(1);
    const contact = getContact(uri);

    // If the contact isn't found, return the not found status.
    if (!contact) {
      res.status(404);
      res.json({ message: 'Contact not found' });
      return;
    }

    // Assemble the contact data.
    const data = { ...contact, _links: getContactLinks(req, uri) };

    res.json({ data });
  },
);

app.put(
  '/contacts/:id',
  (req, res: Response<GetContactResponse | ErrorResponse>) => {
    const uri = req.path.slice(1);

    if (!getContact(uri)) {
      res.status(404);
      res.json({ message: 'Contact not found' });
      return;
    }

    try {
      updateContact(uri, req.body as Contact);
    } catch (error) {
      res.status(400);
      res.json({ message: 'Bad request' });
      return;
    }

    const data = {
      ...getContact(uri)!,
      _links: getContactLinks(req, uri),
    };

    const _links = getContactLinks(req, uri);

    res.json({ data, _links });
  },
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
