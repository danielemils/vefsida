import ScrollingFeed from "@/app/components/feed/ScrollingFeed";
import UserInfo from "@/app/components/user/UserInfo";
import { getUserById } from "@/app/utils/database";
import { redirect } from "next/navigation";

const UserProfile = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const user = await getUserById(slug);

  if (!user) redirect("/");

  return (
    <div className="flex flex-col gap-4">
      <UserInfo user={user} large />
      <ScrollingFeed userId={user?.id} />
    </div>
  );
};

export default UserProfile;
