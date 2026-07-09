/**
 * Configuración centralizada del sitio
 * Evita duplicación de datos en múltiples archivos
 */

export const SITE_CONFIG = {
  name: "Speedcubing Colombia",
  description:
    "Asociación sin ánimo de lucro que promueve el Speedcubing en Colombia. Competencias oficiales WCA, rankings y comunidad de cuberos.",
  url: "https://speedcubingcolombia.org",
  email: "contacto@speedcubingcolombia.org",
  phone: "+57 300 4682985",
  whatsapp: "573004682985",
} as const;

/** Slug of the blog post featured on the homepage. Set to "" to auto-select the latest post. */
export const FEATURED_ARTICLE_SLUG = "convocatoria-nats-2026";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/speedcubingcolombia",
  youtube: "https://www.youtube.com/@SpeedcubingColombiaOfficial",
  facebook: "#", // TODO: Agregar enlace real cuando esté disponible
} as const;

/**
 * Navigation items using i18n keys.
 * Use t(lang, item.key) to get the translated text.
 */
export const NAV_ITEMS = [
  { key: "nav.home", url: "/" },
  { key: "nav.publications", url: "/blog" },
  { key: "nav.faqs", url: "/faqs" },
  { key: "nav.about", url: "/company" },
  { key: "nav.contact", url: "/contact" },
] as const;

/**
 * Footer link sections using i18n keys.
 * Use t(lang, section.titleKey) for section titles and t(lang, link.key) for link text.
 */
export const FOOTER_LINKS = [
  {
    titleKey: "footer.navigation",
    links: [
      { key: "nav.home", url: "/" },
      { key: "nav.publications", url: "/blog" },
      { key: "nav.faqs", url: "/faqs" },
    ],
  },
  {
    titleKey: "footer.resources",
    links: [
      {
        key: "footer.wcaRegulations",
        url: "https://www.worldcubeassociation.org/regulations/",
        external: true,
      },
      {
        key: "footer.competitions",
        url: "https://www.worldcubeassociation.org/competitions?region=CO",
        external: true,
      },
      {
        key: "footer.rankings",
        url: "https://www.worldcubeassociation.org/results/rankings/333/single?region=Colombia",
        external: true,
      },
      {
        key: "footer.delegates",
        url: "https://www.worldcubeassociation.org/delegates#latin-america:~:text=South%20America%20(North)",
        external: true,
      },
    ],
  },
  {
    titleKey: "footer.organization",
    links: [
      { key: "nav.about", url: "/company" },
      { key: "nav.contact", url: "/contact" },
    ],
  },
] as const;
