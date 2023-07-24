import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { IUser } from './users.interface';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user'],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// userSchema.methods.isPasswordMatched= async function(givenPassword:string, savedPassword:string){
//       return await bcrypt.compare(givenPassword,savedPassword)
// }

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrpt_salt_rounds),
  );
  next();
});

export const User = model<IUser>('User', userSchema);
