import { PostIF } from "@/app/models/Post";
import PostContainer from "@/comps/feed/PostContainer";

const FeedContainer = ({ posts }: { posts: PostIF[] }) => {
  return (
    <div className="flex justify-center mt-2">
      <div className="w-[50vw] grid grid-cols-4 gap-2">
        {posts.map((post, index) => (
          <PostContainer key={`${post.id}_${index}`} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeedContainer;
