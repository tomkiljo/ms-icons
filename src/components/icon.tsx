import Image from "next/image";
import { IconData } from "@/types";

type IconProps = {
  data: IconData;
  width: number | `${number}`;
  height: number | `${number}`;
  backgroundColor?: string;
};

export default function Icon({
  data,
  width,
  height,
  backgroundColor,
}: IconProps) {
  return (
    <div className="flex flex-col self-start justify-center text-center">
      <div
        className="bg-checkered p-4 mx-auto"
        style={backgroundColor ? { background: backgroundColor } : undefined}
      >
        <Image
          src={data.url}
          alt={data.name}
          width={width}
          height={height}
          loading="lazy"
        />
      </div>
      <p className="text-sm text-gray-500">{data.name}</p>
      <p className="text-sm font-light text-gray-500">{data.category}</p>
      <p className="text-sm font-light text-gray-500">{data.collection}</p>
    </div>
  );
}
