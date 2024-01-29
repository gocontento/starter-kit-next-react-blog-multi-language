"use client";

import { ContentData } from "@gocontento/client";
import { useLivePreview } from "@gocontento/next";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import Image from "next/image";

export default function BlogPost({
  initialContent,
}: {
  initialContent: ContentData;
}) {
  const { content } = useLivePreview({ content: initialContent });
  const category = content.fields.category.content_links[0].content_link;

  return (
    <div className="pb-9 md:pb-16">
      <div>
        <h1 className="text-4xl font-semibold md:text-5xl">
          {content.fields.title.text}
        </h1>
        <div
          dangerouslySetInnerHTML={{
            __html: content.fields.post_body.text,
          }}
          className="prose mt-9"
        />
      </div>
    </div>
  );
}
