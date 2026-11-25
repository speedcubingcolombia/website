import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  // Entry ids match the URL slugs: no extension, and a folder's index.md takes
  // the folder name (sac-2026/index.md becomes "sac-2026").
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.md",
    generateId: ({ entry }) =>
      entry.replace(/\.md$/, "").replace(/\/index$/, ""),
  }),
  schema: z.object({
    title: z.string().min(1),
    // Required for main articles (index), optional for sub-sections that inherit from parent
    excerpt: z.string().min(1).optional(),
    date: z.date().optional(),
    author: z.string().min(1).optional(),
    authorRole: z.string().min(1).optional(),
    authorAvatar: z.string().url().or(z.string().regex(/^\/(?!\/)/, "Must be a site-root-relative path")).optional(),
    category: z.string().min(1).optional(),
    image: z.string().url().or(z.string().regex(/^\/(?!\/)/, "Must be a site-root-relative path")).optional(),
    multiSection: z.boolean().optional(),
    tabLabel: z.string().min(1).optional(),
  }),
});

export const collections = {
  blog,
};
