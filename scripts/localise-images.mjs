// Copies every remote image referenced in the default content into public/images
// and rewrites the content to use the local copies. Run once the image host is reachable:
//   node scripts/localise-images.mjs
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const files = ["src/lib/content/sections.ts", "src/lib/content/default-site.ts"];
const outDir = "public/images";
await mkdir(outDir, { recursive: true });

for (const file of files) {
  let text = await readFile(file, "utf8");
  const urls = [...new Set(text.match(/https:\/\/[a-z0-9.-]+\.cloudfront\.net\/[^"]+\.(png|jpe?g|webp)/g) ?? [])];
  for (const url of urls) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const name = createHash("sha1").update(url).digest("hex").slice(0, 12) + path.extname(new URL(url).pathname);
    await writeFile(path.join(outDir, name), buf);
    text = text.split(url).join(`/images/${name}`);
    console.log(`${url} -> /images/${name} (${Math.round(buf.length / 1024)} KB)`);
  }
  await writeFile(file, text);
}
