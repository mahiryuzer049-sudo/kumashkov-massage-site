import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");

if (!existsSync(indexPath)) {
  console.error("[qa:scanner] dist/index.html not found. Run build first.");
  process.exit(1);
}

const html = readFileSync(indexPath, "utf8");
const requiredPoints = ["head", "neck", "shoulders", "back", "legs"];
const requiredShortcuts = ["head", "neck", "shoulders", "back", "legs"];
const requiredIds = [
  "scanner",
  "scanner-container",
  "zone-popup",
  "zone-title",
  "zone-desc",
  "zone-cta",
  "zone-close",
];

let hasError = false;

requiredIds.forEach((id) => {
  const regex = new RegExp(`id=("|')${id}\\1`);
  if (!regex.test(html)) {
    console.error(`[qa:scanner] Missing element id: #${id}`);
    hasError = true;
  }
});

requiredPoints.forEach((point) => {
  const regex = new RegExp(`data-point=("|')${point}\\1`);
  if (!regex.test(html)) {
    console.error(`[qa:scanner] Missing data-point: ${point}`);
    hasError = true;
  }
});

requiredShortcuts.forEach((shortcut) => {
  const regex = new RegExp(`data-zone-shortcut=("|')${shortcut}\\1`);
  if (!regex.test(html)) {
    console.error(`[qa:scanner] Missing data-zone-shortcut: ${shortcut}`);
    hasError = true;
  }
});

if (hasError) process.exit(1);
console.log("[qa:scanner] PASS");
