import { getCollection, type CollectionEntry } from "astro:content";

export const POSTS_PER_PAGE = 6;

export type BlogListEntry = CollectionEntry<"blog"> & {
  formattedDate: string;
};

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

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
