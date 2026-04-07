import { getCollection, type CollectionEntry } from "astro:content";
import {
  DEFAULT_LANGUAGE,
  formatDate as formatDateI18n,
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
 * Mapping of canonical slugs (Spanish) to translated slugs per language.
 *
 * This enables URL translation (e.g., /blog/sac-2026/registro → /en/blog/sac-2026/registration)
 *
 * NOTE: For content that uses the same slug across languages (most cases),
 * you don't need to add an entry here - the system auto-detects based on folder structure.
 * Only add entries when the URL slug differs between languages.
 */
export const SLUG_TRANSLATIONS: Record<
  string,
  Partial<Record<SupportedLanguage, string>>
> = {
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
 * Check which languages have translations for a given canonical slug.
 * Auto-detects based on content folder structure (en/, pt/ prefixes).
 */
export async function getAvailableLanguages(
  canonicalSlug: string
): Promise<SupportedLanguage[]> {
  const allPosts = await getCollection("blog");
  const availableLanguages: SupportedLanguage[] = [];

  const normalizedCanonical = canonicalSlug.replace("/index", "");

  for (const lang of SUPPORTED_LANGUAGES) {
    const expectedSlug = getTranslatedSlug(normalizedCanonical, lang);

    const exists = allPosts.some((post) => {
      let postSlug = post.slug.replace("/index", "");

      if (lang === DEFAULT_LANGUAGE) {
        const hasLangPrefix = SUPPORTED_LANGUAGES.some(
          (l) => l !== DEFAULT_LANGUAGE && postSlug.startsWith(`${l}/`)
        );
        return !hasLangPrefix && postSlug === expectedSlug;
      } else {
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
 * Filters blog posts by language
 */
export function filterPostsByLanguage(
  posts: CollectionEntry<"blog">[],
  lang: SupportedLanguage
): CollectionEntry<"blog">[] {
  if (lang === DEFAULT_LANGUAGE) {
    return posts.filter(
      (post) => !post.slug.startsWith("en/") && !post.slug.startsWith("pt/")
    );
  }
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
 * Sorts multi-section posts: index first, then alphabetically.
 * The lang parameter ensures language prefixes are stripped before comparison.
 */
export function sortSections(
  sections: CollectionEntry<"blog">[],
  lang: SupportedLanguage = DEFAULT_LANGUAGE
): void {
  sections.sort((a, b) => {
    const aSlug = removeLanguagePrefix(a.slug, lang);
    const bSlug = removeLanguagePrefix(b.slug, lang);
    const aIsNormalizedIndex = !aSlug.includes("/");
    const bIsNormalizedIndex = !bSlug.includes("/");
    const aIsIndex = aSlug.endsWith("/index");
    const bIsIndex = bSlug.endsWith("/index");

    if (aIsNormalizedIndex) return -1;
    if (bIsNormalizedIndex) return 1;
    if (aIsIndex) return -1;
    if (bIsIndex) return 1;
    return aSlug.localeCompare(bSlug);
  });
}

/**
 * Tab definition for multi-section article navigation
 */
export interface Tab {
  label: string;
  slug: string;
  isActive: boolean;
}

/**
 * Generates tabs for multi-section articles
 */
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

// ---------------------------------------------------------------------------
// Static path generation utilities
// ---------------------------------------------------------------------------

/** Props returned by getSlugPaths for [slug].astro routes */
export interface SlugPathProps {
  post: CollectionEntry<"blog">;
  multiSection: boolean;
  allSections: CollectionEntry<"blog">[];
  baseSlug: string;
}

/**
 * Generates static paths for [slug].astro routes.
 * Handles both simple posts and multi-section article indexes.
 */
export async function getSlugPaths(lang: SupportedLanguage) {
  const allPosts = await getCollection("blog");
  const posts = filterPostsByLanguage(allPosts, lang);
  const paths: { params: { slug: string }; props: SlugPathProps }[] = [];

  // Simple posts (no multiSection)
  posts
    .filter((post) => !post.data.multiSection)
    .forEach((post) => {
      const slug = removeLanguagePrefix(post.slug, lang);
      paths.push({
        params: { slug },
        props: { post, multiSection: false, allSections: [], baseSlug: slug },
      });
    });

  // Multi-section posts grouped by base slug
  const groups = new Map<string, CollectionEntry<"blog">[]>();
  posts
    .filter((p) => p.data.multiSection)
    .forEach((post) => {
      const slug = removeLanguagePrefix(post.slug, lang);
      const base = getBaseSlug(slug);
      if (!groups.has(base)) groups.set(base, []);
      groups.get(base)!.push(post);
    });

  groups.forEach((sections, base) => {
    sortSections(sections, lang);
    paths.push({
      params: { slug: base },
      props: {
        post: sections[0],
        multiSection: true,
        allSections: sections,
        baseSlug: base,
      },
    });
  });

  return paths;
}

/** Props returned by getSectionPaths for [slug]/[...section].astro routes */
export interface SectionPathProps {
  post: CollectionEntry<"blog">;
  mainPost: CollectionEntry<"blog">;
  allSections: CollectionEntry<"blog">[];
  baseSlug: string;
  currentSection: string;
}

/**
 * Generates static paths for [slug]/[...section].astro routes.
 * Only generates paths for sub-sections (not the index, which is handled by [slug].astro).
 */
export async function getSectionPaths(lang: SupportedLanguage) {
  const allPosts = await getCollection("blog");
  const posts = filterPostsByLanguage(allPosts, lang);
  const paths: { params: { slug: string; section: string }; props: SectionPathProps }[] = [];

  // Group posts by base slug (only those in folders, i.e., with "/" in slug)
  const groups = new Map<string, CollectionEntry<"blog">[]>();
  posts.forEach((post) => {
    const slug = removeLanguagePrefix(post.slug, lang);
    const parts = slug.split("/");
    if (parts.length > 1) {
      const base = parts[0];
      if (!groups.has(base)) groups.set(base, []);
      groups.get(base)!.push(post);
    }
  });

  groups.forEach((sections, base) => {
    sortSections(sections, lang);

    // Find the index post for metadata
    const prefix = lang === DEFAULT_LANGUAGE ? "" : `${lang}/`;
    const indexPost =
      allPosts.find((p) => p.slug === `${prefix}${base}`) ||
      allPosts.find((p) => p.slug === `${prefix}${base}/index`) ||
      sections[0];

    sections.forEach((post) => {
      const slug = removeLanguagePrefix(post.slug, lang);
      const section = slug.split("/")[1];
      const isIndex = section === "index" || !slug.includes("/");

      if (!isIndex) {
        paths.push({
          params: { slug: base, section },
          props: {
            post,
            mainPost: indexPost,
            allSections: sections,
            baseSlug: base,
            currentSection: section,
          },
        });
      }
    });
  });

  return paths;
}

/**
 * Builds alternate URL map for hreflang tags.
 * Returns a Record of lang code → full URL for each available language.
 */
export function buildAlternateUrls(
  canonicalSlug: string,
  availableLanguages: SupportedLanguage[],
  site: URL | undefined
): Record<string, string> {
  const base = site || new URL("https://speedcubingcolombia.org");
  const urls: Record<string, string> = {};

  for (const lang of availableLanguages) {
    const blogPath = getLocalizedBlogUrl(canonicalSlug, lang);
    urls[lang] = new URL(blogPath, base).toString();
  }

  return urls;
}

// ---------------------------------------------------------------------------
// Blog listing utilities
// ---------------------------------------------------------------------------

export async function getBlogPosts(
  lang: SupportedLanguage = DEFAULT_LANGUAGE
): Promise<BlogListEntry[]> {
  const posts = await getCollection("blog");

  const displayPosts = posts.filter((post) => {
    if (!post.slug.includes("/")) return true;
    return post.slug.endsWith("/index");
  });

  return displayPosts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((post) => ({
      ...post,
      slug: post.slug.replace("/index", ""),
      formattedDate: formatDateI18n(post.data.date, lang),
    }));
}
