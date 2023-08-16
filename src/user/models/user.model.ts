/* eslint-disable prettier/prettier */
import { Document, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
    collection: 'posts',
  },
);

export { UserSchema };

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}
