import { FunctionComponent } from 'react';
import type { PostItemType } from '../../../data-models';
import PropTypes from 'prop-types';

import classes from './PostItem.module.css';

export interface PostItemProps {
  post: PostItemType;
  index: number;
}

export const PostItem: FunctionComponent<PostItemProps> = ({
  post,
}: PostItemProps) => {
  return (
    <li className={classes['post-item']}>
      <span>
        &nbsp;
        <p className={classes['post-item__title']}>{post.title}</p>
        <p className={classes['post-item__body']}>{post.body}</p>
      </span>
    </li>
  );
};

PostItem.propTypes = {
  post: PropTypes.exact({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number,
};
