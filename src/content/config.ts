import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    // Campos requeridos solo para artículos principales (index)
    // Opcionales para sub-secciones que heredan del principal
    excerpt: z.string().optional(),
    date: z.date().optional(),
    author: z.string().optional(),
    authorRole: z.string().optional(),
    authorAvatar: z.string().url().optional(),
    category: z.string().optional(),
    image: z.string().url().optional(),
    // Indica si este artículo tiene múltiples secciones
    multiSection: z.boolean().optional(),
    // Para artículos con secciones: texto de la pestaña
    tabLabel: z.string().optional(),
  }),
});

export const collections = {
  blog,
};
