import { ImageFormat, ImageSize } from "@/types";

type ImageSizeSelectProps = {
  defaultSize: ImageSize;
  onChange: (size: ImageSize) => void;
};

export default function ImageSizeSelect({
  defaultSize,
  onChange,
}: ImageSizeSelectProps) {
  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as unknown as ImageSize);
  };

  return (
    <div className="flex flex-row gap-1" onChange={handleSelect}>
      <span className="text-gray-500 text-sm mr-1">Size:</span>
      {Object.values(ImageSize).map((size) => (
        <label key={`img-size-${size}`}>
          <input
            id={`img-size-${size}`}
            type="radio"
            name="img-size"
            value={size}
            className="hidden pointer-events-none peer"
            autoComplete="off"
            defaultChecked={size === defaultSize}
          />
          <div
            role="button"
            className="px-2 py-1 rounded-md font-mono font-bold text-xs uppercase bg-gray-200 peer-checked:bg-blue-400 peer-checked:text-white"
          >
            {size}
          </div>
        </label>
      ))}
    </div>
  );
}
