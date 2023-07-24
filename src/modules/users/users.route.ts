import express from 'express';
import { UserController } from './users.controller';

const router = express.Router();

router.post('/create-user', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getSingleUser);
router.patch('/:id', UserController.updateSingleUser);
router.post('/login-user', UserController.loginUser);
export const UserRoutes = router;
