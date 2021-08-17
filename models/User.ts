import Mongoose, { Schema, model, Document, Types, Model } from 'mongoose';

export const modelName = 'User';
export const collectionName = 'users';

export interface UserDocument<T = any> extends Document<Types.ObjectId, T> {
  _id: Types.ObjectId;
  login: string;
  password: string;
}

export const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

export const UserModel =
  (Mongoose.models[modelName] as Model<UserDocument>) ??
  model<UserDocument>(modelName, userSchema, collectionName);
