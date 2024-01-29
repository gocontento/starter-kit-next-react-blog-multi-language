import { draftMode } from "next/headers";
import {
  createClient,
  generateSeo,
  getBlogCategoryLinks,
} from "@/lib/contento";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogCategoryPage from "@/components/pages/BlogCategoryPage";
import { ContentAPIResponse, ContentData } from "@gocontento/client";

const client = createClient();

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return await client
    .getContentByType({
      contentType: "blog_category",
      limit: 100,
    })
    .then((response: ContentAPIResponse) => {
      return response.content.map((content) => ({
        slug: content.slug,
      }));
    })
    .catch(() => {
      return [];
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return await client
    .getContentBySlug(params.slug, "blog_category")
    .then((content: ContentData) => {
      return generateSeo(content);
    })
    .catch(() => {
      return {};
    });
}

export default async function page({ params }: Props) {
  const content = await createClient(draftMode().isEnabled)
    .getContentBySlug(params.slug, "blog_category")
    .catch(() => {
      notFound();
    });

  const postsResponse = await client.getContent({
    params: {
      content_type: "blog_post",
      limit: "100",
      "fields[content_links][category][slug]": params.slug,
    },
  });

  const posts = postsResponse.content;

  const categoryLinks = await getBlogCategoryLinks();

  return (
    <BlogCategoryPage
      initialContent={content}
      posts={posts}
      categoryLinks={categoryLinks}
    />
  );
}
