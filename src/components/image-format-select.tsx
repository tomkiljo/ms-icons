import { ImageFormat } from "@/types";

type ImageFormatSelectProps = {
  defaultFormat: ImageFormat;
  onChange: (format: ImageFormat) => void;
};

export default function ImageFormatSelect({
  defaultFormat,
  onChange,
}: ImageFormatSelectProps) {
  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as ImageFormat);
  };

  return (
    <div className="flex flex-row gap-1" onChange={handleSelect}>
      <span className="text-gray-500 text-sm mr-1">Format:</span>
      {Object.values(ImageFormat).map((format) => (
        <label key={`img-format-${format}`}>
          <input
            id={`img-format-${format}`}
            type="radio"
            name="img-format"
            value={format}
            className="hidden pointer-events-none peer"
            autoComplete="off"
            defaultChecked={format === defaultFormat}
          />
          <div
            role="button"
            className="px-2 py-1 rounded-md font-mono font-bold text-xs uppercase bg-gray-200 peer-checked:bg-blue-400 peer-checked:text-white"
          >
            {format}
          </div>
        </label>
      ))}
    </div>
  );
}
