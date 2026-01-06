/**
 * Configuración centralizada del sitio
 * Evita duplicación de datos en múltiples archivos
 */

export const SITE_CONFIG = {
  name: "Speedcubing Colombia",
  description:
    "Organización oficial de la WCA en Colombia. Competencias, rankings y comunidad de cuberos.",
  url: "https://speedcubingcolombia.org",
  email: "contacto@speedcubingcolombia.org",
  phone: "+57 300 4682985",
  whatsapp: "573004682985",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/speedcubingcolombia",
  youtube: "https://www.youtube.com/@SpeedcubingColombiaOfficial",
  facebook: "#", // TODO: Agregar enlace real cuando esté disponible
} as const;

export const NAV_ITEMS = [
  { text: "Inicio", url: "/" },
  { text: "Publicaciones", url: "/blog" },
  { text: "Preguntas Frecuentes", url: "/faqs" },
  { text: "Sobre Nosotros", url: "/company" },
  { text: "Contacto", url: "/contact" },
] as const;

export const FOOTER_LINKS = [
  {
    title: "Navegación",
    links: [
      { text: "Inicio", url: "/" },
      { text: "Publicaciones", url: "/blog" },
      { text: "Preguntas Frecuentes", url: "/faqs" },
    ],
  },
  {
    title: "Recursos",
    links: [
      {
        text: "Reglamento WCA",
        url: "https://www.worldcubeassociation.org/regulations/",
        external: true,
      },
      {
        text: "Competencias",
        url: "https://www.worldcubeassociation.org/competitions?region=CO",
        external: true,
      },
      {
        text: "Rankings",
        url: "https://www.worldcubeassociation.org/results/rankings/333/single?region=Colombia",
        external: true,
      },
      {
        text: "Delegados",
        url: "https://www.worldcubeassociation.org/delegates#latin-america:~:text=South%20America%20(North)",
        external: true,
      },
    ],
  },
  {
    title: "Organización",
    links: [
      { text: "Sobre Nosotros", url: "/company" },
      { text: "Contacto", url: "/contact" },
    ],
  },
] as const;
