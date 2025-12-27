import { getCollection, type CollectionEntry } from "astro:content";

export const POSTS_PER_PAGE = 6;

export type BlogListEntry = CollectionEntry<"blog"> & {
  formattedDate: string;
};

/**
 * Formateador de fechas reutilizable para todo el sitio
 * Formato: "27 de diciembre de 2025"
 */
export const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Supported languages for the site
 */
export const SUPPORTED_LANGUAGES = ["es", "en", "pt"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Mapping of Spanish (canonical) slugs to their translations in other languages
 * All slug lookups should use this central mapping
 */
export const SLUG_TRANSLATIONS: Record<
  string,
  Record<SupportedLanguage, string>
> = {
  "sac-2026": { es: "sac-2026", en: "sac-2026", pt: "sac-2026" },
  "sac-2026/registro": {
    es: "sac-2026/registro",
    en: "sac-2026/registration",
    pt: "sac-2026/inscricao",
  },
  "sac-2026/pagos": {
    es: "sac-2026/pagos",
    en: "sac-2026/payments",
    pt: "sac-2026/pagamentos",
  },
  "sac-2026/cronograma": {
    es: "sac-2026/cronograma",
    en: "sac-2026/schedule",
    pt: "sac-2026/cronograma",
  },
  "sac-2026/sede-transporte": {
    es: "sac-2026/sede-transporte",
    en: "sac-2026/venue",
    pt: "sac-2026/local",
  },
  "sac-2026/alojamiento-alimentacion": {
    es: "sac-2026/alojamiento-alimentacion",
    en: "sac-2026/accommodation",
    pt: "sac-2026/hospedagem",
  },
  "sac-2026/turismo": {
    es: "sac-2026/turismo",
    en: "sac-2026/tourism",
    pt: "sac-2026/turismo",
  },
  "sac-2026/patrocinadores": {
    es: "sac-2026/patrocinadores",
    en: "sac-2026/sponsors",
    pt: "sac-2026/patrocinadores",
  },
  "sac-2026/staff": {
    es: "sac-2026/staff",
    en: "sac-2026/staff",
    pt: "sac-2026/equipe",
  },
};

/**
 * Get the canonical (Spanish) slug from any translated slug
 */
export function getCanonicalSlug(
  slug: string,
  fromLang: SupportedLanguage
): string {
  if (fromLang === "es") return slug;

  for (const [canonicalSlug, translations] of Object.entries(
    SLUG_TRANSLATIONS
  )) {
    if (translations[fromLang] === slug) {
      return canonicalSlug;
    }
  }
  return slug;
}

/**
 * Check which languages have translations for a given canonical slug
 */
export async function getAvailableLanguages(
  canonicalSlug: string
): Promise<SupportedLanguage[]> {
  const allPosts = await getCollection("blog");
  const availableLanguages: SupportedLanguage[] = [];

  // Check Spanish (default, no prefix)
  const esExists = allPosts.some((post) => {
    const normalizedSlug = post.slug.replace("/index", "");
    return (
      normalizedSlug === canonicalSlug &&
      !post.slug.startsWith("en/") &&
      !post.slug.startsWith("pt/")
    );
  });
  if (esExists) availableLanguages.push("es");

  // Check English (en/ prefix)
  const enSlug = SLUG_TRANSLATIONS[canonicalSlug]?.en || canonicalSlug;
  const enExists = allPosts.some((post) => {
    const normalizedSlug = post.slug.replace("/index", "").replace("en/", "");
    return post.slug.startsWith("en/") && normalizedSlug === enSlug;
  });
  if (enExists) availableLanguages.push("en");

  // Check Portuguese (pt/ prefix)
  const ptSlug = SLUG_TRANSLATIONS[canonicalSlug]?.pt || canonicalSlug;
  const ptExists = allPosts.some((post) => {
    const normalizedSlug = post.slug.replace("/index", "").replace("pt/", "");
    return post.slug.startsWith("pt/") && normalizedSlug === ptSlug;
  });
  if (ptExists) availableLanguages.push("pt");

  return availableLanguages;
}

/**
 * Formatea una fecha usando el formato estándar del sitio
 */
export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}

export async function getBlogPosts(): Promise<BlogListEntry[]> {
  const posts = await getCollection("blog");

  // Agrupar posts multi-sección y solo mostrar el index
  const displayPosts = posts.filter((post) => {
    // Si no tiene '/', es un post simple
    if (!post.slug.includes("/")) return true;
    // Si tiene '/', solo mostrar el index
    return post.slug.endsWith("/index");
  });

  return displayPosts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((post) => ({
      ...post,
      // Normalizar el slug para posts multi-sección (quitar /index)
      slug: post.slug.replace("/index", ""),
      formattedDate: dateFormatter.format(post.data.date),
    }));
}
