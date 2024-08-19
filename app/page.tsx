import InitialFeed from "@/comps/feed/InitialFeed";
import ScrollingFeed from "@/comps/feed/ScrollingFeed";
import { ROW_LENGTH, INIT_FEED_ROWS } from "@/app/const/feedOptions";
import { getPostsWithCursor } from "@/app/utils/database";

const Home = async () => {
  const initPosts = await getPostsWithCursor(ROW_LENGTH * INIT_FEED_ROWS);
  const lastId = initPosts?.at(-1)?.id;

  return (
    <main className="py-10 max-w-full text-center">
      <h1>SomeOtherStuff</h1>
      <InitialFeed posts={initPosts} />
      {lastId && <ScrollingFeed initCursorId={lastId} />}
    </main>
  );
};

export default Home;
