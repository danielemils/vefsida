"use client";

import { ROW_LENGTH, FETCH_NUM_ROWS } from "@/app/const/feedOptions";
import FeedContainer from "@/comps/feed/FeedContainer";
import { useInView } from "react-intersection-observer";
import Loading from "@/comps/Loading";
import { PostsWithCursorIF } from "@/app/utils/database";
import useSWRInfinite from "swr/infinite";
import { FeedProvider } from "@/comps/feed/FeedContext";

const fetcher = async (url: string): Promise<PostsWithCursorIF> =>
  fetch(url).then((r) => r.json());

const ScrollingFeed = ({ userId, tag }: { userId?: string; tag?: string }) => {
  const getKey = (pageIndex: number, previousPageData: PostsWithCursorIF) => {
    // reached the end
    if (previousPageData && !previousPageData.nextCursor) return null;

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) {
      return `/api/posts?count=${ROW_LENGTH * FETCH_NUM_ROWS}${
        userId ? `&userId=${userId}` : ""
      }${tag ? `&tag=${tag}` : ""}`;
    }

    // add the cursor to the API endpoint
    return `/api/posts?count=${ROW_LENGTH * FETCH_NUM_ROWS}&cursor=${
      previousPageData.nextCursor
    }${userId ? `&userId=${userId}` : ""}${tag ? `&tag=${tag}` : ""}`;
  };

  const { data, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite(getKey, fetcher, {
      // revalidateAll: true,
      // refreshInterval: 60_000,
    });

  const { ref } = useInView({
    onChange: (inView) =>
      inView && !reachedEnd && !isLoading && setSize(size + 1),
    rootMargin: "20%",
  });

  const posts = data ? data.flatMap((pwc) => pwc.posts) : [];
  const reachedEnd = data ? !!!data?.at(-1)?.nextCursor : false;

  return (
    <div className="rounded-xl overflow-hidden">
      <FeedProvider mutate={mutate}>
        <FeedContainer posts={posts} />
      </FeedProvider>
      {!reachedEnd && !isLoading && !isValidating && <div ref={ref} />}
      {(isLoading || isValidating) && <Loading />}
    </div>
  );
};

export default ScrollingFeed;
