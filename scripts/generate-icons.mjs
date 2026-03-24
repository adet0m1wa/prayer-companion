import sharp from "sharp";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const outDir = resolve(root, "public/icons");
const srcIcon = resolve(root, "src/images/images for understanding aspect/love.png");

mkdirSync(outDir, { recursive: true });

const SIZE = 512;
const ICON_SIZE = Math.round(SIZE * 0.6);
const BG_COLOR = { r: 228, g: 222, b: 213, alpha: 1 }; // #E4DED5

const icon = await sharp(srcIcon)
  .resize(ICON_SIZE, ICON_SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

await sharp({
  create: { width: SIZE, height: SIZE, channels: 4, background: BG_COLOR },
})
  .composite([{ input: icon, gravity: "centre" }])
  .png()
  .toFile(resolve(outDir, "icon-512.png"));

await sharp(resolve(outDir, "icon-512.png"))
  .resize(192, 192)
  .png()
  .toFile(resolve(outDir, "icon-192.png"));

await sharp(resolve(outDir, "icon-192.png"))
  .toFile(resolve(root, "public/apple-touch-icon.png"));

console.log("Icons generated: icon-512.png, icon-192.png, apple-touch-icon.png");
