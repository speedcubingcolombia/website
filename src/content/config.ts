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
    // Acepta URLs completas o rutas locales (ej: /sac/logo.png)
    authorAvatar: z.string().optional(),
    category: z.string().optional(),
    // Acepta URLs completas o rutas locales (ej: /sac/imagen.png)
    image: z.string().optional(),
    // Indica si este artículo tiene múltiples secciones
    multiSection: z.boolean().optional(),
    // Para artículos con secciones: texto de la pestaña
    tabLabel: z.string().optional(),
  }),
});

export const collections = {
  blog,
};
