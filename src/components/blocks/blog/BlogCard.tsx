import Link from "next/link";
import Image from "next/image";
import { ContentData } from "@gocontento/client";

export default function BlogCard({ post }: { post: ContentData }) {
  return (
    <div>
      <div>
        <Image
          src={post.fields.image.assets[0].asset.url}
          alt={post.fields.image.assets[0].asset.description}
          width={300}
          height={300}
        />
      </div>
      <div>
        <h3>{post.fields.title.text}</h3>
        <p>{post.fields.excerpt.text}</p>
        <Link
          href={post.fields.button.blocks[0].button_url.text}
          className="text-black inline-block my-5 hover:opacity-80 not-prose"
          target={
            post.fields.button.blocks[0].open_in_new_tab.is_on ? "_blank" : ""
          }
        >
          {post.fields.button.blocks[0].button_text.text}
        </Link>
      </div>
    </div>
  );
}
