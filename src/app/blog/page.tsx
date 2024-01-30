import { draftMode } from "next/headers";
import {
  createClient,
  generateSeo,
  getBlogCategoryLinks,
  getBlogPosts,
} from "@/lib/contento";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndexPage from "@/components/pages/BlogLandingPage";
import { ContentData } from "@gocontento/client";

const client = createClient();

export async function generateMetadata(): Promise<Metadata> {
  return await client
    .getContentBySlug("blog", "blog_landing")
    .then((content: ContentData) => {
      return generateSeo(content);
    })
    .catch(() => {
      return {};
    });
}

export default async function page() {
  const content = await createClient(draftMode().isEnabled)
    .getContentBySlug("blog", "blog_landing")
    .catch(() => {
      notFound();
    });

  const posts = await getBlogPosts();

  const categoryLinks = await getBlogCategoryLinks();

  return (
    <BlogIndexPage
      initialContent={content}
      posts={posts}
      categoryLinks={categoryLinks}
    />
  );
}
