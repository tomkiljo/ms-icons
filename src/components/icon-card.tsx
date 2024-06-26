"use client";

import NextImage from "next/image";
import { BackgroundColor, IconData, ImageFormat, ImageSize } from "@/types";

type IconProps = {
  data: IconData;
  format: ImageFormat;
  size: ImageSize;
  backgroundColor: BackgroundColor;
};

export default function IconCard({
  data,
  format,
  size,
  backgroundColor,
}: IconProps) {
  return (
    <div className="flex flex-col self-start justify-center text-center">
      <div
        className="bg-checkered p-4 mx-auto"
        style={
          backgroundColor !== BackgroundColor.Transparent
            ? { background: backgroundColor }
            : undefined
        }
      >
        <NextImage
          src={data.url}
          alt={data.name}
          width={size}
          height={size}
          loading="lazy"
        />
      </div>
      <p className="text-sm text-gray-500">{data.name}</p>
      <p className="text-sm font-light text-gray-500">{data.category}</p>
      <p className="text-sm font-light text-gray-500">{data.collection}</p>
    </div>
  );
}
