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

  return posts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((post) => ({
      ...post,
      formattedDate: dateFormatter.format(post.data.date),
    }));
}
