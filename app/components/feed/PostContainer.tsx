import { PostIF } from "@/app/models/Post";
import Image from "next/image";

const PostContainer = ({ post }: Readonly<{ post: PostIF }>) => {
  return (
    <div className="h-[25vw] relative">
      <Image
        src={post.imageURL}
        alt={post.description}
        fill
        className="object-cover"
        sizes="33vw"
      />
    </div>
  );
};

export default PostContainer;
