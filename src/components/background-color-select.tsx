"use client";

import { BackgroundColor } from "@/types";
import { useEffect, useState } from "react";

type BackgroundColorSelectProps = {
  defaultColor: BackgroundColor;
  onChange: (color: BackgroundColor) => void;
};

const defaultColorValue = "#ffffff";

export default function BackgroundColorSelect({
  defaultColor,
  onChange,
}: BackgroundColorSelectProps) {
  const [transparent, setTransparent] = useState<boolean>(true);
  const [color, setColor] = useState<BackgroundColor>(defaultColorValue);

  useEffect(() => {
    onChange(!transparent ? color : BackgroundColor.Transparent);
  }, [color, transparent, onChange]);

  return (
    <div className="flex flex-row items-center gap-2 text-gray-500 text-sm">
      <span>Preview background:</span>
      <input
        id="bgcolor"
        name="bgcolor"
        type="color"
        defaultValue={defaultColorValue}
        onBlur={(event) => setColor(event.target.value as BackgroundColor)}
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
  );
}
