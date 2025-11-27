import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    author: z.string(),
    authorRole: z.string(),
    authorAvatar: z.string().url(),
    category: z.string(),
    image: z.string().url(),
  }),
});

export const collections = {
  blog,
};
