import classes from './pagination.module.css';
import Link from 'next/link';
import { useCallback } from 'react';
import range from 'lodash.range';
import { FunctionComponent } from 'react';

export interface PaginationProps {
  currentPage: number;
  pagesCount: number;
}

const Pagination: FunctionComponent<PaginationProps> = ({
  pagesCount,
  currentPage,
}: PaginationProps) => {
  const mapper = useCallback(
    (number) => (
      <li key={number} className={classes['page-item']}>
        <Link href={`/posts/${number}`}>{`${number}`}</Link>
      </li>
    ),
    []
  );

  const isManyPages = pagesCount >= 5;
  let isFirstGapVisible = false;
  let isSecondGapVisible = false;
  let arr: number[];
  let arrAfterGap: number[];
  let arrBeforeGap: number[];

  if (!isManyPages) {
    arr = range(1, pagesCount + 1);
  } else {
    const delta = pagesCount - currentPage;
    const alpha = currentPage - 5;
    if (alpha >= 2) {
      arrBeforeGap = range(1, 4);
      isFirstGapVisible = true;
      if (currentPage - 3 <= 0) {
        arr = range(1, currentPage + 3);
      } else {
        arr = range(currentPage - 3, currentPage + 3);
      }
    } else {
      arr = range(1, currentPage + 3);
    }
    if (delta > 5) {
      arrAfterGap = range(pagesCount - 2, pagesCount + 1);
      isSecondGapVisible = true;
      if (currentPage - 3 <= 0) {
        arr = range(1, currentPage + 3);
      } else {
        arr = range(currentPage - 3, currentPage + 3);
      }
    } else {
      arr = range(currentPage - 3, pagesCount + 1);
      if (currentPage - 3 <= 0) {
        arr = range(1, pagesCount + 1);
      } else {
        arr = range(currentPage - 2, pagesCount + 1);
      }
    }
    if (alpha < 2 && delta < 5) {
      arr = range(1, pagesCount + 1);
    }
  }
  return (
    <nav>
      <ul className={classes['__pagination']}>
        {currentPage > 1 && (
          <li>
            <Link href={`/posts/${currentPage - 1}`}>{'prev'}</Link>
          </li>
        )}
        {isFirstGapVisible && arrBeforeGap?.length > 0 && (
          <>
            {arrBeforeGap.map(mapper)}
            <span>{'...'}</span>
          </>
        )}
        {arr.map(mapper)}
        {isSecondGapVisible && arrAfterGap?.length > 0 && (
          <>
            <span>{'...'}</span>
            {arrAfterGap.map(mapper)}
          </>
        )}
        {currentPage < pagesCount && (
          <li>
            <Link href={`/posts/${currentPage + 1}`}>{'next'}</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
