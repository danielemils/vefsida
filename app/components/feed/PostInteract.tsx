"use client";

import { PostIF } from "@/app/models/Post";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
} from "@nextui-org/modal";
import PostDetails from "@/comps/post/PostDetails";

const PostInteract = ({ post }: Readonly<{ post: PostIF }>) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="absolute inset-0 hover:cursor-pointer" onClick={onOpen} />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        hideCloseButton
        className="max-w-3xl py-4"
      >
        <ModalContent>
          <ModalBody>
            <PostDetails post={post} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostInteract;
