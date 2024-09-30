import { draftMode } from 'next/headers'
import { createClient, generateSeo } from '@/lib/contento'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostPage from '@/components/pages/BlogPostPage'
import { ContentAPIResponse, ContentData } from '@gocontento/client'
import { routing } from '@/i18n/routing'

const client = createClient()

type Props = {
  params: {
    locale: string
    slug: string
  }
}

type LocaleContent = {
  slug: string | null
  locale: string
}

export async function generateStaticParams() {
  return await client
    .getContentByType({
      contentType: 'blog_post',
      limit: 100,
    })
    .then((response: ContentAPIResponse) => {
      const localeArray = [] as LocaleContent[]

      response.content.forEach((content: ContentData) => {
        routing.locales.forEach((locale) => {
          localeArray.push({
            slug: content.slug,
            locale: locale,
          })
        })
      })
      return localeArray
    })
    .catch(() => {
      return []
    })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return await client
    .getContentBySlug(params.slug, 'blog_post')
    .then((content: ContentData) => {
      return generateSeo(content, {
        type: 'article',
        publishedTime: content.published_at ?? undefined,
        modifiedTime: content.updated_at,
        authors: content.fields.author.content_links[0].content_link.url,
        section: content.fields.category.content_links[0].content_link.name,
      })
    })
    .catch(() => {
      return {}
    })
}

export default async function page({ params }: Props) {
  const post = await createClient(draftMode().isEnabled, params.locale)
    .getContentBySlug(params.slug, 'blog_post')
    .catch(() => {
      notFound()
    })

  return <BlogPostPage initialContent={post} />
}
