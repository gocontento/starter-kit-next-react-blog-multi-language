import { ContentData } from '@gocontento/client'

export default function AnnouncementBar({ block }: { block: ContentData }) {
  return (
    <div className="mx-auto flex w-full items-center justify-center bg-teal-500 px-6 py-3 font-semibold">
      <div
        dangerouslySetInnerHTML={{ __html: block.fields.announcement.text }}
        className="prose prose-invert text-center text-sm text-white"
      />
    </div>
  )
}
