import ScrollingFeed from "@/comps/feed/ScrollingFeed";
import FeedContainer from "@/comps/feed/FeedContainer";
import { ROW_LENGTH, INIT_FEED_ROWS } from "@/app/const/feedOptions";
import { getPostsWithCursor } from "@/app/utils/database";

const Home = async () => {
  const initPosts = await getPostsWithCursor(ROW_LENGTH * INIT_FEED_ROWS);

  return (
    <section className="rounded-xl overflow-hidden">
      <FeedContainer posts={initPosts.posts} />
      {initPosts.nextCursor && (
        <ScrollingFeed initCursorId={initPosts.nextCursor} />
      )}
    </section>
  );
};

export default Home;
