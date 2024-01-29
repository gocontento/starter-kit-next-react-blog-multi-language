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
    <div>
      <div>
        <h1>{content.fields.title.text}</h1>
        <p>{content.fields.text.text}</p>
        <CategoryPills categoryLinks={categoryLinks} />
      </div>
      <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-2">
        {posts.map((post, index) => (
          <BlogCard key={`blog-post-${index}`} post={post} />
        ))}
      </div>
    </div>
  );
}
