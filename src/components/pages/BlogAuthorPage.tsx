"use client";

import { useLivePreview } from "@gocontento/next";
import { ContentData } from "@gocontento/client/lib/types";
import BlogCard from "../blocks/blog/BlogCard";
import CategoryPill from "../blocks/blog/CategoryPill";
import Image from "next/image";
import TwitterIcon from "../icons/TwitterIcon";
import LinkedInIcon from "../icons/LinkedInIcon";

export default function BlogAuthor({
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
      <div>
        <Image
          src={content.fields.image.assets[0].asset.url}
          alt={content.fields.image.assets[0].asset.description}
          width={80}
          height={80}
          className="object-cover rounded-full"
        />
        <h1 className="text-4xl font-semibold md:text-5xl my-5">
          {content.fields.name.text}
        </h1>
        <p className="text-lg font-semibold mb-1">{content.fields.role.text}</p>
        <p className="text-lg">{content.fields.bio.text}</p>
        <div className="flex space-x-3 my-3">
          <TwitterIcon href={content.fields.twitter.text} />{" "}
          <LinkedInIcon href={content.fields.linked_in.text} />
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-4 my-7">
          {categoryLinks.map((category, index) => (
            <CategoryPill key={`blog-category-${index}`} category={category} />
          ))}
        </div>
        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard key={`blog-post-${index}`} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
