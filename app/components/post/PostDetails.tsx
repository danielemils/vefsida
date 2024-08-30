import { PostIF } from "@/app/models/Post";
import Image from "next/image";

const PostDetails = ({ post }: { post: PostIF }) => {
  if (!post) return;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="h-[50vh] relative rounded-lg overflow-hidden">
        <Image
          src={post.imageURL}
          alt={post.description}
          fill
          className="object-cover"
          sizes="25vw"
        />
      </div>
      <div className="content-center text-center">
        <p>{post.description}</p>
      </div>
    </div>
  );
};

export default PostDetails;
