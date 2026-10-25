import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Walter Perdan'),
    /** Cover image: a path under /public (e.g. /examples/Data/logo.gif). */
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    /**
     * Last URL segment. Old Jekyll posts set it to keep their published URL
     * (/blog/YYYY/MM/DD/<slug>/). Defaults to the file name.
     */
    slug: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  blog,
};
