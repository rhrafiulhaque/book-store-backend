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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServices = void 0;
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const book_model_1 = require("./book.model");
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const existBook = yield book_model_1.Book.findOne({
        title: book.title,
        author: book.author,
    });
    if (existBook) {
        throw new ApiError_1.default(400, 'The Book is already in Database');
    }
    const createdBook = yield book_model_1.Book.create(book);
    if (!createdBook) {
        throw new ApiError_1.default(400, 'Failed to Create Book');
    }
    return createdBook;
});
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.find();
    if (!books.length) {
        throw new ApiError_1.default(400, 'The Book is not Found');
    }
    return books;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    if (!book) {
        throw new ApiError_1.default(400, 'The Book is not Found');
    }
    return book;
});
const getBookByGenre = (genre) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.find({ genre: genre });
    if (!books.length) {
        throw new ApiError_1.default(400, 'The Book is not Found');
    }
    return books;
});
const getAllGenres = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.distinct('genre');
    if (!books.length) {
        throw new ApiError_1.default(400, 'Books are not Found');
    }
    return books;
});
const getAllYear = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.aggregate([
        {
            $project: {
                year: { $year: '$publicationDate' },
            },
        },
        {
            $group: {
                _id: null,
                years: { $addToSet: '$year' },
            },
        },
        {
            $project: {
                _id: 0,
                years: 1,
            },
        },
    ]);
    if (!books.length) {
        throw new ApiError_1.default(400, 'Year are not Found');
    }
    return books;
});
const updateSingleBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    if (!book) {
        throw new ApiError_1.default(400, 'The Book is not Found');
    }
    const updateBook = yield book_model_1.Book.findByIdAndUpdate(id, data, { new: true });
    return updateBook;
});
const commentsOnSingleBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    if (!book) {
        throw new ApiError_1.default(400, 'The Book is not Found');
    }
    if (!book.reviews) {
        book.reviews = [];
    }
    book.reviews.push(data);
    const updatedBook = yield book.save();
    return updatedBook;
});
const deleteSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    if (!book) {
        throw new ApiError_1.default(400, 'The Book is not Found');
    }
    const deleteBook = yield book_model_1.Book.findByIdAndDelete(id);
    return deleteBook;
});
exports.BookServices = {
    createBook,
    getSingleBook,
    updateSingleBook,
    getBookByGenre,
    deleteSingleBook,
    getAllBooks,
    getAllGenres,
    getAllYear,
    commentsOnSingleBook,
};
