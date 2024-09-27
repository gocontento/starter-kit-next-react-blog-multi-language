import { draftMode } from 'next/headers'
import {
  createClient,
  generateSeo,
  getBlogCategoryLinks,
  getBlogPosts,
} from '@/lib/contento'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogLandingPage from '@/components/pages/BlogLandingPage'
import { ContentData } from '@gocontento/client'

const client = createClient()

type Props = {
  params: {
    locale: string
  }
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

  const posts = await getBlogPosts(params.locale)

  const categoryLinks = await getBlogCategoryLinks(params.locale)

  return (
    <BlogLandingPage
      initialContent={content}
      posts={posts}
      categoryLinks={categoryLinks}
    />
  )
}
