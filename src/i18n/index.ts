/**
 * Internationalization (i18n) utilities
 *
 * Centralized module for all i18n functionality following Astro best practices.
 * @see https://docs.astro.build/en/guides/internationalization/
 */

export const SUPPORTED_LANGUAGES = ["es", "en", "pt"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "es";

/**
 * Language configuration with metadata
 */
export const languages: Record<
  SupportedLanguage,
  {
    code: SupportedLanguage;
    name: string;
    flag: string;
    /** URL prefix (empty for default language) */
    prefix: string;
    /** Date formatter locale */
    dateLocale: string;
  }
> = {
  es: {
    code: "es",
    name: "Español",
    flag: "🇨🇴",
    prefix: "",
    dateLocale: "es-CO",
  },
  en: {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    prefix: "/en",
    dateLocale: "en-US",
  },
  pt: {
    code: "pt",
    name: "Português",
    flag: "🇧🇷",
    prefix: "/pt",
    dateLocale: "pt-BR",
  },
};

/**
 * UI translations for common strings across the site
 */
export const ui: Record<SupportedLanguage, Record<string, string>> = {
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.blog": "Blog",
    "nav.publications": "Publicaciones",
    "nav.faqs": "Preguntas Frecuentes",
    "nav.about": "Sobre Nosotros",
    "nav.contact": "Contacto",
    "nav.backToBlog": "Volver al blog",
    // Dates
    "date.published": "Publicado",
    // Language switcher
    "lang.switchTo": "Cambiar idioma",
    // Blog
    "blog.readMore": "Leer más",
    "blog.backToBlog": "Volver al blog",
    "blog.shareArticle": "Comparte este artículo",
    "blog.shareTwitter": "Compartir en Twitter",
    "blog.shareLinkedin": "Compartir en LinkedIn",
    "blog.shareFacebook": "Compartir en Facebook",
    "blog.author": "Autor",
    "blog.category": "Categoría",
    // Errors
    "error.notFound": "Página no encontrada",
    "error.goHome": "Ir al inicio",
    // Accessibility
    "a11y.goHome": "Ir al inicio",
    "a11y.mainNav": "Navegación principal",
    "a11y.openMenu": "Abrir menú de navegación",
    "a11y.skipToContent": "Saltar al contenido principal",
    // Footer
    "footer.description":
      "Promoviendo el crecimiento del Speedcubing en Colombia a través de competencias oficiales WCA y el fortalecimiento de nuestra comunidad.",
    "footer.navigation": "Navegación",
    "footer.resources": "Recursos",
    "footer.organization": "Organización",
    "footer.allRightsReserved": "Todos los derechos reservados",
    "footer.privacyPolicy": "Políticas de Privacidad",
    "footer.wcaRegulations": "Reglamento WCA",
    "footer.competitions": "Competencias",
    "footer.rankings": "Rankings",
    "footer.delegates": "Delegados",
  },
  en: {
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.publications": "Publications",
    "nav.faqs": "FAQs",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.backToBlog": "Back to blog",
    "date.published": "Published",
    "lang.switchTo": "Switch language",
    "blog.readMore": "Read more",
    "blog.backToBlog": "Back to blog",
    "blog.shareArticle": "Share this article",
    "blog.shareTwitter": "Share on Twitter",
    "blog.shareLinkedin": "Share on LinkedIn",
    "blog.shareFacebook": "Share on Facebook",
    "blog.author": "Author",
    "blog.category": "Category",
    "error.notFound": "Page not found",
    "error.goHome": "Go home",
    "a11y.goHome": "Go to home",
    "a11y.mainNav": "Main navigation",
    "a11y.openMenu": "Open navigation menu",
    "a11y.skipToContent": "Skip to main content",
    "footer.description":
      "Promoting the growth of Speedcubing in Colombia through official WCA competitions and strengthening our community.",
    "footer.navigation": "Navigation",
    "footer.resources": "Resources",
    "footer.organization": "Organization",
    "footer.allRightsReserved": "All rights reserved",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.wcaRegulations": "WCA Regulations",
    "footer.competitions": "Competitions",
    "footer.rankings": "Rankings",
    "footer.delegates": "Delegates",
  },
  pt: {
    "nav.home": "Início",
    "nav.blog": "Blog",
    "nav.publications": "Publicações",
    "nav.faqs": "Perguntas Frequentes",
    "nav.about": "Sobre Nós",
    "nav.contact": "Contato",
    "nav.backToBlog": "Voltar ao blog",
    "date.published": "Publicado",
    "lang.switchTo": "Mudar idioma",
    "blog.readMore": "Ler mais",
    "blog.backToBlog": "Voltar ao blog",
    "blog.shareArticle": "Compartilhe este artigo",
    "blog.shareTwitter": "Compartilhar no Twitter",
    "blog.shareLinkedin": "Compartilhar no LinkedIn",
    "blog.shareFacebook": "Compartilhar no Facebook",
    "blog.author": "Autor",
    "blog.category": "Categoria",
    "error.notFound": "Página não encontrada",
    "error.goHome": "Ir para início",
    "a11y.goHome": "Ir para início",
    "a11y.mainNav": "Navegação principal",
    "a11y.openMenu": "Abrir menu de navegação",
    "a11y.skipToContent": "Pular para o conteúdo principal",
    "footer.description":
      "Promovendo o crescimento do Speedcubing na Colômbia através de competições oficiais da WCA e o fortalecimento da nossa comunidade.",
    "footer.navigation": "Navegação",
    "footer.resources": "Recursos",
    "footer.organization": "Organização",
    "footer.allRightsReserved": "Todos os direitos reservados",
    "footer.privacyPolicy": "Política de Privacidade",
    "footer.wcaRegulations": "Regulamento da WCA",
    "footer.competitions": "Competições",
    "footer.rankings": "Rankings",
    "footer.delegates": "Delegados",
  },
};

