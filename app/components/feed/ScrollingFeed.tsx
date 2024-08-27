"use client";

import { useCallback, useEffect } from "react";
import { ROW_LENGTH, FETCH_NUM_ROWS } from "@/app/const/feedOptions";
import FeedContainer from "@/comps/feed/FeedContainer";
import { useInView } from "react-intersection-observer";
import Loading from "@/comps/Loading";
import { PostsWithCursorIF } from "@/app/utils/database";
import useSWRInfinite from "swr/infinite";

const fetcher = async (url: string): Promise<PostsWithCursorIF> =>
  fetch(url).then((r) => r.json());

const ScrollingFeed = ({ initCursorId }: { initCursorId: string }) => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: PostsWithCursorIF) => {
      // reached the end
      if (previousPageData && !previousPageData.nextCursor) return null;

      // first page, we don't have `previousPageData`
      if (pageIndex === 0)
        return `/api/posts?count=${
          ROW_LENGTH * FETCH_NUM_ROWS
        }&cursor=${initCursorId}`;

      // add the cursor to the API endpoint
      return `/api/posts?count=${ROW_LENGTH * FETCH_NUM_ROWS}&cursor=${
        previousPageData.nextCursor
      }`;
    },
    [initCursorId]
  );

  const { data, size, setSize, isLoading, mutate } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateFirstPage: false,
    }
  );

  const posts = data ? data.flatMap((pwc) => pwc.posts) : [];
  const reachedEnd = data ? !!!data?.at(-1)?.nextCursor : false;

  useEffect(() => {
    if (reachedEnd) {
      mutate(data, {
        revalidate: (data) => !!!data?.nextCursor,
      });
    }
  }, [reachedEnd, data, size, mutate]);

  const { ref } = useInView({
    onChange: (inView) =>
      inView && !reachedEnd && !isLoading && setSize(size + 1),
    rootMargin: "50%",
  });

  return (
    <div>
      <FeedContainer posts={posts} />
      {!reachedEnd && !isLoading && <div ref={ref} />}
      {isLoading && <Loading />}
    </div>
  );
};

export default ScrollingFeed;
