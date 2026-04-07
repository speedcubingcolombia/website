import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    // Required for main articles (index), optional for sub-sections that inherit from parent
    excerpt: z.string().min(1).optional(),
    date: z.date().optional(),
    author: z.string().min(1).optional(),
    authorRole: z.string().min(1).optional(),
    authorAvatar: z.string().url().or(z.string().startsWith("/")).optional(),
    category: z.string().min(1).optional(),
    image: z.string().url().or(z.string().startsWith("/")).optional(),
    multiSection: z.boolean().optional(),
    tabLabel: z.string().min(1).optional(),
  }),
});

export const collections = {
  blog,
};
