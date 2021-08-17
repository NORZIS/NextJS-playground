import { PostModel } from '../../models/Posts';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import nextConnect from 'next-connect';
import createError from 'http-errors';

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .get(async (req, res, next) => {
    const { _limit, _page } = req.query as { [key: string]: string };
    const limit = parseInt(_limit ?? '100');
    const page = parseInt(_page ?? '1');
    if (limit < 0 || Number.isNaN(limit) || page < 0 || Number.isNaN(page)) {
      next(createError(400, 'Bad request'));
    }
    const skip = (page - 1) * limit;
    const posts = await PostModel.find({}, undefined, { limit, skip });
    const postsCount = await PostModel.estimatedDocumentCount();
    res.setHeader('x-total-count', postsCount);
    res.status(200).json(
      posts.map((m) => {
        const data = m.toJSON();
        return {
          id: data._id,
          title: data.title,
          body: data.body,
        };
      })
    );
  });
