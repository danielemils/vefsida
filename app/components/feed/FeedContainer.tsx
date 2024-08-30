import { PostIF } from "@/app/models/Post";
import PostContainer from "@/comps/feed/PostContainer";

const FeedContainer = ({ posts }: Readonly<{ posts: PostIF[] }>) => {
  return (
    <div className="flex justify-center mt-2">
      <div className="w-[80vw] lg:w-[65vw] 2xl:w-[50vw] grid grid-cols-2 sm:grid-cols-4 gap-2">
        {posts.map((post, index) => (
          <PostContainer key={`${post.id}_${index}`} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeedContainer;
