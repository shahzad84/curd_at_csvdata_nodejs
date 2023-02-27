import * as fs from 'fs';
import csvParser from "csv-parser";
import { Author, Book, Magazine } from "./models";
import * as _ from "lodash";
const authors: Author[] = [];
const books: Book[] = [];
const magazines: Magazine[] = [];

export async function readData(): Promise<void> {
  await readAuthors();
  await readBooks();
  await readMagazines();
}

async function readAuthors(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream("Authors.csv")
      .pipe(csvParser())
      .on("data", (data) => {
        authors.push({ name: data.name, email: data.email });
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function readBooks(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream("Books.csv")
      .pipe(csvParser())
      .on("data", (data) => {
        books.push({
          title: data.title,
          authorEmail: data.authorEmail,
          isbn: data.isbn,
          publishedDate: data.publishedDate,
        });
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function readMagazines(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream("Magazines.csv")
      .pipe(csvParser())
      .on("data", (data) => {
        magazines.push({
          title: data.title,
          authorEmail: data.authorEmail,
          isbn: data.isbn,
          publishedDate: data.publishedDate,
        });
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

export function getAllBooks(): Book[] {
  return books;
}

export function getAllMagazines(): Magazine[] {
  return magazines;
}

export function findByISBN(isbn: string): Book | Magazine | undefined {
  const book = _.find(books, { isbn });
  if (book) {
    return book;
  }
  const magazine = _.find(magazines, { isbn });
  if (magazine) {
    return magazine;
  }
  return undefined;
}

export function findByAuthorEmail(email: string): (Book | Magazine)[] {
  const booksByAuthor = _.filter(books, { authorEmail: email });
  const magazinesByAuthor = _.filter(magazines, { authorEmail: email });
  return [...booksByAuthor, ...magazinesByAuthor];
}

export function sortByTitle(): (Book | Magazine)[] {
  const allItems = [...books, ...magazines];
  return _.sortBy(allItems, "title");
}

export function addBook(book: Book): void {
  books.push(book);
}

export function addMagazine(magazine: Magazine): void {
  magazines.push(magazine);
}

export async function saveData(): Promise<void> {
  const authorCsv = authors.map((a) => `${a.name},${a.email}`).join("\n");
  const bookCsv = books
    .map((b) => `${b.title},${b.authorEmail},${b.isbn},${b.publishedDate}`)
    .join("\n");
  const magazineCsv = magazines
    .map((m) => `${m.title},${m.authorEmail},${m.isbn},${m.publishedDate}`)
    .join("\n");

  await fs.promises.writeFile("Authors.csv", authorCsv);
  await fs.promises.writeFile("Books.csv", bookCsv);
  await fs.promises.writeFile("Magazines.csv", magazineCsv);
}
