export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ApiResponse {
  data: unknown;
  _links: Link[];
}

export interface ErrorResponse {
  message: string;
}

export interface GetContactsResponse extends ApiResponse {
  data: {
    list: Contact[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
  };
}

export interface GetContactResponse extends ApiResponse {
  data: Contact;
}

export type Link = {
  rel: string;
  href: string;
  type: "GET" | "POST" | "PUT" | "DELETE";
};
