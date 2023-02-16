import { Link } from '@grpc-vs-rest/api-types';
import { Request } from 'express';
import { default as urlJoin, default as urljoin } from 'url-join';

export function getPagingLinks(opts: {
  req: Request;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}): Record<string, Link> {
  const { req, pageNumber, pageSize, totalCount } = opts;
  const _links: Record<string, Link> = {
    self: {
      type: 'GET',
      href: getPagingUrl(req, pageNumber),
    },
    firstPage: {
      type: 'GET',
      href: getPagingUrl(req, 0),
    },
    lastPage: {
      type: 'GET',
      href: getPagingUrl(req, Math.floor(totalCount / pageSize)),
    },
    orderByFirstName: {
      type: 'GET',
      href: getPagingUrl(req, 0, 'firstName'),
    },
    orderByLastName: {
      type: 'GET',
      href: getPagingUrl(req, 0, 'lastName'),
    },
    orderByEmail: {
      type: 'GET',
      href: getPagingUrl(req, 0, 'email'),
    },
  };

  if (pageNumber > 0) {
    _links['previousPage'] = {
      type: 'GET',
      href: getPagingUrl(req, pageNumber - 1),
    };
  }

  if (pageSize * (pageNumber + 1) < totalCount) {
    _links['nextPage'] = {
      type: 'GET',
      href: getPagingUrl(req, pageNumber + 1),
    };
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

export function getContactLinks(
  req: Request,
  uri: string,
): Record<string, Link> {
  const _links: Record<string, Link> = {
    self: {
      href: urlJoin(getBaseUrl(req), uri.replace('contacts/', '')),
      type: 'GET',
    },
  };
  if (req.params['id']) {
    _links['allContacts'] = {
      href: getBaseUrl(req),
      type: 'GET',
    };
    _links['delete'] = {
      href: urlJoin(getBaseUrl(req), uri.replace('contacts/', '')),
      type: 'DELETE',
    };
  }
  return _links;
}

function getBaseUrl(req: Request): string {
  return `${req.protocol}://${req.get('host')}/v1/contacts`;
}
