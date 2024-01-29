"use client";

import { ContentData } from "@gocontento/client";
import { useLivePreview } from "@gocontento/next";
import { CategoryLink } from "@/types";
import BlogCard from "../blocks/blog/BlogCard";
import CategoryPills from "../blocks/blog/CategoryPills";

export default function BlogIndexPage({
  initialContent,
  posts,
  categoryLinks,
}: {
  initialContent: ContentData;
  posts: ContentData[];
  categoryLinks: CategoryLink[];
}) {
  const { content } = useLivePreview({ content: initialContent });

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-28 py-9 md:py-16">
      <div className="prose">
        <h1 className="text-4xl font-semibold md:text-5xl">
          {content.fields.title.text}
        </h1>
        <div
          dangerouslySetInnerHTML={{ __html: content.fields.text.text }}
          className="text-lg"
        />
        <CategoryPills categoryLinks={categoryLinks} />
      </div>
      <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3">
        {posts.map((post, index) => (
          <BlogCard key={`blog-post-${index}`} post={post} />
        ))}
      </div>
    </div>
  );
}
