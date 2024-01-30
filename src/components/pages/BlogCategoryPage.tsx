"use client";

import { useLivePreview } from "@gocontento/next";
import { ContentData } from "@gocontento/client/lib/types";
import BlogCard from "../blocks/blog/BlogCard";
import CategoryPill from "../blocks/blog/CategoryPill";

export default function BlogCategory({
  initialContent,
  posts,
  categoryLinks,
}: {
  initialContent: ContentData;
  posts: ContentData[];
  categoryLinks: ContentData[];
}) {
  const { content } = useLivePreview({ content: initialContent });

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-28 py-9 md:py-16">
      <div className="prose">
        <h1 className="text-4xl font-semibold md:text-5xl">
          {content.fields.title.text}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-4 my-7">
          {categoryLinks.map((category, index) => (
            <CategoryPill key={`blog-category-${index}`} category={category} />
          ))}
        </div>
      </div>
      <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3">
        {posts.map((post, index) => (
          <BlogCard key={`blog-post-${index}`} post={post} />
        ))}
      </div>
    </div>
  );
}
