import express from 'express';
import { BookRoutes } from '../../modules/book/book.routes';
import { UserRoutes } from '../../modules/users/users.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
