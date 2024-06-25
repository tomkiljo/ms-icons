import fs from "fs";
import path from "path";
import { IconCollection } from "@/types";

const publicRootPath = path.join(__dirname, "..", "public");
const iconsRootPath = path.join(publicRootPath, "icons");
const indexFile = path.join(iconsRootPath, "index.json");

function findSvgs(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.lstatSync(filePath);

    if (fileStat.isDirectory()) {
      findSvgs(filePath, fileList);
    } else if (path.extname(file) === ".svg") {
      fileList.push(filePath);
    }
  });

  return fileList;
}

const runAsync = async () => {
  const collections: IconCollection[] = [];

  /// Azure architecture icons

  const azureRootPath = path.join(iconsRootPath, "Azure_Public_Service_Icons");
  const azureIconFiles = findSvgs(azureRootPath);
  const azureIcons = azureIconFiles.map((iconFile) => {
    const iconCategory = path
      .basename(path.dirname(iconFile))
      .replaceAll(/(\b[a-z](?!\s))/g, (x) => x.toUpperCase());
    const iconName = path
      .basename(iconFile, ".svg")
      .replace(/^\d+-icon-service-/, "")
      .replaceAll(/[-_]/g, " ")
      .replaceAll(/((?<![().,+-_])[A-Z0-9]+)/g, " $1")
      .trim();
    const iconUrl = path.relative(publicRootPath, iconFile);
    return {
      collection: "Azure Icons",
      category: iconCategory,
      name: iconName,
      url: iconUrl,
    };
  });

  collections.push({
    name: "Azure Icons",
    icons: azureIcons,
    documentation: [
      {
        name: "Azure architecture icons",
        url: "https://learn.microsoft.com/en-us/azure/architecture/icons",
      },
    ],
  });

  /// Microsoft Power Platform icons

  const powerPlatformRootPath = path.join(
    iconsRootPath,
    "Power_Platform_scalable"
  );
  const powerPlarformIconFiles = findSvgs(powerPlatformRootPath);
  const powerPlarformIcons = powerPlarformIconFiles.map((iconFile) => {
    const iconName = path
      .basename(iconFile, ".svg")
      .replace(/_scalable$/, "")
      .replaceAll(/[-_]/g, " ")
      .replaceAll(/((?<![().,+-_])[A-Z0-9]+)/g, " $1")
      .trim();
    const iconUrl = path.relative(publicRootPath, iconFile);
    return {
      collection: "Power Platform Icons",
      category: "General",
      name: iconName,
      url: iconUrl,
    };
  });

  collections.push({
    name: "Power Platform Icons",
    icons: powerPlarformIcons,
    documentation: [
      {
        name: "Microsoft Power Platform icons",
        url: "https://learn.microsoft.com/en-us/power-platform/guidance/icons",
      },
    ],
  });

  /// Microsoft Dynamics 365 icons

  const dynamicsRootPath = path.join(
    iconsRootPath,
    "Dynamics_365_Icons_scalable"
  );
  const dynamicsIconFiles = findSvgs(dynamicsRootPath);
  const dynamicsIcons = dynamicsIconFiles.map((iconFile) => {
    const iconCategory = path
      .basename(path.dirname(iconFile))
      .replace(/Dynamics 365/, "")
      .replace(/Icons/, "")
      .trim();
    const iconName = path
      .basename(iconFile, ".svg")
      .replace(/_scalable$/, "")
      .replaceAll(/[-_]/g, " ")
      .replaceAll(/((?<![().,+-_])[A-Z0-9]+)/g, " $1")
      .trim();
    const iconUrl = path.relative(publicRootPath, iconFile);
    return {
      collection: "Dynamics 365 Icons",
      category: iconCategory,
      name: iconName,
      url: iconUrl,
    };
  });

  collections.push({
    name: "Dynamics 365 Icons",
    icons: dynamicsIcons,
    documentation: [
      {
        name: "Microsoft Dynamics 365 icons",
        url: "https://learn.microsoft.com/en-us/dynamics365/get-started/icon",
      },
    ],
  });

  /// Microsoft 365 icons

  const microsoftRootPath = path.join(
    iconsRootPath,
    "Microsoft_365_Content_Icons"
  );

  const microsoftIconFiles = findSvgs(microsoftRootPath);
  const microsoftIcons = microsoftIconFiles.map((iconFile) => {
    const iconCategory =
      path
        .basename(
          path.dirname(path.relative(microsoftRootPath, path.dirname(iconFile)))
        )
        .trim() +
      " > " +
      path
        .basename(path.relative(microsoftRootPath, path.dirname(iconFile)))
        .replaceAll(/48x48\s+(SVG Icons?)?/gi, "")
        .replaceAll(/Icons?$/gi, "")
        .trim();
    const iconName = path
      .basename(iconFile, ".svg")
      .replace(/_scalable$/, "")
      .replaceAll(/[-_]/g, " ")
      .replaceAll(/((?<![().,+-_])[A-Z0-9]+)/g, " $1")
      .trim();
    const iconUrl = path.relative(publicRootPath, iconFile);
    return {
      collection: "Microsoft 365 Icons",
      category: iconCategory,
      name: iconName,
      url: iconUrl,
    };
  });

  collections.push({
    name: "Microsoft 365 Icons",
    icons: microsoftIcons,
    documentation: [
      {
        name: "Microsoft 365 architecture templates and icons",
        url: "https://learn.microsoft.com/en-us/microsoft-365/solutions/architecture-icons-templates",
      },
    ],
  });

  const indexJson = JSON.stringify(collections, null, 2);
  fs.writeFileSync(indexFile, indexJson, "utf-8");
};

(async () => {
  await runAsync();
})().catch((err) => {
  console.error(err);
  throw err;
});
