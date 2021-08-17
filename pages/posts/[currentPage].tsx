import { FunctionComponent, useEffect, useState } from 'react';
import { Loader } from '../../components';
import Pagination from '../../components/pagination/pagination';
import { PostItemType } from '../../data-models/post';
import { PostList } from '../../components/Post/PostList/PostList';
import { useRouter } from 'next/router';
import classes from './Json.module.css';

export interface PlaceProps {
  initialPageNumber?: number;
}

export const PostsPage: FunctionComponent<PlaceProps> = ({
  initialPageNumber,
}: PlaceProps): JSX.Element => {
  const [posts, setPosts] = useState<PostItemType[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [postPerPage] = useState(12);
  const router = useRouter();
  let currentPage = parseInt(router.query['currentPage'] as string);

  if (!currentPage) {
    currentPage = initialPageNumber ?? 1;
  }

  useEffect(() => {
    fetch(`/api/posts?_limit=12&_page=${currentPage}`)
      .then(async (response) => {
        const posts = await response.json();
        const postsCount = parseInt(response.headers.get('x-total-count'));
        if (Number.isNaN(postsCount)) {
          // TODO: HANDLE ERROR!
          return;
        }
        setTotalPosts(postsCount);
        setLoading(false);
        setPosts(posts);
      })
      .catch((error) => {
        console.error(error);
        // TODO: HANDLE ERROR!
      });
  }, [currentPage]);

  return (
    <div className="container">
      <div className={classes['wrapper']}>
        {loading && <Loader />}

        {posts.length ? (
          <PostList posts={posts} />
        ) : loading ? null : (
          <p>No posts!</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        pagesCount={Math.ceil(totalPosts / postPerPage)}
      />
    </div>
  );
};

export default PostsPage;
