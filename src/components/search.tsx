"use client";

import useDebounce from "@/hooks/debounce";
import { useEffect, useState } from "react";

type SearchProps = {
  onChange: (value: string) => void;
};

export default function Search({ onChange }: SearchProps) {
  const [value, setValue] = useState<string>("");
  const debounced = useDebounce(value, 500);

  useEffect(() => {
    onChange(debounced);
  }, [debounced, onChange]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Filter icons..."
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
}
