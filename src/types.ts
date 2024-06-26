export type IconCollection = {
  name: string;
  icons: IconData[];
  documentation: {
    name: string;
    url: string;
  }[];
};

export type IconData = {
  name: string;
  url: string;
  category: string;
  collection: string;
};

export const ImageFormat = {
  PNG: "png",
  SVG: "svg",
} as const;
export type ImageFormat = (typeof ImageFormat)[keyof typeof ImageFormat];

export const ImageSize = {
  "16": 16,
  "32": 32,
  "48": 48,
  "64": 64,
  "96": 96,
} as const;
export type ImageSize = (typeof ImageSize)[keyof typeof ImageSize];

export type HtmlColor = `#${string}`;

export const BackgroundColor = {
  Transparent: "transparent",
} as const;
export type BackgroundColor =
  | (typeof BackgroundColor)[keyof typeof BackgroundColor]
  | HtmlColor;
