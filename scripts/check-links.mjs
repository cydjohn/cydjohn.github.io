// Checks that every internal link and image in the built site (dist/) points at a file that exists.
// Run after `npm run build`:  npm run check-links
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const files = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p);
  }
})(DIST);

const broken = [];
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="([^"#?]+)[^"]*"/g)) {
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    let target = join(DIST, decodeURIComponent(url));
    if (url.endsWith('/')) target = join(target, 'index.html');
    if (!existsSync(target)) broken.push(`${file.slice(DIST.length)} -> ${url}`);
  }
}

console.log(`checked ${files.length} pages`);
if (broken.length) {
  console.error(`${broken.length} broken internal link(s):\n` + [...new Set(broken)].join('\n'));
  process.exit(1);
}
console.log('no broken internal links');
