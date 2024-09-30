import { draftMode } from 'next/headers'
import { createClient, generateSeo, getBlogCategoryLinks } from '@/lib/contento'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ContentAPIResponse, ContentData } from '@gocontento/client'
import BlogAuthorPage from '@/components/pages/BlogAuthorPage'
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
      contentType: 'authors',
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
    .getContentBySlug(params.slug, 'authors')
    .then((content: ContentData) => {
      const nameParts = content.fields.name.text.split(' ')

      return generateSeo(content, {
        type: 'profile',
        firstName: nameParts.length ? nameParts[0] : content.fields.name.text,
        lastName: nameParts.length >= 2 ? nameParts[1] : null,
      })
    })
    .catch(() => {
      return {}
    })
}

export default async function page({ params }: Props) {
  unstable_setRequestLocale(params.locale)

  const content = await createClient(draftMode().isEnabled, params.locale)
    .getContentBySlug(params.slug, 'authors')
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
      'fields[content_links][author][slug]': params.slug,
    },
  })

  const posts = postsResponse.content
  const categoryLinks = await getBlogCategoryLinks(params.locale)

  return (
    <BlogAuthorPage
      initialContent={content}
      posts={posts}
      categoryLinks={categoryLinks}
    />
  )
}
