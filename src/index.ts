
import {
  readData,
  getAllBooks,
  getAllMagazines,
  findByISBN,
  findByAuthorEmail,
  sortByTitle,
  addBook,
  addMagazine,
  saveData,
} from "./utils";

async function main() {
  await readData();

  console.log("All books:");
  console.log(getAllBooks());

  console.log("All magazines:");
  console.log(getAllMagazines());

  console.log('Book or magazine with ISBN "09876":');
  console.log(findByISBN("09876"));

  console.log('All books and magazines by author email "jane@example.com":');
  console.log(findByAuthorEmail("jane@example.com"));

  console.log("All books and magazines sorted by title:");
  console.log(sortByTitle());

  const newBook = {
    title: "New Book",
    authorEmail: "john@example.com",
    isbn: "67890",
    publishedDate: "2023-01-01",
  };
  addBook(newBook);

  const newMagazine = {
    title: "New Magazine",
    authorEmail: "jane@example.com",
    isbn: "09876",
    publishedDate: "2023-02-01",
  };
  addMagazine(newMagazine);

  await saveData();
  console.log("Data saved to CSV files");
}

main().catch((error) => console.error(error));
