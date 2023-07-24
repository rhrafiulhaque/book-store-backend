import express from 'express';
import auth from '../../app/middlewares/auth';
import { BookController } from './book.controller';

const router = express.Router();
router.post('/create-book', auth('user'), BookController.createBook);
router.get('/getbook/:id', BookController.getSingleBook);
router.get('/', BookController.getAllBooks);
router.get('/findbygenre/:genre', BookController.getBookByGenre);
router.get('/getallgenres', BookController.getAllGenres);
router.get('/getallyears', BookController.getAllYear);
router.patch('/:id', auth('user'), BookController.updateSingleBook);
router.patch('/review/:id', auth('user'), BookController.commentsOnSingleBook);
router.delete('/:id', auth('user'), BookController.deletesingleBook);

export const BookRoutes = router;
