import { ImageFormat, ImageSize } from "@/types";

export async function copyToClipboard(
  svgUrl: string,
  format: ImageFormat,
  size: ImageSize
) {
  const dataUrl = await createDataUrlFromSvg(svgUrl, format, size);
  const response = await fetch(dataUrl);
  switch (format) {
    case ImageFormat.SVG:
      const text = await response.text();
      navigator.clipboard.writeText(text);
      break;
    case ImageFormat.PNG:
      const blob = await response.blob();
      navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}

export async function createDataUrlFromSvg(
  svgUrl: string,
  format: ImageFormat,
  size: ImageSize
) {
  const response = await fetch(svgUrl);
  const original = await response.text();
  const resized = await resizeSvg(original, size);
  const encoded = URL.createObjectURL(
    new Blob([resized], { type: "image/svg+xml" })
  );

  if (format === "svg") {
    return encoded;
  } else {
    return convertSvgToPng(encoded);
  }
}

export async function resizeSvg(svgXml: string, size: number) {
  const parser = new DOMParser();
  const svgElement = parser
    .parseFromString(svgXml, "image/svg+xml")
    .querySelector("svg");

  svgElement!.setAttribute("width", `${size}px`);
  svgElement!.setAttribute("height", `${size}px`);

  const modifiedSvg = new XMLSerializer().serializeToString(svgElement!);
  return modifiedSvg;
}

export async function convertSvgToPng(svgXml: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d")!;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = reject;
    image.src = svgXml;
  });
}
