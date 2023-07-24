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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_services_1 = require("./book.services");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = __rest(req.body, []);
        const result = yield book_services_1.BookServices.createBook(book);
        return res.status(200).json({
            success: true,
            message: 'Book Created Successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_services_1.BookServices.getAllBooks();
        res.status(200).json({
            success: true,
            message: 'Books are Retrived Successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield book_services_1.BookServices.getSingleBook(id);
        res.status(200).json({
            success: true,
            message: 'Book Retrived Successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getBookByGenre = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { genre } = req.params;
        const result = yield book_services_1.BookServices.getBookByGenre(genre);
        res.status(200).json({
            success: true,
            message: 'Book Retrived Successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllGenres = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_services_1.BookServices.getAllGenres();
        res.status(200).json({
            success: true,
            message: 'Genres are Retrived Successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_services_1.BookServices.getAllYear();
        res.status(200).json({
            success: true,
            message: 'Years are Retrived Successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const updateSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = __rest(req.body, []);
        const result = yield book_services_1.BookServices.updateSingleBook(id, data);
        res.status(200).json({
            success: true,
            message: 'Book Updated Successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const commentsOnSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = __rest(req.body, []);
        const result = yield book_services_1.BookServices.commentsOnSingleBook(id, data);
        res.status(200).json({
            success: true,
            message: 'Reviews Stored Successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const deletesingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const result = yield book_services_1.BookServices.deleteSingleBook(id);
        res.status(200).json({
            success: true,
            message: 'Book Deleted Successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.BookController = {
    createBook,
    getSingleBook,
    updateSingleBook,
    getBookByGenre,
    deletesingleBook,
    getAllBooks,
    getAllGenres,
    getAllYear,
    commentsOnSingleBook,
};
