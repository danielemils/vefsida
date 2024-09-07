import { PostIF } from "@/app/models/Post";
import PostContainer from "@/comps/feed/PostContainer";

const FeedContainer = ({ posts }: Readonly<{ posts: PostIF[] }>) => {
  return (
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
      {posts.map((post, index) => (
        <PostContainer key={`${post.id}_${index}`} post={post} />
      ))}
    </div>
  );
};

export default FeedContainer;
