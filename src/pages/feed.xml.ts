import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '../lib/blog';
import { SITE } from '../data/site';

// Same URL as the Jekyll feed, so existing subscribers keep receiving posts.
export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: 'WebARKit blog',
    description: 'News from the WebARKit open-source WebAR project.',
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: post.data.tags,
      author: post.data.author,
    })),
    customData: '<language>en</language>',
  });
}
