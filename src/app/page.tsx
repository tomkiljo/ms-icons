import { promises as fs } from "fs";
import path from "path";
import type { IconCollection } from "@/types";

import Grid from "@/components/grid";
import ExternalLinkIcon from "@/icons/externallink";

async function loadCollections() {
  const data = await fs.readFile(
    path.join(process.cwd(), "public", "icons", "index.json"),
    "utf-8"
  );
  return JSON.parse(data) as IconCollection[];
}

export default async function Home() {
  const collections = await loadCollections();
  const icons = collections.flatMap((collection) => collection.icons);

  return (
    <main className="flex justify-center">
      <div className="mx-8 my-12 w-full max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center">
            Microsoft Icon Collections
          </h1>
          <h2 className="text-1xl text-center text-gray-500">
            Browse through icon collections for Azure, Power Platform, Dynamics
            365 and Microsoft 365
          </h2>
          <div className="mt-8 p-2 rounded-md bg-blue-100 flex flex-col gap-2">
            <p className="text-sm text-center text-gray-500">
              The icons displayed on this website are the property of Microsoft
              Corporation. The author of this website does not claim any rights
              to these icons. The icons are created and copyrighted by Microsoft
              Corporation. The purpose of this gallery is solely to showcase the
              icons in a user-friendly manner.
            </p>
            <p className="text-sm text-center text-gray-500">
              All icons are in their original SVG format in witch they were
              extracted from the collection archives. Get the original
              collection archives and see do&apos;s, dont&apos;s, and terms of
              use by visiting the official documentation.
            </p>
            <div className="flex flex-row flex-wrap justify-center text-xs text-center font-bold">
              {collections.map((collection) =>
                collection.documentation.flatMap((doc) => (
                  <a
                    key={doc.url}
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center px-1 text-blue-400 hover:text-blue-500"
                  >
                    {doc.name}
                    <ExternalLinkIcon className="inline w-4 h-4 ml-1" />
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
        <Grid icons={icons} />
      </div>
    </main>
  );
}
