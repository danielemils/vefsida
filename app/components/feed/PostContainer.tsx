import { PostIF } from "@/app/models/Post";
import Image from "next/image";
import PostInteract from "@/comps/feed/PostInteract";

const PostContainer = ({ post }: Readonly<{ post: PostIF }>) => {
  return (
    <div className="h-[30vw] sm:h-[15vw] relative rounded-lg overflow-hidden transition-all hover:rounded-3xl hover:scale-95 after:pointer-events-none after:size-full after:transition-all after:absolute after:inset-0 after:hover:bg-black/15">
      <Image
        src={post.imageURL}
        alt={post.description}
        fill
        className="object-cover"
        sizes="(min-width: 640px) 15vw, 30vw"
      />
      <PostInteract post={post} />
    </div>
  );
};

export default PostContainer;
