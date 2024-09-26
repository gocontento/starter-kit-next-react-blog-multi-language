import { draftMode } from 'next/headers'
import { createClient, generateSeo, getBlogCategoryLinks } from '@/lib/contento'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogLandingPage from '@/components/pages/BlogLandingPage'
import { ContentAPIResponse, ContentData } from '@gocontento/client'

const client = createClient()

type Props = {
  params: {
    locale: string
  }
}

export async function getBlogPosts({ params }: Props): Promise<ContentData[]> {
  return await createClient(false, params.locale)
    .getContentByType({
      contentType: 'blog_post',
    })
    .then((response: ContentAPIResponse) => {
      return response.content
    })
    .catch(() => {
      return []
    })
}

export async function generateMetadata(): Promise<Metadata> {
  return await client
    .getContentBySlug('blog', 'blog_landing')
    .then((content: ContentData) => {
      return generateSeo(content)
    })
    .catch(() => {
      return {}
    })
}

export default async function page({ params }: Props) {
  const content = await createClient(draftMode().isEnabled, params.locale)
    .getContentBySlug('blog', 'blog_landing')
    .catch(() => {
      notFound()
    })

  const posts = await getBlogPosts({ params })

  const categoryLinks = await getBlogCategoryLinks()

  return (
    <BlogLandingPage
      initialContent={content}
      posts={posts}
      categoryLinks={categoryLinks}
    />
  )
}
