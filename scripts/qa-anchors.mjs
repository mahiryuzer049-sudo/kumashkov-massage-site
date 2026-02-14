import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
if (!existsSync(distDir)) {
  console.error("[qa:anchors] dist directory not found. Run build first.");
  process.exit(1);
}

const htmlFiles = readdirSync(distDir).filter((file) => file.endsWith(".html"));
if (!htmlFiles.length) {
  console.error("[qa:anchors] No HTML files found in dist.");
  process.exit(1);
}

let hasError = false;

for (const file of htmlFiles) {
  const filePath = path.join(distDir, file);
  const html = readFileSync(filePath, "utf8");
  const ids = new Set();
  const idRegex = /id=("|')(.*?)\1/g;
  let match;

  while ((match = idRegex.exec(html))) {
    if (match[2]) ids.add(match[2]);
  }

  const hrefRegex = /href=("|')(.*?)\1/g;
  while ((match = hrefRegex.exec(html))) {
    const href = (match[2] || "").trim();
    if (!href || !href.startsWith("#")) continue;
    if (href === "#" || href.startsWith("#!")) continue;
    const targetId = href.slice(1);
    if (!ids.has(targetId)) {
      console.error(`[qa:anchors] Missing anchor target in ${file}: ${href}`);
      hasError = true;
    }
  }
}

if (hasError) process.exit(1);
console.log(`[qa:anchors] PASS (${htmlFiles.length} files)`);
