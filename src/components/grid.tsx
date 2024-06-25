"use client";

import { useEffect, useState } from "react";
import { IconData } from "@/types";
import Icon from "./icon";

type GridProps = {
  icons: IconData[];
};

const defaultColor = "#ffffff";

export default function Grid({ icons }: GridProps) {
  const [filter, setFilter] = useState<string>("");
  const [filtered, setFiltered] = useState<IconData[]>(icons);
  const [transparent, setTransparent] = useState<boolean>(true);
  const [color, setColor] = useState<string>(defaultColor);

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
        <div>
          <input
            type="text"
            value={filter ?? ""}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Filter icons..."
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-row items-center gap-2 text-gray-500 text-sm">
          <span>Preview background:</span>
          <input
            id="bgcolor"
            name="bgcolor"
            type="color"
            defaultValue={defaultColor}
            onBlur={(event) => setColor(event.target.value)}
          />
          <label htmlFor="bgcolor">Color</label>
          <input
            id="transparent"
            name="transparent"
            type="checkbox"
            checked={transparent}
            onChange={(event) => setTransparent(event.target.checked)}
          />
          <label htmlFor="transparent">Transparent</label>
        </div>
      </div>
      <div className="grid grid-cols-auto gap-4">
        {filtered.map((icon) => (
          <Icon
            key={icon.url}
            data={icon}
            width={64}
            height={64}
            backgroundColor={!transparent ? color : undefined}
          />
        ))}
      </div>
    </div>
  );
}
