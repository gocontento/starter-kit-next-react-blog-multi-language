'use client'

import { ContentData } from '@gocontento/client'
import { useLivePreview } from '@gocontento/next'
import { formatDate } from '@/utils/formatDate'
import Image from 'next/image'
import CategoryPill from '../blocks/blog/CategoryPill'

export default function BlogPost({
  initialContent,
}: {
  initialContent: ContentData
}) {
  const { content } = useLivePreview({ content: initialContent })
  const category = content.fields.category.content_links[0].content_link

  return (
    <div>
      <div className="mx-auto grid items-center space-y-9 bg-zinc-200 px-4 py-9 sm:px-6 md:grid-cols-2 md:space-x-12 md:px-28 md:py-16">
        <Image
          src={content.fields.image.assets[0].asset.url}
          alt={content.fields.image.assets[0].asset.description}
          width={750}
          height={600}
          className="w-full"
        />
        <div className="prose">
          <p className="mt-0 text-sm font-semibold">
            {formatDate(content.published_at)}
          </p>
          <h1 className="text-4xl font-semibold md:text-5xl">
            {content.fields.title.text}
          </h1>
          <p className="pb-5 text-lg">{content.fields.excerpt.text}</p>
          <CategoryPill category={category} />
        </div>
      </div>
      <div className="flex flex-col items-center px-4 py-9 sm:px-6 md:px-28 md:py-16">
        <div
          dangerouslySetInnerHTML={{
            __html: content.fields.post_body.text,
          }}
          className="prose"
        />
      </div>
    </div>
  )
}
