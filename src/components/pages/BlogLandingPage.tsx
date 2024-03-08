'use client'

import { ContentData } from '@gocontento/client'
import { useLivePreview } from '@gocontento/next'
import BlogCard from '../blocks/blog/BlogCard'
import CategoryPill from '../blocks/blog/CategoryPill'

export default function BlogLandingPage({
  initialContent,
  posts,
  categoryLinks,
}: {
  initialContent: ContentData
  posts: ContentData[]
  categoryLinks: ContentData[]
}) {
  const { content } = useLivePreview({ content: initialContent })

  return (
    <div className="mx-auto px-4 py-9 sm:px-6 md:px-28 md:py-16">
      <div className="prose">
        <h1 className="text-4xl font-semibold md:text-5xl">
          {content.fields.title.text}
        </h1>
        <div
          dangerouslySetInnerHTML={{ __html: content.fields.text.text }}
          className="text-lg"
        />
        <div className="my-7 flex flex-wrap items-center gap-x-3 gap-y-4">
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
  )
}
