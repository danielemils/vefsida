import { PostIF } from "@/app/models/Post";
import Image from "next/image";
import { User } from "@nextui-org/user";
import { Divider } from "@nextui-org/divider";
import { avatarProps } from "@/app/const/nextUIProps";

const PostDetails = ({ post }: { post: PostIF }) => {
  if (!post) return;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
      <div className="h-[50vh] md:h-[70vh] relative rounded-lg overflow-hidden bg-black">
        <Image
          src={post.imageURL}
          alt={post.description || "Image"}
          fill
          className="object-contain w-full h-full"
          sizes="(min-width: 640px) 30vw, 90vw"
        />
      </div>
      <div className="flex flex-col gap-4">
        <User
          name={post.owner.username}
          description={post.owner.email}
          avatarProps={{
            ...avatarProps,
            src: post.owner.image,
          }}
          className="self-start"
        />
        <Divider />
        <p>{post.description}</p>
        <Divider />
        <p className="text-sm text-primary-500">
          {post.tags?.map((tag) => `#${tag} `)}
        </p>
      </div>
    </div>
  );
};

export default PostDetails;
