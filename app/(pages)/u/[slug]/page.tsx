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

  return <UserInfo user={user} />;
};

export default UserProfile;
