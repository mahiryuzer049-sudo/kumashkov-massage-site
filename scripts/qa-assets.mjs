import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
if (!existsSync(distDir)) {
  console.error("[qa:assets] dist directory not found. Run build first.");
  process.exit(1);
}

const htmlFiles = readdirSync(distDir).filter((file) => file.endsWith(".html"));
if (!htmlFiles.length) {
  console.error("[qa:assets] No HTML files found in dist.");
  process.exit(1);
}

const skipPrefixes = ["http://", "https://", "mailto:", "tel:", "data:", "javascript:"];
const skipExts = new Set([".html"]);
let hasError = false;

for (const file of htmlFiles) {
  const filePath = path.join(distDir, file);
  const html = readFileSync(filePath, "utf8");
  const attrRegex = /(src|href)=("|')(.*?)\2/g;
  let match;

  while ((match = attrRegex.exec(html))) {
    const raw = (match[3] || "").trim();
    if (!raw) continue;
    if (skipPrefixes.some((prefix) => raw.startsWith(prefix))) continue;
    if (raw.startsWith("#") || raw.startsWith("/#")) continue;

    const cleaned = raw.split(/[?#]/)[0];
    if (!cleaned) continue;

    const ext = path.extname(cleaned).toLowerCase();
    if (!ext || skipExts.has(ext)) continue;

    const targetPath = cleaned.startsWith("/")
      ? path.resolve(distDir, `.${cleaned}`)
      : path.resolve(distDir, cleaned);

    if (!existsSync(targetPath)) {
      console.error(`[qa:assets] Missing asset in ${file}: ${raw} -> ${path.relative(distDir, targetPath)}`);
      hasError = true;
    }
  }
}

if (hasError) process.exit(1);
console.log(`[qa:assets] PASS (${htmlFiles.length} files)`);
