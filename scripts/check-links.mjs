// Crawl the running site and report broken internal links, images and fragments.
// Usage: node scripts/check-links.mjs [baseUrl]   (default http://localhost:3000)
const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://geetexyarn.com";

const pages = new Map(); // path -> { status, ids }
const assets = new Map(); // url -> status
const links = []; // { from, to }
const queue = ["/"];

// Seed with every URL in the sitemap.
const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) queue.push(m[1].replace(SITE, "") || "/");

const decode = (s) => s.replace(/&amp;/g, "&");

while (queue.length) {
  const path = queue.shift();
  if (pages.has(path)) continue;
  const res = await fetch(BASE + path, { redirect: "manual" });
  const entry = { status: res.status, ids: new Set() };
  pages.set(path, entry);
  if (res.status !== 200 || !(res.headers.get("content-type") || "").includes("text/html")) continue;
  const html = await res.text();
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) entry.ids.add(m[1]);
  for (const m of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    const href = decode(m[1]);
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    links.push({ from: path, to: href });
    const clean = href.split("#")[0].split("?")[0] || path;
    if (!clean.startsWith("/_next") && !/\.(pdf|png|jpg|xml|txt)$/.test(clean)) queue.push(clean);
    else if (!assets.has(clean)) assets.set(clean, null);
  }
  for (const m of html.matchAll(/<img\s[^>]*src="([^"]+)"/g)) {
    const src = decode(m[1]);
    if (src.startsWith("/") && !assets.has(src)) assets.set(src, null);
  }
}

for (const url of assets.keys()) {
  const r = await fetch(BASE + url);
  assets.set(url, r.status);
}

let problems = 0;
for (const [p, e] of pages) {
  if (e.status !== 200) {
    problems++;
    const from = links.filter((l) => l.to.split("#")[0].split("?")[0] === p).map((l) => l.from);
    console.log(`PAGE ${e.status} ${p}  <- linked from: ${[...new Set(from)].slice(0, 5).join(", ") || "sitemap"}`);
  }
}
for (const [u, s] of assets) {
  if (s !== 200) {
    problems++;
    console.log(`ASSET ${s} ${u}`);
  }
}
for (const l of links) {
  const [p, frag] = l.to.split("#");
  if (!frag) continue;
  const target = pages.get((p.split("?")[0]) || l.from);
  if (target && target.status === 200 && !target.ids.has(frag)) {
    problems++;
    console.log(`FRAGMENT #${frag} missing on ${p || l.from}  <- ${l.from}`);
  }
}
console.log(`\nChecked ${pages.size} pages, ${links.length} internal links, ${assets.size} assets. Problems: ${problems}`);
process.exit(problems ? 1 : 0);
