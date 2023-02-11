import { Link } from 'apiTypes/src/index.js';
import { Request } from 'express';
import { default as urlJoin, default as urljoin } from 'url-join';

export function getPagingLinks(opts: {
  req: Request;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}): Link[] {
  const { req, pageNumber, pageSize, totalCount } = opts;
  const _links: Link[] = [
    {
      rel: 'self',
      type: 'GET',
      href: getPagingUrl(req, pageNumber),
    },
    {
      rel: 'firstPage',
      type: 'GET',
      href: getPagingUrl(req, 0),
    },
    {
      rel: 'lastPage',
      type: 'GET',
      href: getPagingUrl(req, Math.floor(totalCount / pageSize)),
    },
    {
      rel: 'orderByLastName',
      type: 'GET',
      href: getPagingUrl(req, 0, 'lastName'),
    },
  ];

  if (pageNumber > 0) {
    _links.push({
      rel: 'previousPage',
      type: 'GET',
      href: getPagingUrl(req, pageNumber - 1),
    });
  }

  if (pageSize * (pageNumber + 2) < totalCount) {
    _links.push({
      rel: 'nextPage',
      type: 'GET',
      href: getPagingUrl(req, pageNumber + 1),
    });
  }

  return _links;
}

function getPagingUrl(req: Request, pageNumber?: number, orderBy?: string) {
  orderBy = orderBy || String(req.query.orderBy || '');
  const orderByParam = orderBy ? `?orderBy=${orderBy}` : '';

  pageNumber = pageNumber ?? Number(req.query.pageNumber);
  const pageNumberParam = pageNumber > 0 ? `?pageNumber=${pageNumber}` : '';

  return urljoin(getBaseUrl(req), pageNumberParam, orderByParam);
}

export function getContactLinks(req: Request, id: number): Link[] {
  const _links: Link[] = [
    {
      rel: 'self',
      href: urlJoin(getBaseUrl(req), `/${id}`),
      type: 'GET',
    },
  ];
  return _links;
}

function getBaseUrl(req: Request): string {
  return `${req.protocol}://${req.hostname}:${process.env.PORT}/contacts`;
}
