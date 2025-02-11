import { avatarProps } from "@/app/const/nextUIProps";
import { UserIF } from "@/app/models/User";
import { User } from "@heroui/user";
import { Avatar } from "@heroui/avatar";
import Link from "next/link";
import { getProfileURL } from "@/app/utils/user";

const UserInfo = ({
  user,
  linkToProfile,
  large,
}: {
  user?: UserIF;
  linkToProfile?: boolean;
  large?: boolean;
}) => {
  const userComponent = large ? (
    <div className="flex flex-col gap-4 text-2xl">
      <Avatar
        {...avatarProps}
        name={user?.username || undefined}
        src={user?.image || undefined}
        className="w-16 h-16"
      />
      {user?.username}
    </div>
  ) : (
    <User
      name={user?.username}
      description={user?.email}
      avatarProps={{
        ...avatarProps,
        src: user?.image,
      }}
      className="self-start"
    />
  );

  return (
    <>
      {linkToProfile ? (
        <Link
          href={getProfileURL(user?.id)}
          aria-label={`Visit ${user?.username}'s profile`}
        >
          {userComponent}
        </Link>
      ) : (
        userComponent
      )}
    </>
  );
};

export default UserInfo;
