import Mongoose, { Schema, model, Document, Types, Model } from 'mongoose';

export const modelName = 'Post';
export const collectionName = 'posts';

export interface PostDocument<T = any> extends Document<Types.ObjectId, T> {
  _id: Types.ObjectId;
  title?: string;
  body?: string;
  previewText?: string;
}

export const postSchema = new Schema({
  title: String,
  body: String,
  previewText: String,
});

export const PostModel =
  (Mongoose.models[modelName] as Model<PostDocument>) ??
  model<PostDocument>(modelName, postSchema, collectionName);
