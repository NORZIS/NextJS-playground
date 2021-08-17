import { PostModel } from '../../models/Posts';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import nextConnect, { ErrorHandler } from 'next-connect';
import createError from 'http-errors';

const onError: ErrorHandler<NextApiRequest, NextApiResponse> = (
  err,
  req,
  res
) => {
  if (err) {
    console.error(err);
    res
      .status(err.statusCode ?? 500)
      .send(err.statusCode ? err.message : 'internet server error');
  }
};

export default nextConnect<NextApiRequest, NextApiResponse>({
  onError,
})
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .get(async (req, res, next) => {
    const { id } = req.query as { [key: string]: string };
    if (!id) {
      next(createError(400, 'Bad request'));
    }
    const post = await PostModel.findOne({ _id: id }).exec();
    if (!post) {
      next(createError(404, 'Post not found'));
    }
    res.status(200).json(post.toJSON());
  })
  .post(async (req, res, next) => {
    const { title, body, previewText } = req.body;
    if (!title || !body || !previewText) {
      return next(createError(400, 'Bad request'));
    }
    const post = await PostModel.create({ title, body, previewText });
    res.status(200).json(post.toJSON);
  })
  .put(async (req, res, next) => {
    const { id, title, body, previewText } = req.body;

    if (!id || !title || !body || !previewText) {
      return next(createError(400, 'Bad request'));
    }
    try {
      const post = await PostModel.findByIdAndUpdate(
        id,
        {
          title,
          body,
          previewText,
        },
        { new: true }
      );

      if (!post) {
        return next(createError(400, 'Bad request'));
      }
      res.status(200).json(post.toJSON);
    } catch (error) {
      console.error(error);
      return next(createError(400, 'Bad request'));
    }
  })
  .delete(async (req, res, next) => {
    const { id } = req.body;

    if (!id) {
      return next(createError(400, 'Bad request'));
    }
    try {
      const post = await PostModel.findOneAndDelete({ _id: id });

      if (!post) {
        return next(createError(400, 'Bad request'));
      }
      res.status(200).json(post.toJSON);
    } catch (error) {
      console.error(error);
      return next(createError(400, 'Bad request'));
    }
  });
