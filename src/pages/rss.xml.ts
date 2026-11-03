import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postPath, SITE } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = (await getPosts()).slice(0, 20);
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      link: postPath(p),
      categories: p.data.tags,
    })),
  });
}
