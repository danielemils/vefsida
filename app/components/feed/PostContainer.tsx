import { PostIF } from "@/app/models/Post";
import Image from "next/image";
import PostInteract from "@/comps/feed/PostInteract";

const PostContainer = ({ post }: Readonly<{ post: PostIF }>) => {
  return (
    <div className="h-[30vw] sm:h-[15vw] relative bg-foreground-500 overflow-hidden group transition-all hover:rounded-3xl after:pointer-events-none after:size-full after:transition-all after:absolute after:inset-0 after:hover:bg-black/15">
      <Image
        src={post.imageURL || "/img/alt_img.png"}
        alt={post.description || "Image"}
        fill
        className="object-cover transition-all group-hover:scale-105"
        sizes="(min-width: 640px) 20vw, 40vw"
      />
      <PostInteract post={post} />
    </div>
  );
};

export default PostContainer;
