"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Dots } from "@/comps/icons";
import { useSession } from "next-auth/react";
import { PostIF } from "@/app/models/Post";
import { Key } from "react";
import { deletePost } from "@/app/actions";
import { useFeed } from "@/comps/feed/FeedContext";

const PostOptions = ({
  post,
  onClose,
}: {
  post: PostIF;
  onClose?: () => void;
}) => {
  const { data: session } = useSession();
  const { mutate } = useFeed();

  const handleAction = async (key: Key) => {
    if (key === "delete") {
      if (session?.user?.id && session.user.id === post.owner.id) {
        if (confirm("Are you sure you want to delete this post?")) {
          const ret = await deletePost(post);
          if (!ret.errors) {
            onClose?.();
            mutate(); //clear SWR cached feed
          }
        }
      }
    }
  };

  const disabledKeys = [];
  if (!session?.user?.id || session.user.id !== post.owner.id) {
    disabledKeys.push("delete");
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" isIconOnly size="sm">
          <Dots />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Post Actions"
        disabledKeys={disabledKeys}
        closeOnSelect
        onAction={(key) => handleAction(key)}
      >
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete post
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostOptions;
