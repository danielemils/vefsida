import { PostIF } from "@/app/models/Post";
import Image from "next/image";
import { User } from "@nextui-org/user";
import { Divider } from "@nextui-org/divider";

const PostDetails = ({ post }: { post: PostIF }) => {
  if (!post) return;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
      <div className="h-[50vh] md:h-[70vh] relative rounded-lg overflow-hidden bg-foreground-900">
        <Image
          src={post.imageURL}
          alt={post.description}
          fill
          className="object-contain w-full h-full"
          sizes="(min-width: 640px) 30vw, 90vw"
        />
      </div>
      <div className="flex flex-col gap-4 text-center">
        <User
          name={post.owner.username || undefined}
          description={post.owner.email || undefined}
          avatarProps={{
            src: post.owner.image || undefined,
            ImgComponent: Image,
            imgProps: { width: 64, height: 64, className: "object-cover" }
          }}
          className="self-start"
        />
        <Divider />
        <p>{post.description}</p>
      </div>
    </div>
  );
};

export default PostDetails;
