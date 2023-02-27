// src/models.ts

export interface Author {
  name: string;
  email: string;
}

export interface Book {
  title: string;
  authorEmail: string;
  isbn: string;
  publishedDate: string;
}

export interface Magazine {
  title: string;
  authorEmail: string;
  isbn: string;
  publishedDate: string;
}
