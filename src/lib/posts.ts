import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export const SITE = {
  title: 'BAZINGA',
  description: "BAZINGA's Blog",
  author: 'BAZINGA',
  github: 'https://github.com/cydjohn',
};

// Front-matter dates are naive local timestamps ("2018-04-28 00:47:33"), which YAML
// reads as UTC. Formatting in UTC keeps the written date, so URLs match the old Hexo ones.
const TZ = 'UTC';

function parts(d: Date) {
  const f = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
  const [y, m, day] = f.format(d).split('-');
  return { y, m, d: day };
}

export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('posts', (p) => !p.data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function postPath(p: Post) {
  const { y, m, d } = parts(p.data.date);
  return `/${y}/${m}/${d}/${p.data.slug}/`;
}

export function postParams(p: Post) {
  const { y, m, d } = parts(p.data.date);
  return { year: y, month: m, day: d, slug: p.data.slug };
}

export function year(d: Date) {
  return parts(d).y;
}

export function fmtDate(d: Date) {
  const { y, m, d: day } = parts(d);
  return `${y}-${m}-${day}`;
}

export function tagPath(tag: string) {
  return `/tags/${tag}/`;
}

export function allTags(posts: Post[]) {
  const map = new Map<string, Post[]>();
  for (const p of posts) for (const t of p.data.tags) map.set(t, [...(map.get(t) ?? []), p]);
  return [...map.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
}
