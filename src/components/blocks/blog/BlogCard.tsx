import Link from "next/link";
import Image from "next/image";
import { ContentData } from "@gocontento/client";
import { formatDate } from "@/utils/formatDate";

export default function BlogCard({ post }: { post: ContentData }) {
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
        <p className="text-sm font-semibold">{formatDate(post.published_at)}</p>
        <h3 className="text-3xl font-semibold mt-0">
          {post.fields.title.text}
        </h3>
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
