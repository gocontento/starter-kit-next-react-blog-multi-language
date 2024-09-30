import { createClient } from '@/lib/contento'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import GeneralPage from '@/components/pages/GeneralPage'

type Props = {
  params: {
    locale: string
  }
}

export default async function page({ params }: Props) {
  const content = await createClient(draftMode().isEnabled, params.locale)
    .getContentBySlug('home', 'general_page')
    .catch(() => {
      notFound()
    })

  return <GeneralPage initialContent={content} />
}
