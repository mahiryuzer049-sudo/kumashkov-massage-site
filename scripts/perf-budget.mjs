import { gzipSync } from "node:zlib";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import process from "node:process";

const DIST_DIR = resolve(process.cwd(), "dist");

const BUDGET = {
  indexHtmlGzipMax: 28 * 1024,
  landingHtmlGzipMax: 7 * 1024,
  privacyHtmlGzipMax: 5 * 1024,
  mainCssGzipMax: 12 * 1024,
  mainJsGzipMax: 7 * 1024,
  totalCriticalGzipMax: 70 * 1024,
};

const LANDING_FILES = [
  "landing-classic.html",
  "landing-lymph.html",
  "landing-relax.html",
  "landing-posture.html",
];

function assertDistExists() {
  if (!existsSync(DIST_DIR)) {
    throw new Error("dist directory does not exist. Run `npm run build` first.");
  }
}

function getGzipSize(filePath) {
  const raw = readFileSync(filePath);
  return gzipSync(raw, { level: 9 }).length;
}

function findHashedAsset(regex) {
  const assetsDir = join(DIST_DIR, "assets");
  const assets = existsSync(assetsDir) ? readdirSync(assetsDir) : [];
  return assets.find((fileName) => regex.test(fileName)) || null;
}

function bytesLabel(bytes) {
  return `${(bytes / 1024).toFixed(2)} KiB`;
}

function runBudgetCheck() {
  assertDistExists();

  const results = [];
  const failures = [];

  const indexHtmlPath = join(DIST_DIR, "index.html");
  const indexGzip = getGzipSize(indexHtmlPath);
  results.push({ metric: "index.html (gzip)", value: indexGzip, budget: BUDGET.indexHtmlGzipMax });
  if (indexGzip > BUDGET.indexHtmlGzipMax) {
    failures.push(`index.html gzip is ${bytesLabel(indexGzip)} (budget ${bytesLabel(BUDGET.indexHtmlGzipMax)}).`);
  }

  let landingsTotal = 0;
  LANDING_FILES.forEach((fileName) => {
    const filePath = join(DIST_DIR, fileName);
    const gzipSize = getGzipSize(filePath);
    landingsTotal += gzipSize;
    results.push({ metric: `${fileName} (gzip)`, value: gzipSize, budget: BUDGET.landingHtmlGzipMax });
    if (gzipSize > BUDGET.landingHtmlGzipMax) {
      failures.push(`${fileName} gzip is ${bytesLabel(gzipSize)} (budget ${bytesLabel(BUDGET.landingHtmlGzipMax)}).`);
    }
  });

  const privacyPath = join(DIST_DIR, "privacy.html");
  const privacyGzip = getGzipSize(privacyPath);
  results.push({ metric: "privacy.html (gzip)", value: privacyGzip, budget: BUDGET.privacyHtmlGzipMax });
  if (privacyGzip > BUDGET.privacyHtmlGzipMax) {
    failures.push(`privacy.html gzip is ${bytesLabel(privacyGzip)} (budget ${bytesLabel(BUDGET.privacyHtmlGzipMax)}).`);
  }

  const mainCss = findHashedAsset(/^main-.*\.css$/);
  if (!mainCss) {
    failures.push("Cannot find main CSS bundle in dist/assets.");
  }

  const mainJs = findHashedAsset(/^main-.*\.js$/);
  if (!mainJs) {
    failures.push("Cannot find main JS bundle in dist/assets.");
  }

  let cssGzip = 0;
  let jsGzip = 0;
  if (mainCss) {
    cssGzip = getGzipSize(join(DIST_DIR, "assets", mainCss));
    results.push({ metric: `${mainCss} (gzip)`, value: cssGzip, budget: BUDGET.mainCssGzipMax });
    if (cssGzip > BUDGET.mainCssGzipMax) {
      failures.push(`${mainCss} gzip is ${bytesLabel(cssGzip)} (budget ${bytesLabel(BUDGET.mainCssGzipMax)}).`);
    }
  }

  if (mainJs) {
    jsGzip = getGzipSize(join(DIST_DIR, "assets", mainJs));
    results.push({ metric: `${mainJs} (gzip)`, value: jsGzip, budget: BUDGET.mainJsGzipMax });
    if (jsGzip > BUDGET.mainJsGzipMax) {
      failures.push(`${mainJs} gzip is ${bytesLabel(jsGzip)} (budget ${bytesLabel(BUDGET.mainJsGzipMax)}).`);
    }
  }

  const totalCritical = indexGzip + landingsTotal + privacyGzip + cssGzip + jsGzip;
  results.push({ metric: "Total critical payload (gzip)", value: totalCritical, budget: BUDGET.totalCriticalGzipMax });
  if (totalCritical > BUDGET.totalCriticalGzipMax) {
    failures.push(
      `Total critical payload gzip is ${bytesLabel(totalCritical)} (budget ${bytesLabel(BUDGET.totalCriticalGzipMax)}).`
    );
  }

  const printable = results.map((row) => ({
    metric: row.metric,
    value: bytesLabel(row.value),
    budget: bytesLabel(row.budget),
    status: row.value <= row.budget ? "OK" : "FAIL",
  }));
  console.table(printable);

  if (failures.length > 0) {
    console.error("Performance budget check failed:");
    failures.forEach((item) => console.error(`- ${item}`));
    process.exit(1);
  }

  console.log("Performance budget check passed.");
}

runBudgetCheck();