/**
 * Get a translated UI string
 */
export function t(lang: SupportedLanguage, key: string): string {
  return ui[lang][key] || ui[DEFAULT_LANGUAGE][key] || key;
}

/**
 * Extract language from a URL path
 * @example getLocaleFromPath('/en/blog/post') => 'en'
 * @example getLocaleFromPath('/blog/post') => 'es' (default)
 */
export function getLocaleFromPath(path: string): SupportedLanguage {
  const segments = path.split("/").filter(Boolean);
  if (segments.length > 0) {
    const firstSegment = segments[0] as SupportedLanguage;
    if (
      SUPPORTED_LANGUAGES.includes(firstSegment) &&
      firstSegment !== DEFAULT_LANGUAGE
    ) {
      return firstSegment;
    }
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Extract language from a content collection slug
 * @example getLocaleFromSlug('en/sac-2026/index') => 'en'
 * @example getLocaleFromSlug('sac-2026/index') => 'es'
 */
export function getLocaleFromSlug(slug: string): SupportedLanguage {
  const firstPart = slug.split("/")[0];
  if (
    SUPPORTED_LANGUAGES.includes(firstPart as SupportedLanguage) &&
    firstPart !== DEFAULT_LANGUAGE
  ) {
    return firstPart as SupportedLanguage;
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Remove language prefix from a slug
 * @example stripLangPrefix('en/sac-2026/index') => 'sac-2026/index'
 * @example stripLangPrefix('sac-2026/index') => 'sac-2026/index'
 */
export function stripLangPrefix(slug: string): string {
  const lang = getLocaleFromSlug(slug);
  if (lang !== DEFAULT_LANGUAGE) {
    return slug.replace(`${lang}/`, "");
  }
  return slug;
}

/**
 * Add language prefix to a path
 * @example addLangPrefix('blog/post', 'en') => '/en/blog/post'
 * @example addLangPrefix('blog/post', 'es') => '/blog/post'
 */
export function addLangPrefix(path: string, lang: SupportedLanguage): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANGUAGE) {
    return cleanPath;
  }
  return `/${lang}${cleanPath}`;
}

/**
 * Create a date formatter for a specific language
 */
export function createDateFormatter(
  lang: SupportedLanguage,
): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(languages[lang].dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Format a date according to a language's locale
 */
export function formatDate(date: Date, lang: SupportedLanguage): string {
  return createDateFormatter(lang).format(date);
}
