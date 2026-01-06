import { getCollection, type CollectionEntry } from "astro:content";
import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
  DEFAULT_LANGUAGE,
  languages,
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
  // SAC 2026 sections with translated URLs
  "sac-2026/registro": {
    en: "sac-2026/registration",
    pt: "sac-2026/inscricao",
  },
  "sac-2026/pagos": { en: "sac-2026/payments", pt: "sac-2026/pagamentos" },
  "sac-2026/cronograma": { en: "sac-2026/schedule" },
  "sac-2026/sede-transporte": { en: "sac-2026/venue", pt: "sac-2026/local" },
  "sac-2026/alojamiento-alimentacion": {
    en: "sac-2026/accommodation",
    pt: "sac-2026/hospedagem",
  },
  "sac-2026/turismo": { en: "sac-2026/tourism" },
  "sac-2026/patrocinadores": { en: "sac-2026/sponsors" },
  "sac-2026/staff": { pt: "sac-2026/equipe" },
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
