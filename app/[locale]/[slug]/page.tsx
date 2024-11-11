import { draftMode } from 'next/headers'
import { createClient, generateSeo } from '@/lib/contento'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GeneralPage from '@/components/pages/GeneralPage'
import { ContentAPIResponse, ContentData } from '@gocontento/client'
import { routing } from '@/i18n/routing'
import { setRequestLocale } from 'next-intl/server'

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
    .getContent({
      params: {
        content_type: ['general_page'],
        limit: '100',
      },
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
    .getContent({
      params: {
        content_type: ['general_page'],
        slug: params.slug,
        limit: '1',
      },
    })
    .then((response: ContentAPIResponse) => {
      return generateSeo(response.content[0])
    })
    .catch(() => {
      return {}
    })
}

export default async function page({ params }: Props) {
  setRequestLocale(params.locale)

  const response = await createClient(draftMode().isEnabled, params.locale)
    .getContent({
      params: {
        content_type: ['general_page'],
        slug: params.slug,
        limit: '1',
      },
    })
    .catch(() => {
      notFound()
    })

  const content = response.content[0]

  return <GeneralPage initialContent={content} />
}
