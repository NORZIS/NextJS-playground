import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { PostItem } from '../PostItem/PostItem';

import classes from './PostList.module.css';
import { PostItemType } from '../../../data-models';

export interface PostListProps {
  posts: PostItemType[];
}

export const PostList: FunctionComponent<PostListProps> = ({
  posts,
}: PostListProps) => {
  return (
    <ul className={classes['op']}>
      {posts.map((post, index) => {
        return <PostItem post={post} key={post.id} index={index} />;
      })}
    </ul>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PostItem.propTypes.post).isRequired,
};
