import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** /blog/YYYY/MM/DD/<slug>/ — the same scheme the Jekyll site used. */
export function postPath(post: Post): string {
  const d = post.data.date;
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const slug = post.data.slug ?? post.id.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  return `${yyyy}/${mm}/${dd}/${slug}`;
}

export function postUrl(post: Post): string {
  return `/blog/${postPath(post)}/`;
}

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft || import.meta.env.DEV);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
