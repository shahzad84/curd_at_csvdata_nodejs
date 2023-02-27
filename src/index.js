"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, utils_1.readData)();
        console.log("All books:");
        console.log((0, utils_1.getAllBooks)());
        console.log("All magazines:");
        console.log((0, utils_1.getAllMagazines)());
        console.log('Book or magazine with ISBN "09876":');
        console.log((0, utils_1.findByISBN)("09876"));
        console.log('All books and magazines by author email "jane@example.com":');
        console.log((0, utils_1.findByAuthorEmail)("jane@example.com"));
        console.log("All books and magazines sorted by title:");
        console.log((0, utils_1.sortByTitle)());
        const newBook = {
            title: "New Book",
            authorEmail: "john@example.com",
            isbn: "67890",
            publishedDate: "2023-01-01",
        };
        (0, utils_1.addBook)(newBook);
        const newMagazine = {
            title: "New Magazine",
            authorEmail: "jane@example.com",
            isbn: "09876",
            publishedDate: "2023-02-01",
        };
        (0, utils_1.addMagazine)(newMagazine);
        yield (0, utils_1.saveData)();
        console.log("Data saved to CSV files");
    });
}
main().catch((error) => console.error(error));
