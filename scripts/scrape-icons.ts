import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const publicRootPath = path.join(__dirname, "..", "public");
const iconsRootPath = path.join(publicRootPath, "icons");

async function runAsync() {
  /// Azure icons

  const uxPatternsRootPath = path.join(
    iconsRootPath,
    "Azure_UX_Patterns_icons"
  );
  if (!fs.existsSync(uxPatternsRootPath)) {
    fs.mkdirSync(uxPatternsRootPath);
  }

  const uxPatternsWebUrl = new URL(
    "https://azure.microsoft.com/en-gb/patterns/styles/glyphs-icons/"
  );
  const uxPatternsWebContent = await (await fetch(uxPatternsWebUrl)).text();
  const uxPatternsMatches = uxPatternsWebContent.matchAll(
    /<a class="swatch" href="([^"]+)"/g
  );

  let scraped = 0;
  let skipped = 0;
  let errors: { [status: number]: number } = {};

  for (const match of uxPatternsMatches) {
    const iconUrl = new URL(match[1], uxPatternsWebUrl);
    const iconName = path.basename(iconUrl.pathname, ".svg");
    const iconPath = path.join(uxPatternsRootPath, `${iconName}.svg`);

    // only download if it doesn't exist
    if (!fs.existsSync(iconPath)) {
      const response = await fetch(iconUrl);
      // icon might be missing or other errors
      if (response.status !== 200) {
        console.log(`failed: ${iconUrl.href} - ${response.status}`);
        errors[response.status] = (errors[response.status] || 0) + 1;
        continue;
      }
      console.log(`scraping: ${iconUrl.href}`);
      const iconContent = await response.text();
      fs.writeFileSync(iconPath, iconContent);
      scraped++;
    } else {
      console.log(`skipping: ${iconUrl.href}`);
      skipped++;
    }
  }

  const notFoundErrors = errors[404] || 0;
  const otherErrors = Object.entries(errors).reduce(
    (total, [code, count]) => total + (code !== "404" ? count : 0),
    0
  );

  console.log(
    `\nScraped ${scraped} icons, skipped ${skipped} icons, not found ${notFoundErrors}, other errors ${otherErrors} from '${uxPatternsWebUrl}'`
  );
}

(async () => {
  await runAsync();
})().catch((err) => {
  console.error(err);
  throw err;
});
