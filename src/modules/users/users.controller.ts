import { RequestHandler } from 'express';
import { usersService } from './users.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { ...userData } = req.body;
    const result = await usersService.createUser(userData);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersService.getSingleUser(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const updateSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    const user = await usersService.updateSingleUser(id, updatedUser);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User updated successfully',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await usersService.deleteSingleUser(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User deleted successfully',
      data: deletedUser,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const accessToken = await usersService.loginUser(email, password);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      data: {
        accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  loginUser,
  // getMyProfile,
  // updateMyProfile,
};
