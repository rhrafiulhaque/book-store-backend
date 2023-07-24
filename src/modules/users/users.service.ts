/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../error/ApiError';
import { IUser } from './users.interface';
import { User } from './users.model';
const createUser = async (user: IUser) => {
  if (!user.role) {
    user.role = 'user';
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  const { password, ...userWithoutPassword } = createdUser.toObject();
  const accessToken = jwt.sign(
    {
      email: createdUser.email,
      name: createdUser.name,
      role: createdUser.role,
    },
    config.jwt_secret_key as Secret,
    { expiresIn: config.jwt_expires },
  );
  return { userWithoutPassword, accessToken };
};

const getAllUsers = async (): Promise<Partial<IUser>[]> => {
  const users = await User.find().lean();
  return users;
};

const getSingleUser = async (userId: string): Promise<IUser | null> => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new ApiError(401, 'User Not Found');
  }
  return user;
};

const updateSingleUser = async (
  userId: string,
  updatedUser: IUser,
): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
  return user;
};

const deleteSingleUser = async (userId: string): Promise<IUser | null> => {
  const user = await User.findByIdAndDelete(userId);
  return user;
};

const loginUser = async (email: string, password: string): Promise<string> => {
  const userExist = await User.findOne({ email });
  if (!userExist) {
    throw new ApiError(404, 'User not found');
  }

  const passwordMatched = await bcrypt.compare(password, userExist.password);
  if (!passwordMatched) {
    throw new ApiError(401, 'Invalid password');
  }

  const accessToken = jwt.sign(
    {
      email: userExist.email,
      name: userExist.name,
      role: userExist.role,
    },
    config.jwt_secret_key as Secret,
    { expiresIn: config.jwt_expires },
  );
  return accessToken;
};

export const usersService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  loginUser,
};
