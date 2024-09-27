import Link from 'next/link'
import Image from 'next/image'
import { ContentData } from '@gocontento/client'
import { formatDate } from '@/utils/formatDate'
import nl2br from 'react-nl2br'
import { useTranslations } from 'next-intl'

export default function BlogCard({ post }: { post: ContentData }) {
  const category = post.fields.category.content_links[0].content_link
  const author = post.fields.author.content_links[0].content_link
  const t = useTranslations('Blog')

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
        <h3 className="mb-5 mt-0 text-4xl font-semibold">
          {post.fields.title.text}
        </h3>
        <div className="flex items-center space-x-2">
          <Link
            className="text-sm font-semibold no-underline hover:opacity-80"
            href={`/blog/author/${author.slug}`}
          >
            {author.fields.name.text}
          </Link>
          <span>|</span>
          <Link
            className="text-sm font-semibold no-underline hover:opacity-80"
            href={`/blog/category/${category.slug}`}
          >
            {category.fields.title.text}
          </Link>
        </div>

        <p>{nl2br(post.fields.excerpt.text)}</p>
        <Link
          href={`/${post.uri}`}
          className="not-prose my-5 inline-block font-semibold text-black hover:opacity-80 hover:opacity-80"
        >
          {t('cta')}
        </Link>
      </div>
    </div>
  )
}
