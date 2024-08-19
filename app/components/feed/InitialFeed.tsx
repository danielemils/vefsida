import { PostIF } from "@/app/models/Post";
import FeedContainer from "@/comps/feed/FeedContainer";
import PostContainer from "@/comps/feed/PostContainer";

const InitialFeed = ({ posts }: { posts: PostIF[] }) => {
  return (
    <FeedContainer>
      {posts.map((post, index) => (
        <PostContainer key={`${post.id}_${index}`} post={post} />
      ))}
    </FeedContainer>
  );
};

export default InitialFeed;
