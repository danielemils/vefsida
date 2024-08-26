"use client";

import { useState, useRef } from "react";
import { PostsGetResponse } from "@/app/api/posts/route";
import { ROW_LENGTH, FETCH_NUM_ROWS } from "@/app/const/feedOptions";
import FeedContainer from "@/comps/feed/FeedContainer";
import { PostIF } from "@/app/models/Post";
import { useInView } from "react-intersection-observer";
import Loading from "@/comps/Loading";

const ScrollingFeed = ({ initCursorId }: { initCursorId: string }) => {
  const [posts, setPosts] = useState<PostIF[]>([]);
  const [reachedEnd, setReachedEnd] = useState(false);

  const loading = useRef(false);

  const { ref } = useInView({
    onChange: (inView) => inView && loadMorePosts(),
    rootMargin: "50%",
  });

  // TODO: https://swr.vercel.app/docs/pagination#useswrinfinite
  const loadMorePosts = async () => {
    if (loading.current || reachedEnd) return;

    loading.current = true;

    try {
      const cursorId = posts?.at(-1)?.id || initCursorId;
      const res = await fetch(
        `/api/posts?count=${ROW_LENGTH * FETCH_NUM_ROWS}&id=${cursorId}`
      );
      const resData: PostsGetResponse = await res.json();

      if (resData.posts.length < ROW_LENGTH) {
        setReachedEnd(true);
      }

      setPosts((curr) => [...curr, ...resData?.posts]);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      loading.current = false;
    }
  };

  return (
    <div>
      <FeedContainer posts={posts} />
      {!reachedEnd && (
        <div ref={ref}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ScrollingFeed;
