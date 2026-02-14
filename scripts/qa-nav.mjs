import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");

if (!existsSync(distDir) || !existsSync(indexPath)) {
  console.error("[qa:nav] dist/index.html not found. Run build first.");
  process.exit(1);
}

const indexHtml = readFileSync(indexPath, "utf8");
const indexIds = new Set();
const idRegex = /id=("|')(.*?)\1/g;
let match;

while ((match = idRegex.exec(indexHtml))) {
  if (match[2]) indexIds.add(match[2]);
}

const htmlFiles = readdirSync(distDir).filter((file) => file.endsWith(".html") && file !== "index.html");
let hasError = false;

const hrefRegex = /href=("|')(.*?)\1/g;
htmlFiles.forEach((file) => {
  const html = readFileSync(path.join(distDir, file), "utf8");
  while ((match = hrefRegex.exec(html))) {
    const href = (match[2] || "").trim();
    if (!href.startsWith("/#")) continue;
    if (href === "/#" || href.startsWith("/#!")) continue;
    const targetId = href.replace("/#", "");
    if (!indexIds.has(targetId)) {
      console.error(`[qa:nav] Missing index anchor for ${file}: ${href}`);
      hasError = true;
    }
  }
});

if (hasError) process.exit(1);
console.log(`[qa:nav] PASS (${htmlFiles.length} files)`);
