import { RequestHandler } from 'express';
import { BookServices } from './book.services';

const createBook: RequestHandler = async (req, res, next) => {
  try {
    const { ...book } = req.body;
    const result = await BookServices.createBook(book);
    return res.status(200).json({
      success: true,
      message: 'Book Created Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getAllBooks: RequestHandler = async (req, res, next) => {
  try {
    const result = await BookServices.getAllBooks();
    res.status(200).json({
      success: true,
      message: 'Books are Retrived Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleBook: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await BookServices.getSingleBook(id);
    res.status(200).json({
      success: true,
      message: 'Book Retrived Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getBookByGenre: RequestHandler = async (req, res, next) => {
  try {
    const { genre } = req.params;
    const result = await BookServices.getBookByGenre(genre);
    res.status(200).json({
      success: true,
      message: 'Book Retrived Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllGenres: RequestHandler = async (req, res, next) => {
  try {
    const result = await BookServices.getAllGenres();
    res.status(200).json({
      success: true,
      message: 'Genres are Retrived Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getAllYear: RequestHandler = async (req, res, next) => {
  try {
    const result = await BookServices.getAllYear();
    res.status(200).json({
      success: true,
      message: 'Years are Retrived Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const updateSingleBook: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    const result = await BookServices.updateSingleBook(id, data);
    return res.status(200).json({
      success: true,
      message: 'Book Updated Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const commentsOnSingleBook: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    const result = await BookServices.commentsOnSingleBook(id, data);
    return res.status(200).json({
      success: true,
      message: 'Reviews Stored Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deletesingleBook: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await BookServices.deleteSingleBook(id);
    res.status(200).json({
      success: true,
      message: 'Book Deleted Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const BookController = {
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
