"use client";

import { useEffect, useState } from "react";
import { BackgroundColor, IconData, ImageFormat, ImageSize } from "@/types";
import IconCard from "./icon-card";
import ImageFormatSelect from "./image-format-select";
import ImageSizeSelect from "./image-size-select";
import BackgroundColorSelect from "./background-color-select";
import Search from "./search";

type GridProps = {
  icons: IconData[];
};

const defaultColor = BackgroundColor.Transparent;
const defaultFormat = ImageFormat.SVG;
const defaultSize = ImageSize["64"];

export default function Grid({ icons }: GridProps) {
  const [filter, setFilter] = useState<string>("");
  const [filtered, setFiltered] = useState<IconData[]>(icons);
  const [backgroundColor, setBackgroundColor] =
    useState<BackgroundColor>(defaultColor);
  const [format, setFormat] = useState<ImageFormat>(defaultFormat);
  const [size, setSize] = useState<ImageSize>(defaultSize);

  useEffect(() => {
    const search = filter.toLowerCase().trim();
    if (search.length === 0) {
      setFiltered(icons);
      return;
    }
    setFiltered(
      icons.filter((icon) => {
        const name = icon.name.toLowerCase();
        const category = icon.category.toLowerCase();
        const collection = icon.collection.toLowerCase();

        return (
          name.includes(search) ||
          category.includes(search) ||
          collection.includes(search)
        );
      })
    );
  }, [filter, icons]);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-2">
        <Search onChange={setFilter} />
        <div className="flex flex-row flex-wrap gap-4 items-center">
          <div className="text-gray-500 text-sm">Count: {filtered.length}</div>
          <BackgroundColorSelect
            defaultColor={defaultColor}
            onChange={setBackgroundColor}
          />
        </div>
        <div className="flex flex-row flex-wrap gap-4 items-center">
          <ImageFormatSelect
            defaultFormat={defaultFormat}
            onChange={setFormat}
          />
          <ImageSizeSelect defaultSize={defaultSize} onChange={setSize} />
        </div>
      </div>
      <div className="grid grid-cols-auto gap-4">
        {filtered.map((icon) => (
          <IconCard
            key={icon.url}
            data={icon}
            format={format}
            size={size}
            backgroundColor={backgroundColor}
          />
        ))}
      </div>
    </div>
  );
}
