import ApiError from '../../error/ApiError';
import { IBook, IReview } from './book.interface';
import { Book } from './book.model';

const createBook = async (book: IBook): Promise<IBook | null> => {
  const existBook = await Book.findOne({
    title: book.title,
    author: book.author,
  });

  if (existBook) {
    throw new ApiError(400, 'The Book is already in Database');
  }

  const createdBook = await Book.create(book);
  if (!createdBook) {
    throw new ApiError(400, 'Failed to Create Book');
  }

  return createdBook;
};

const getAllBooks = async (): Promise<IBook[] | null> => {
  const books = await Book.find();
  if (!books.length) {
    throw new ApiError(400, 'The Book is not Found');
  }
  return books;
};
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(400, 'The Book is not Found');
  }
  return book;
};
const getBookByGenre = async (genre: string): Promise<IBook[] | null> => {
  const books = await Book.find({ genre: genre });

  if (!books.length) {
    throw new ApiError(400, 'The Book is not Found');
  }
  return books;
};
const getAllGenres = async (): Promise<IBook[] | null> => {
  const books = await Book.distinct('genre');

  if (!books.length) {
    throw new ApiError(400, 'Books are not Found');
  }
  return books;
};
const getAllYear = async (): Promise<IBook[] | null> => {
  const years = await Book.aggregate([
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

  if (!years.length) {
    throw new ApiError(400, 'Year are not Found');
  }
  return years;
};

const updateSingleBook = async (
  id: string,
  data: Partial<IBook>,
): Promise<IBook | null> => {
  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(400, 'The Book is not Found');
  }
  const updateBook = await Book.findByIdAndUpdate(id, data, { new: true });
  return updateBook;
};
const commentsOnSingleBook = async (
  id: string,
  data: IReview,
): Promise<IBook | null> => {
  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(400, 'The Book is not Found');
  }

  if (!book.reviews) {
    book.reviews = [];
  }

  book.reviews.push(data);
  const updatedBook = await book.save();
  return updatedBook;
};
const deleteSingleBook = async (id: string): Promise<IBook | null> => {
  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(400, 'The Book is not Found');
  }

  const deleteBook = await Book.findByIdAndDelete(id);
  return deleteBook;
};

export const BookServices = {
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
