export interface Contact {
  uri: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ContactResource extends Contact {
  _links: Record<string, Link>;
}

export interface ApiResponse {
  data: unknown;
  _links?: Record<string, Link>;
}

export type Link = {
  href: string;
  type: "GET" | "POST" | "PUT" | "DELETE";
};

export interface ErrorResponse {
  message: string;
}

export interface GetContactsResponse extends ApiResponse {
  data: {
    list: ContactResource[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
  };
}

export interface GetContactResponse extends ApiResponse {
  data: ContactResource;
}
