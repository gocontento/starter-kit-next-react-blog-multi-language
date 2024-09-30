import { draftMode } from 'next/headers'
import { createClient, generateSeo, getBlogCategoryLinks } from '@/lib/contento'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogCategoryPage from '@/components/pages/BlogCategoryPage'
import { ContentAPIResponse, ContentData } from '@gocontento/client'
import { routing } from '@/i18n/routing'
import { unstable_setRequestLocale } from 'next-intl/server'

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
      contentType: 'blog_category',
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
  return await createClient(false, params.locale)
    .getContentBySlug(params.slug, 'blog_category')
    .then((content: ContentData) => {
      return generateSeo(content)
    })
    .catch(() => {
      return {}
    })
}

export default async function page({ params }: Props) {
  unstable_setRequestLocale(params.locale)

  const content = await createClient(draftMode().isEnabled, params.locale)
    .getContentBySlug(params.slug, 'blog_category')
    .catch(() => {
      notFound()
    })

  const postsResponse = await createClient(
    draftMode().isEnabled,
    params.locale,
  ).getContent({
    params: {
      content_type: 'blog_post',
      limit: '100',
      'fields[content_links][category][slug]': params.slug,
    },
  })

  const posts = postsResponse.content

  const categoryLinks = await getBlogCategoryLinks(params.locale)

  return (
    <BlogCategoryPage
      initialContent={content}
      posts={posts}
      categoryLinks={categoryLinks}
    />
  )
}
