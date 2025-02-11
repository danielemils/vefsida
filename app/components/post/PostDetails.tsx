import { PostIF } from "@/app/models/Post";
import Image from "next/image";
import { Divider } from "@heroui/divider";
import PostOptions from "@/comps/post/PostOptions";
import UserInfo from "@/comps/user/UserInfo";
import Link from "next/link";

const PostDetails = ({
  post,
  onClose,
}: {
  post: PostIF;
  onClose?: () => void;
}) => {
  if (!post) return;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
      <div className="h-[50vh] md:h-[70vh] relative rounded-lg overflow-hidden bg-black">
        <Image
          src={post.imageURL || "/img/alt_img.png"}
          alt={post.description || "Image"}
          fill
          className="object-contain w-full h-full"
          sizes="(min-width: 640px) 30vw, 90vw"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <UserInfo user={post.owner} linkToProfile />
          <PostOptions post={post} onClose={onClose} />
        </div>
        <Divider />
        <p>{post.description}</p>
        <Divider />
        {/* <p className="text-sm text-primary-500">
          {post.tags?.map((tag) => `#${tag} `)}
        </p> */}
        <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
          {post.tags?.length === 0 ? (
            <p className="text-sm text-foreground-500">No hashtags</p>
          ) : (
            post.tags?.map((tag) => (
              <Link
                key={`${tag}`}
                href={`/tag/${tag}`}
                className="text-sm text-primary-500"
              >
                #{tag}
              </Link>
            ))
          )}
        </div>
        <Divider />
      </div>
    </div>
  );
};

export default PostDetails;
