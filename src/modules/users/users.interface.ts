import { Model } from 'mongoose';

export type IUser = {
  email: string;
  role: 'user';
  password: string;
  name: string;
  address: string;
};

export type UserModel = Model<IUser>;
