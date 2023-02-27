"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveData = exports.addMagazine = exports.addBook = exports.sortByTitle = exports.findByAuthorEmail = exports.findByISBN = exports.getAllMagazines = exports.getAllBooks = exports.readData = void 0;
const fs = __importStar(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const _ = __importStar(require("lodash"));
const authors = [];
const books = [];
const magazines = [];
function readData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield readAuthors();
        yield readBooks();
        yield readMagazines();
    });
}
exports.readData = readData;
function readAuthors() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs.createReadStream("Authors.csv")
                .pipe((0, csv_parser_1.default)())
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
    });
}
function readBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs.createReadStream("Books.csv")
                .pipe((0, csv_parser_1.default)())
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
    });
}
function readMagazines() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs.createReadStream("Magazines.csv")
                .pipe((0, csv_parser_1.default)())
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
    });
}
function getAllBooks() {
    return books;
}
exports.getAllBooks = getAllBooks;
function getAllMagazines() {
    return magazines;
}
exports.getAllMagazines = getAllMagazines;
function findByISBN(isbn) {
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
exports.findByISBN = findByISBN;
function findByAuthorEmail(email) {
    const booksByAuthor = _.filter(books, { authorEmail: email });
    const magazinesByAuthor = _.filter(magazines, { authorEmail: email });
    return [...booksByAuthor, ...magazinesByAuthor];
}
exports.findByAuthorEmail = findByAuthorEmail;
function sortByTitle() {
    const allItems = [...books, ...magazines];
    return _.sortBy(allItems, "title");
}
exports.sortByTitle = sortByTitle;
function addBook(book) {
    books.push(book);
}
exports.addBook = addBook;
function addMagazine(magazine) {
    magazines.push(magazine);
}
exports.addMagazine = addMagazine;
function saveData() {
    return __awaiter(this, void 0, void 0, function* () {
        const authorCsv = authors.map((a) => `${a.name},${a.email}`).join("\n");
        const bookCsv = books
            .map((b) => `${b.title},${b.authorEmail},${b.isbn},${b.publishedDate}`)
            .join("\n");
        const magazineCsv = magazines
            .map((m) => `${m.title},${m.authorEmail},${m.isbn},${m.publishedDate}`)
            .join("\n");
        yield fs.promises.writeFile("Authors.csv", authorCsv);
        yield fs.promises.writeFile("Books.csv", bookCsv);
        yield fs.promises.writeFile("Magazines.csv", magazineCsv);
    });
}
exports.saveData = saveData;
