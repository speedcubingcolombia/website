import { getCollection, type CollectionEntry } from "astro:content";
import {
  DEFAULT_LANGUAGE,
  languages,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "../i18n";

// Re-export i18n types for backwards compatibility
export { SUPPORTED_LANGUAGES, type SupportedLanguage } from "../i18n";

export const POSTS_PER_PAGE = 6;

export type BlogListEntry = CollectionEntry<"blog"> & {
  formattedDate: string;
};

/**
 * Formateador de fechas reutilizable para español (default)
 * @deprecated Use formatDate from src/i18n instead for localized dates
 */
export const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Mapping of canonical slugs (Spanish) to translated slugs per language.
 *
 * This enables URL translation (e.g., /blog/sac-2026/registro → /en/blog/sac-2026/registration)
 *
 * NOTE: For content that uses the same slug across languages (most cases),
 * you don't need to add an entry here - the system auto-detects based on folder structure.
 * Only add entries when the URL slug differs between languages.
 *
 * @example
 * // Only needed when translated URL differs from Spanish:
 * "sac-2026/registro": { es: "sac-2026/registro", en: "sac-2026/registration", pt: "sac-2026/inscricao" }
 */
export const SLUG_TRANSLATIONS: Record<
  string,
  Partial<Record<SupportedLanguage, string>>
> = {
  // SAC 2026 translations - each file uses its own language name
  "sac-2026/alojamiento": {
    es: "sac-2026/alojamiento",
    en: "sac-2026/accommodation",
    pt: "sac-2026/hospedagem",
  },
  "sac-2026/pagos": {
    es: "sac-2026/pagos",
    en: "sac-2026/payments",
    pt: "sac-2026/pagamentos",
  },
  "sac-2026/registro": {
    es: "sac-2026/registro",
    en: "sac-2026/registration",
    pt: "sac-2026/registro",
  },
  "sac-2026/patrocinadores": {
    es: "sac-2026/patrocinadores",
    en: "sac-2026/sponsors",
    pt: "sac-2026/patrocinadores",
  },
  "sac-2026/turismo": {
    es: "sac-2026/turismo",
    en: "sac-2026/tourism",
    pt: "sac-2026/turismo",
  },
  "sac-2026/sede-transporte": {
    es: "sac-2026/sede-transporte",
    en: "sac-2026/venue-transport",
    pt: "sac-2026/local-transporte",
  },
  "sac-2026/voluntario": {
    es: "sac-2026/voluntario",
    en: "sac-2026/volunteer",
    pt: "sac-2026/voluntario",
  },
  "sac-2026/copa-de-naciones": {
    es: "sac-2026/copa-de-naciones",
    en: "sac-2026/nations-cup",
    pt: "sac-2026/copa-de-nacoes",
  },
  "sac-2026/cronograma-categorias": {
    es: "sac-2026/cronograma-categorias",
    en: "sac-2026/schedule-categories",
    pt: "sac-2026/cronograma-categorias",
  },
  "sac-2026/no-oficiales": {
    es: "sac-2026/no-oficiales",
    en: "sac-2026/unofficial-events",
    pt: "sac-2026/nao-oficiais",
  },
};

/**
 * Get the translated slug for a given canonical (Spanish) slug and target language
 */
export function getTranslatedSlug(
  canonicalSlug: string,
  targetLang: SupportedLanguage
): string {
  if (targetLang === DEFAULT_LANGUAGE) return canonicalSlug;
  return SLUG_TRANSLATIONS[canonicalSlug]?.[targetLang] || canonicalSlug;
}

/**
 * Get the canonical (Spanish) slug from any translated slug
 */
export function getCanonicalSlug(
  slug: string,
  fromLang: SupportedLanguage
): string {
  if (fromLang === DEFAULT_LANGUAGE) return slug;

  // Check if this slug is a translation
  for (const [canonicalSlug, translations] of Object.entries(
    SLUG_TRANSLATIONS
  )) {
    if (translations[fromLang] === slug) {
      return canonicalSlug;
    }
  }

  // No translation found - slug is probably the same as canonical
  return slug;
}

/**
 * Check which languages have translations for a given canonical slug.
 * Auto-detects based on content folder structure (en/, pt/ prefixes).
 */
export async function getAvailableLanguages(
  canonicalSlug: string
): Promise<SupportedLanguage[]> {
  const allPosts = await getCollection("blog");
  const availableLanguages: SupportedLanguage[] = [];

  // Normalize the canonical slug (remove /index if present)
  const normalizedCanonical = canonicalSlug.replace("/index", "");

  for (const lang of SUPPORTED_LANGUAGES) {
    // Get the expected slug for this language
    const expectedSlug = getTranslatedSlug(normalizedCanonical, lang);

    const exists = allPosts.some((post) => {
      // Get the slug without index suffix
      let postSlug = post.slug.replace("/index", "");

      if (lang === DEFAULT_LANGUAGE) {
        // Spanish: no prefix, must not start with any language prefix
        const hasLangPrefix = SUPPORTED_LANGUAGES.some(
          (l) => l !== DEFAULT_LANGUAGE && postSlug.startsWith(`${l}/`)
        );
        return !hasLangPrefix && postSlug === expectedSlug;
      } else {
        // Other languages: must have lang/ prefix
        const prefix = `${lang}/`;
        if (!postSlug.startsWith(prefix)) return false;
        const slugWithoutPrefix = postSlug.slice(prefix.length);
        return slugWithoutPrefix === expectedSlug;
      }
    });

    if (exists) availableLanguages.push(lang);
  }

  return availableLanguages;
}

/**
 * Build a localized blog URL
 * @example getLocalizedBlogUrl("sac-2026", "en") => "/en/blog/sac-2026"
 * @example getLocalizedBlogUrl("sac-2026/registro", "en") => "/en/blog/sac-2026/registration"
 */
export function getLocalizedBlogUrl(
  canonicalSlug: string,
  lang: SupportedLanguage
): string {
  const translatedSlug = getTranslatedSlug(canonicalSlug, lang);
  const prefix = languages[lang].prefix;
  return `${prefix}/blog/${translatedSlug}`;
}

/**
 * Formatea una fecha usando el formato estándar del sitio (español por defecto)
 * Para fechas localizadas, use formatDate de src/i18n
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

/**
 * Formats a date with timezone UTC to avoid off-by-one errors
 */
export function formatDateUTC(date: Date, locale: string = "es-CO"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/**
 * Filters blog posts by language
 */
export function filterPostsByLanguage(
  posts: CollectionEntry<"blog">[],
  lang: SupportedLanguage
): CollectionEntry<"blog">[] {
  if (lang === DEFAULT_LANGUAGE) {
    // Spanish: no language prefix
    return posts.filter(
      (post) => !post.slug.startsWith("en/") && !post.slug.startsWith("pt/")
    );
  }
  // Other languages: must have lang/ prefix
  return posts.filter((post) => post.slug.startsWith(`${lang}/`));
}

/**
 * Removes language prefix from slug
 */
export function removeLanguagePrefix(
  slug: string,
  lang: SupportedLanguage
): string {
  if (lang === DEFAULT_LANGUAGE) return slug;
  const prefix = `${lang}/`;
  return slug.startsWith(prefix) ? slug.slice(prefix.length) : slug;
}

/**
 * Gets the base slug (first part before /)
 */
export function getBaseSlug(slug: string): string {
  return slug.includes("/") ? slug.split("/")[0] : slug;
}

/**
 * Sorts multi-section posts: index first, then alphabetically
 */
export function sortSections(sections: CollectionEntry<"blog">[]): void {
  sections.sort((a, b) => {
    const aIsNormalizedIndex = !a.slug.includes("/");
    const bIsNormalizedIndex = !b.slug.includes("/");
    const aIsIndex = a.slug.endsWith("/index");
    const bIsIndex = b.slug.endsWith("/index");

    if (aIsNormalizedIndex) return -1;
    if (bIsNormalizedIndex) return 1;
    if (aIsIndex) return -1;
    if (bIsIndex) return 1;
    return a.slug.localeCompare(b.slug);
  });
}

/**
 * Generates tabs for multi-section articles
 */
export interface Tab {
  label: string;
  slug: string;
  isActive: boolean;
}

export function generateTabs(
  allSections: CollectionEntry<"blog">[],
  currentSlug: string,
  indexPost: CollectionEntry<"blog">,
  lang: SupportedLanguage = DEFAULT_LANGUAGE
): Tab[] {
  return [
    {
      label: indexPost.data.tabLabel || indexPost.data.title,
      slug: "index",
      isActive: currentSlug === "index",
    },
    ...allSections
      .filter((section) => {
        const slugWithoutLang = removeLanguagePrefix(section.slug, lang);
        return slugWithoutLang.includes("/");
      })
      .map((section) => {
        const slugWithoutLang = removeLanguagePrefix(section.slug, lang);
        const sectionSlug = slugWithoutLang.split("/")[1];
        return {
          label: section.data.tabLabel || section.data.title,
          slug: sectionSlug,
          isActive: sectionSlug === currentSlug,
        };
      }),
  ];
}

/**
 * Finds the index post for a multi-section article
 */
export async function findIndexPost(
  baseSlug: string,
  lang: SupportedLanguage = DEFAULT_LANGUAGE
): Promise<CollectionEntry<"blog"> | undefined> {
  const allPosts = await getCollection("blog");
  const prefix = lang === DEFAULT_LANGUAGE ? "" : `${lang}/`;

  return (
    allPosts.find((p) => p.slug === `${prefix}${baseSlug}`) ||
    allPosts.find((p) => p.slug === `${prefix}${baseSlug}/index`)
  );
}
