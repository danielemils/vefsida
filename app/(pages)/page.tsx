import ScrollingFeed from "@/comps/feed/ScrollingFeed";
import FeedContainer from "@/comps/feed/FeedContainer";
import { ROW_LENGTH, INIT_FEED_ROWS } from "@/app/const/feedOptions";
import { getPostsWithCursor } from "@/app/utils/database";

const Home = async () => {
  const initPosts = await getPostsWithCursor(ROW_LENGTH * INIT_FEED_ROWS);
  
  // dev
  if (process.env.DATA_SAVER === "true") {
    if (initPosts) initPosts.nextCursor = undefined;
  }

  return (
    <section className="rounded-xl overflow-hidden">
      {initPosts && (
        <>
          <FeedContainer posts={initPosts.posts} />
          {initPosts.nextCursor && (
            <ScrollingFeed initCursorId={initPosts.nextCursor} />
          )}
        </>
      )}
    </section>
  );
};

export default Home;
