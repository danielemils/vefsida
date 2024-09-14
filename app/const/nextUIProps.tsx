import Image from "next/image";
import { AvatarProps } from "@nextui-org/avatar";

export const avatarProps = {
  isBordered: true,
  color: "primary" as AvatarProps["color"],
  showFallback: true,
  className: "mr-1 w-[38px] h-[38px]",
  ImgComponent: Image,
  imgProps: { width: 38, height: 38, className: "object-cover", sizes: "38px" },
};
