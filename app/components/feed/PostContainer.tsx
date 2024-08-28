import { PostIF } from "@/app/models/Post";
import Image from "next/image";

const PostContainer = ({ post }: Readonly<{ post: PostIF }>) => {
  return (
    <div className="h-[25vw] rounded-lg relative overflow-hidden transition-all hover:rounded-3xl hover:scale-95 after:size-full after:transition-all after:absolute after:inset-0 after:hover:bg-black after:hover:bg-opacity-15">
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
