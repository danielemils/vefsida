import { avatarProps } from "@/app/const/nextUIProps";
import { UserIF } from "@/app/models/User";
import { User } from "@heroui/user";
import Link from "next/link";

const UserInfo = ({ user }: { user?: UserIF }) => {
  return (
    <Link href={`/u/${user?.id}`}>
      <User
        name={user?.username}
        description={user?.email}
        avatarProps={{
          ...avatarProps,
          src: user?.image,
        }}
        className="self-start"
      />
    </Link>
  );
};

export default UserInfo;
