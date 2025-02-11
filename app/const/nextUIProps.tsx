import Image from "next/image";
import { AvatarProps } from "@heroui/avatar";

export const avatarProps = {
  isBordered: true,
  color: "primary" as AvatarProps["color"],
  // showFallback: true,
  className: "mr-1",
  ImgComponent: Image,
  imgProps: {
    width: 128,
    height: 128,
    className: "object-cover",
    sizes: "(max-width: 768px) 20vw, (max-width: 1200px) 15vw, 10vw",
  },
};
