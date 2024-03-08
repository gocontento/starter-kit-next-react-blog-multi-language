'use client'

import { ContentData } from '@gocontento/client/lib/types'
import { useLivePreview } from '@gocontento/next'
import BlockMatcher from '../BlockMatcher'

export default function GeneralPage({
  initialContent,
}: {
  initialContent: ContentData
}) {
  const { content } = useLivePreview({ content: initialContent })

  return (
    <div>
      <div className="mx-auto px-4 py-9 sm:px-6 md:px-28 md:py-16">
        <BlockMatcher blocks={content.fields.content.blocks} />
      </div>
    </div>
  )
}
