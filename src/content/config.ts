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
    // Opcional: indica si este artículo tiene múltiples secciones
    multiSection: z.boolean().optional(),
    // Para artículos con secciones: orden de las pestañas
    tabLabel: z.string().optional(),
  }),
});

export const collections = {
  blog,
};
