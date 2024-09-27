import { ContentAPIResponse, ContentData, createContentoClient } from '@gocontento/client'
import { Metadata } from 'next'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'


type Props = {
  params: {
    locale: string
    slug: string
  }
}

export function createClient(isPreview: boolean = false, language?: string) {
  return createContentoClient({
    apiURL: process.env.CONTENTO_API_URL ?? '',
    apiKey: process.env.CONTENTO_API_KEY ?? '',
    siteId: process.env.CONTENTO_SITE_ID ?? '',
    isPreview: isPreview,
    language: language
  })
}

export function generateSeo(
  content: ContentData,
  openGraph?: OpenGraph,
  canonical?: string,
): Metadata {
  const images: Array<{
    url: string | URL
    secureUrl?: string | URL
    alt?: string
    type?: string
    width?: string | number
    height?: string | number
  }> = []

  if (content.seo.open_graph.image_secure_url) {
    images.push({
      url: content.seo.open_graph.image_secure_url,
      secureUrl: content.seo.open_graph.image_secure_url,
      width: content.seo.open_graph.image_width ?? undefined,
      height: content.seo.open_graph.image_height ?? undefined,
      alt: content.seo.open_graph.image_alt ?? undefined,
    })
  }

  let og: OpenGraph = {
    title: content.seo.open_graph.title ?? undefined,
    description: content.seo.open_graph.description ?? undefined,
    url: canonical ? canonical : content.seo.open_graph.url,
    images: images,
    locale: 'en_GB',
    type: 'website',
  }

  if (openGraph) {
    og = { ...og, ...openGraph }
  }

  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: {
      canonical: canonical ? canonical : content.seo.canonical_url,
    },
    openGraph: og,
  }
}

export async function getBlogCategoryLinks(language?:string): Promise<ContentData[]> {
  return await createClient(false, language)
    .getContentByType({
      contentType: 'blog_category',
      sortBy: 'name',
      sortDirection: 'asc',
      limit: 10,
    })
    .then((response: ContentAPIResponse) => {
      return response.content
    })
    .catch(() => {
      return []
    })
}

export async function getBlogPosts(language?:string): Promise<ContentData[]> {
  return await createClient(false, language)
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
