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
