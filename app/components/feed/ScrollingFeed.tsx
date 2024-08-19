"use client";

import { useEffect, useState } from "react";
import { PostsGetResponse } from "@/app/api/posts/route";
import { ROW_LENGTH } from "@/app/const/feedOptions";
import FeedContainer from "@/comps/feed/FeedContainer";
import PostContainer from "./PostContainer";
import { PostIF } from "@/app/models/Post";
import { useInView } from "react-intersection-observer";

const ScrollingFeed = ({ initCursorId }: { initCursorId: string }) => {
  const [posts, setPosts] = useState<PostIF[]>([]);
  const [cursorId, setCursorId] = useState(initCursorId);
  const [loading, setLoading] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView]);

  useEffect(() => {
    setCursorId(initCursorId);
  }, [initCursorId]);

  const loadMorePosts = async () => {
    setLoading(true);

    const res = await fetch(`/api/posts?count=${ROW_LENGTH}&id=${cursorId}`);
    const resData: PostsGetResponse = await res.json();

    if (resData.posts.length < ROW_LENGTH) {
      setReachedEnd(true);
    }

    setCursorId((curr) => resData?.posts?.at(-1)?.id ?? curr);
    setPosts((curr) => [...curr, ...resData?.posts]);

    setLoading(false);
  };

  return (
    <div>
      <FeedContainer>
        {posts.map((post, index) => (
          <PostContainer key={`${post.id}_${index}`} post={post} />
        ))}
      </FeedContainer>
      {!reachedEnd && (
        // <button
        //   disabled={loading}
        //   onClick={loadMorePosts}
        //   style={{ marginTop: 20 }}
        // >
        //   Load More Images
        // </button>
        <div ref={ref}></div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ScrollingFeed;
