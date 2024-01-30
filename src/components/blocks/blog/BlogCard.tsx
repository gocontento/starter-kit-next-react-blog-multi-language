import Link from "next/link";
import Image from "next/image";
import { ContentData } from "@gocontento/client";
import { formatDate } from "@/utils/formatDate";

export default function BlogCard({ post }: { post: ContentData }) {
  const category = post.fields.category.content_links[0].content_link;
  const author = post.fields.author.content_links[0].content_link;

  return (
    <div className="prose">
      <div>
        <Image
          src={post.fields.image.assets[0].asset.url}
          alt={post.fields.image.assets[0].asset.description}
          width={300}
          height={300}
          className="w-full"
        />
      </div>
      <div>
        <p className="text-sm">{formatDate(post.published_at)}</p>
        <h3 className="text-4xl font-semibold mt-0 mb-5">
          {post.fields.title.text}
        </h3>
        <div className="flex space-x-2 items-center">
          <Link
            className="no-underline hover:opacity-80 font-semibold text-sm"
            href={`/blog/author/${author.slug}`}
          >
            {author.fields.name.text}
          </Link>
          <span>|</span>
          <Link
            className="no-underline hover:opacity-80 font-semibold text-sm"
            href={`/blog/category/${category.slug}`}
          >
            {category.fields.title.text}
          </Link>
        </div>
        <p>{post.fields.excerpt.text}</p>
        <Link
          href={`/${post.uri}`}
          className="text-black font-semibold hover:opacity-80 inline-block my-5 hover:opacity-80 not-prose"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
